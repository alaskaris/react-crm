import React from "react";
import Fab from "@material-ui/core/Fab";
import ContentAdd from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import Export from '@material-ui/icons/Archive';
import PageBase from "../components/PageBase";
import { connect } from "react-redux";
import { getAction } from "../actions/customer";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { thunkApiCall } from "../services/thunks";
import { LIST_CUSTOMER, DELETE_CUSTOMER, NEW_CUSTOMER } from "../store/types";
import { Customer, SearchFilter } from "../types";

import Alert from "../components/Alert";
import DataTable from "../components/DataTable";
import SkeletonList from "../components/SkeletonList";
import DeleteDialog from "../components/DeleteDialog";
import { Grid, Tooltip, Divider } from "@material-ui/core";
import { listPageStyle } from "../styles";
import {
  buildSearchFilters,
  buildJsonServerQuery,
  clearSearchFilters,
} from "../utils/app-utils";

const styles = listPageStyle;

const defaultProps = {
  model: "customer",
  dataKeys: [
    "selection",
    "lastname",
    "firstname",
    "email",
    "mobile",
    "membership",
    "actions",
  ],
  headers: [
    "",
    "Nom",
    "Prénom",
    "Mail",
    "Téléphone",
    "En cours",
    "Actions",
  ],
};

type DefaultProps = typeof defaultProps;

type CustomerListProps = {
  pageCount: number;
  isFetching: boolean;
  customerList: Customer[];
  searchCustomer: typeof thunkApiCall;
  deleteCustomer: typeof thunkApiCall;
  newCustomer: typeof thunkApiCall;
  errorMessage: string;
  deleted: boolean;
  exportSelected: typeof thunkApiCall;
} & DefaultProps;

interface CustomerListState {
  open: boolean;
  isFetching: boolean;
  searchOpen: boolean;
  snackbarOpen: boolean;
  autoHideDuration: number;
  page: number;
  items: Customer[];
  customerList: Customer[];
  totalPages: number;
  customerId: number;
  search: {
    contain: {
      firstname: string;
      lastname: string;
    };
  };
}

