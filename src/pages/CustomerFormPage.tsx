import React from "react";
import { Link, match } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import SaveIcon from "@material-ui/icons/Save";
import Divider from "@material-ui/core/Divider";
import PageBase from "../components/PageBase";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { getAction } from "../actions/customer";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import { thunkApiCall } from "../services/thunks";
import { Customer, User } from "../types";
import { LinearProgress, Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import {
  GET_CUSTOMER,
  ApiAction,
  UPDATE_CUSTOMER,
  CREATE_CUSTOMER,
} from "../store/types";
import Alert from "@material-ui/lab/Alert";
import SkeletonForm from "../components/SkeletonForm";
import { formPageStyles } from "../styles";
import {DropzoneArea} from 'material-ui-dropzone'

const styles = formPageStyles;

interface CustomerFormProps {
  match: match;
  customer: Customer;
  getCustomer: typeof thunkApiCall;
  saveCustomer: typeof thunkApiCall;
  errorMessage?: string;
  isFetching: boolean;
  updated: boolean;
}

interface CustomerFormState {
  customer: Customer;
  snackbarOpen: boolean;
  autoHideDuration: number;
}

// class CustomerFormPage extends React.Component {
class CustomerFormPage extends React.Component<
  CustomerFormProps,
  CustomerFormState
> {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.onSnackBarClose = this.onSnackBarClose.bind(this);
  }

  state = {
    customer: {} as Customer,
    snackbarOpen: false,
    autoHideDuration: 2000,
  };

  componentDidMount() {
    // @ts-ignore
    const customerId = this.props.match.params?.id;
    let action: ApiAction;
    if (customerId) {
      action = getAction(GET_CUSTOMER, customerId); //  Object.assign({}, this.getAction);
      this.props.getCustomer(action);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.updated !== prevProps.updated &&
      this.props.updated === true
    ) {
      this.setState({ snackbarOpen: true });
    }
  }

  // handleChange(event) {
  //   const field = event.target.name;

  //   if (event && event.target && field) {
  //     const customer = Object.assign({}, this.state.customer);
  //     customer[field] = event.target.value;
  //     this.setState({ customer: customer });
  //   }
  // }

  // handleClick(event) {
  //   event.preventDefault();
  //   // if (this.state.customer.id) this.props.updateCustomer(this.state.customer);
  //   // else this.props.addCustomer(this.state.customer);
  // }

  onUploadDocument(files) {
    this.state.customer.files = files;
  }

  onSnackBarClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  onSave(values: TODO) {
    const customer = { ...this.state.customer, ...values };

    let action: ApiAction;
    if (customer.id > 0) {
      action = getAction(UPDATE_CUSTOMER, null, customer);
    } else {
      action = getAction(CREATE_CUSTOMER, null, customer);
    }
    this.props.saveCustomer(action);
  }

  render() {
    const { isFetching, customer } = this.props;

    return (
      <PageBase title="Client" navigation="MapMarket / Client ">
        {isFetching ? (
          <div>
            <SkeletonForm />
          </div>
        ) : (
          <Formik
            initialValues={{
              ...customer,
            }}
            validate={(values) => {
              const errors: Partial<Customer & User> = {};
              if (!values.firstname) {
                errors.firstname = "Required";
              }
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              values.files = this.state.customer.files;
              this.onSave(values);
              setTimeout(() => {
                setSubmitting(false);
                console.log(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Grid container style={styles.container} spacing={3}>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Prénom"
                      label="Prénom"
                      name="firstname"
                      fullWidth={true}
                      required
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Nom"
                      label="Nom"
                      fullWidth={true}
                      name="lastname"
                      required
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Rewards"
                      label="Rewards"
                      fullWidth={true}
                      type="number"
                      name="rewards"
                      required
                    />
                  </Grid>

                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Mail"
                      label="Mail"
                      fullWidth={true}
                      name="email"
                      required
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="555-555-555"
                      label="Téléphone"
                      fullWidth={true}
                      type="string"
                      name="mobile"
                      required
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    {customer.membership && (
                      <Switch
                        checked={customer.membership}
                        color="primary"
                        name="membership"
                        inputProps={{ "aria-label": "membership" }}
                      />
                    )}
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Provenance"
                      label="Provenance"
                      fullWidth={true}
                      type="string"
                      name="origin"
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Secteur activité"
                      label="Secteur activité"
                      fullWidth={true}
                      type="string"
                      name="activitysector"
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Installation activité"
                      label="Installation activité"
                      fullWidth={true}
                      type="string"
                      name="activitysetup"
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Type"
                      label="Type"
                      fullWidth={true}
                      type="string"
                      name="type"
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Projet"
                      label="Projet"
                      fullWidth={true}
                      type="string"
                      name="project"
                      required
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Lieu d'implantation"
                      label="Lieu d'implantation"
                      fullWidth={true}
                      type="string"
                      name="physicallocation"
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Sexe"
                      label="Sexe"
                      fullWidth={true}
                      type="string"
                      name="sex"
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Statut"
                      label="Statut"
                      fullWidth={true}
                      type="string"
                      name="status"
                      required
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Age"
                      label="Age"
                      fullWidth={true}
                      type="number"
                      name="age"
                    />
                  </Grid>
                  {/* <Grid item style={styles.cell} xs={12} md={4}>
                    {customer.avatar && (
                      <Card style={styles.card}>
                        <img width={100} src={customer.avatar} />
                      </Card>
                    )}
                  </Grid> */}
                  <Grid item style={styles.cell} xs={12} md={4}>
                  <DropzoneArea dropzoneText="Glisser-déposer un fichier ici ou cliquer" 
                    acceptedFiles={['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/zip', 'application/vnd.ms-excel','text/csv','application/vnd.openxmlformats-officedocument.wordprocessingml.document']} 
                    showFileNames={true}
                    initialFiles = {customer.files} 
                    onChange={this.onUploadDocument.bind(this)} 
                  />
                  </Grid>
                </Grid>
                <br />
                <Divider />
                <Grid container style={styles.container} spacing={3}>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Primo accueil"
                      label="Primo accueil"
                      fullWidth={true}
                      type="string"
                      name="firstcontact"
                      required
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Suivi interne"
                      label="Suivi interne"
                      fullWidth={true}
                      type="string"
                      name="internalfollowup"
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Date contact"
                      label="Date contact"
                      fullWidth={true}
                      type="date"
                      name="contactdate"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Date accusé réception 5 jours"
                      label="Date accusé réception 5 jours"
                      fullWidth={true}
                      type="date"
                      name="ackdate"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item style={styles.cell} xs={12} md={4}>
                    <Field
                      variant="outlined"
                      component={TextField}
                      placeholder="Indicateur accusé réception 5 jours"
                      label="Indicateur accusé réception 5 jours"
                      fullWidth={true}
                      type="string"
                      name="ackindicator"
                      required
                    />
                  </Grid>
                </Grid>
                 <br />
                <Divider />
                {isSubmitting && <LinearProgress />}
                <br />
                <div style={styles.buttons}>
                  <Link to="/customers">
                    <Button variant="contained">
                      <ArrowBackIosIcon /> Retourner{" "}
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    style={styles.saveButton}
                    onClick={submitForm}
                    color="primary"
                    disabled={isSubmitting}
                  >
                    <SaveIcon /> Enregistrer
                  </Button>
                </div>
                <Snackbar
                  open={this.state.snackbarOpen}
                  autoHideDuration={this.state.autoHideDuration}
                  onClose={this.onSnackBarClose}
                >
                  <Alert onClose={this.onSnackBarClose} severity="success">
                    Opération réalisée avec succès
                  </Alert>
                </Snackbar>
              </Form>
            )}
          </Formik>
        )}
      </PageBase>
    );
  }
}

function mapStateToProps(state) {
  const { customer, isFetching, updated } = state.customer;
  return {
    customer,
    isFetching,
    updated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCustomer: (action) => dispatch(thunkApiCall(action)),
    saveCustomer: (action) => dispatch(thunkApiCall(action)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerFormPage);