class CustomerListPage extends React.Component<
  CustomerListProps,
  CustomerListState
  > {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSnackBarClose = this.onSnackBarClose.bind(this);
    this.handleNewCustomer = this.handleNewCustomer.bind(this);
    this.handleSearchFilter = this.handleSearchFilter.bind(this);
    this.clearSearchFilter = this.clearSearchFilter.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.onSelectedListChange = this.onSelectedListChange.bind(this);
    this.handleExportCustomers = this.handleExportCustomers.bind(this);
  }

  selected: Customer[] = new Array();
  static defaultProps = defaultProps;

  state: CustomerListState = {
    isFetching: true,
    open: false,
    searchOpen: false,
    snackbarOpen: false,
    autoHideDuration: 2000,
    page: 1,
    items: [],
    totalPages: 1,
    customerId: null,
    customerList: [],
    search: {
      contain: {
        firstname: "",
        lastname: "",
      },
    }
  };

  componentDidMount() {
    this.handleSearch();
  }

  /* eslint-disable */
  componentDidUpdate(prevProps) {
    // reset page if items array has changed
    if (this.props.customerList !== prevProps.customerList) {
      this.setState({ customerList: this.props.customerList });
      const page = 1;
      const totalPages = Math.ceil(this.props.customerList.length / 10);
      const items = this.props.customerList.slice(0, 10);
      const isFetching = this.props.isFetching;
      this.setState({ page, totalPages, items, isFetching });
    }
    console.log(" this.props.deleted " + this.props.deleted);

    if (
      this.props.deleted !== prevProps.deleted &&
      this.props.deleted === true
    ) {
      this.setState({ snackbarOpen: true });
      this.handleSearch();
    }
  }

  onPageChange(_event: React.ChangeEvent<unknown>, page: number) {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const items = this.props.customerList.slice(startIndex, endIndex);
    this.setState({ page, items });
  }

  onSelectedListChange(_event: React.ChangeEvent<unknown>, value: Customer) {
    console.log('selected is ', value);
    const index = this.selected.indexOf(value);
    if (index > -1) {
      this.selected.splice(index, 1);
    } else {
      this.selected.push(value);
    }
    console.log('Selected array now is ', this.selected);
  }

  openDialog(_event: React.ChangeEvent<unknown>, value: number) {
    if (value != null && value > 0) {
      this.setState({ open: true, customerId: value });
    }
  }

  handleToggle() {
    this.setState({ searchOpen: !this.state.searchOpen } as TODO);
  }

  handleSearch() {
    const filters = buildSearchFilters(this.state.search as SearchFilter);
    const query = buildJsonServerQuery(filters);
    const action = getAction(LIST_CUSTOMER, null, null, query);
    this.props.searchCustomer(action); //this.state.search);
    this.setState({ searchOpen: false, isFetching: true });
  }

  closeDialog(isConfirmed: boolean) {
    this.setState({ open: false });

    if (isConfirmed && this.state.customerId) {
      const action = getAction(
        DELETE_CUSTOMER,
        this.state.customerId,
        null,
        ""
      );
      this.props.deleteCustomer(action);
      this.setState({ customerId: null });
    }
  }

  handleSearchFilter(event) {
    const field = event.target.name;
    if (event && event.target && field) {
      const search = Object.assign({}, this.state.search);
      search.contain[field] = event.target.value;
      this.setState({ search: search });
    }
  }

  clearSearchFilter() {
    const search = Object.assign({}, this.state.search);
    clearSearchFilters(search as SearchFilter);
    this.setState({ search });
    this.handleSearch()
  }

  onSnackBarClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  handleNewCustomer() {
    const action = getAction(NEW_CUSTOMER);
    this.props.newCustomer(action);
    // @ts-ignore
    this.props.history.push("/newcustomer");
  }

  handleExportCustomers() {
    if (this.selected) {
      let rows = new Array();
      this.selected.forEach(customer => {
        rows.push(new Array(customer.firstname, customer.lastname, customer.email));
      });
      exportToCsv("customer.csv", rows);
    }
  }


  render() {
    const { customerList, headers, dataKeys, model } = this.props;
    const { isFetching, page, totalPages, items } = this.state;

    console.log(headers);

    return (
      <PageBase
        title={"Clients (" + customerList.length + ")"}
        navigation="MapMarket CRM / Client"
      >
        {isFetching ? (
          <div>
            <SkeletonList />
          </div>
        ) : (
            <div>
              <div>
                <Tooltip title="Ajouter" aria-label="add">
                  <Fab
                    size="small"
                    color="secondary"
                    style={styles.fab}
                    onClick={this.handleNewCustomer}
                  >
                    <ContentAdd />
                  </Fab>
                </Tooltip>
                <Tooltip title="Chercher" aria-label="search">
                  <Fab
                    size="small"
                    style={styles.fabSearch}
                    onClick={this.handleToggle}
                  >
                    <Search />
                  </Fab>
                </Tooltip>
                <Tooltip title="Exporter" aria-label="export">
                  <Fab
                    size="small"
                    style={styles.fabExport}
                    onClick={this.handleExportCustomers}
                  >
                    <Export />
                  </Fab>
                </Tooltip>
              </div>
              <Snackbar
                open={this.state.snackbarOpen}
                autoHideDuration={this.state.autoHideDuration}
                onClose={this.onSnackBarClose}
              >
                <Alert onClose={this.onSnackBarClose} severity="success">
                  The operation completed successfully !
              </Alert>
              </Snackbar>
              <DataTable
                model={model}
                items={items}
                dataKeys={dataKeys}
                headers={headers}
                page={page}
                totalPages={totalPages}
                onDelete={this.openDialog}
                onPageChange={this.onPageChange}
                onSelect={this.onSelectedListChange}
              />

              <DeleteDialog
                open={this.state.open}
                closeDialog={this.closeDialog}
              />

              <React.Fragment>
                <Drawer
                  anchor="right"
                  open={this.state.searchOpen}
                  onClose={this.handleToggle}
                  style={styles.searchDrawer}
                >
                  <Grid container spacing={0} style={styles.searchGrid}>
                    <Grid item style={styles.searchField}>
                      <h5>Search</h5>
                    </Grid>
                    <Grid item xs={12} style={styles.searchField}>
                      <TextField
                        placeholder="First Name"
                        label="First Name"
                        name="firstname"
                        fullWidth={true}
                        value={this.state.search.contain.firstname}
                        onChange={this.handleSearchFilter}
                      />
                    </Grid>
                    <Grid item xs={12} style={styles.searchField}>
                      <TextField
                        placeholder="Last Name"
                        label="Last Name"
                        fullWidth={true}
                        name="lastname"
                        value={this.state.search.contain.lastname}
                        onChange={this.handleSearchFilter}
                      />
                    </Grid>
                    <Divider />
                    <Grid item xs={12} style={styles.searchField}>
                      <Button
                        variant="contained"
                        onClick={this.handleSearch}
                        color="secondary"
                        style={styles.searchButton}
                      >
                        Search
                    </Button>
                      <Button
                        variant="contained"
                        onClick={this.clearSearchFilter}
                        color="default"
                      >
                        Cancel
                    </Button>
                    </Grid>
                  </Grid>
                </Drawer>
              </React.Fragment>
            </div>
          )}
      </PageBase>
    );
  }
}

function mapStateToProps(state) {
  const {
    customerList,
    isFetching,
    errorMessage,
    user,
    deleted,
    selected,
  } = state.customer;

  return {
    customerList,
    isFetching,
    errorMessage,
    user,
    deleted,
    selected
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchCustomer: (action?: TODO) => dispatch(thunkApiCall(action)),
    deleteCustomer: (action: TODO) => dispatch(thunkApiCall(action)),
    newCustomer: (action?: TODO) => dispatch(thunkApiCall(action)),
    exportSelected: (action?: TODO) => dispatch(thunkApiCall(action)),
  };
}

function exportToCsv(filename, rows) {
  var processRow = function (row) {
    var finalVal = '';
    for (var j = 0; j < row.length; j++) {
      var innerValue = row[j] === null ? '' : row[j].toString();
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      };
      var result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0)
        result = '"' + result + '"';
      if (j > 0)
        finalVal += ',';
      finalVal += result;
    }
    return finalVal + '\n';
  };

  var csvFile = '';
  for (var i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListPage);
