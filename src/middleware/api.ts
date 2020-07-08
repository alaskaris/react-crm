/* eslint-disable */
import { DB } from "./demo-db"
import { Entity } from '../types';
import url from 'url';
import querystring from 'querystring';
import { HttpMethod } from "../store/types";
import { getSeachFilters } from "../utils/app-utils";

// const ds = Object.assign({}, DB)

if (!localStorage.getItem('ds'))
  localStorage.setItem('ds', JSON.stringify(Object.assign({}, DB)));

if (!localStorage.getItem('customer-count'))
  localStorage.setItem('customer-count', '100');

if (!localStorage.getItem('product-count'))
  localStorage.setItem('product-count', '200');

if (!localStorage.getItem('order-count'))
  localStorage.setItem('order-count', '300');

const EXPAND = "_expand"

function getModel(action: string) {
  if (action.includes("/")) {
    return action.substring(0, action.indexOf("/"))
  }
  else {
    return action;
  }
}

function getId(action: string): number {
  if (action.includes("/")) {
    return parseInt(action.substring(action.indexOf("/") + 1))
  }
  else {
    return 0
  }
}

function getExpand(qs: TODO) {
  if (EXPAND in qs) {
    return qs[EXPAND];
  }
  else return ''
}

function parseRequest(req: string) {
  const parsedUrl = url.parse(req);
  const parsedQs = querystring.parse(parsedUrl.query);
  const model = getModel(parsedUrl.pathname);
  const id = getId(parsedUrl.pathname);
  const exp = getExpand(parsedQs)
  const filters = getSeachFilters(parsedQs)
  return { model, id, exp, filters }
}

export function getData(action: string): Promise<TODO> {
  const ds = JSON.parse(localStorage.getItem('ds'));
  const { model, id, exp, filters } = parseRequest(action)
  return new Promise(function (resolve, _reject) {
    const expandModel = exp
      ? exp === "category"
        ? "categories"
        : exp + "s"
      : exp;


    let result: TODO;
    let expand: string, expandId: number;

    if (model in ds) {
      if (id && id > 0) {
        result = ds[model][ds[model].findIndex((d: { id: number }) => d.id === id)];

        if (model == 'customers') {
          if (result.files) {
            let newfiles: File[] = [];
            result.files.forEach(f => {
              if (f.path) {
                const filename = f.path.split(".")[0];
                const filetype = f.path.split(".")[1];
                let httpType = "application/octet-stream";
                switch (filetype) {
                  case "png":
                    httpType = "image/png";
                    break;
                  case "jpg":
                    httpType = "image/jpeg";
                    break;
                  case "pdf":
                    httpType = "application/pdf";
                    break;
                  case "doc":
                    httpType = "application/msword";
                    break;
                  case "zip":
                    httpType = "application/zip";
                    break;
                  case "xls":
                    httpType = "application/vnd.ms-excel";
                    break;
                  case "csv":
                    httpType = "text/csv";
                    break;
                  case "docx":
                    httpType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                }
                const a = new File([filename], f.path, { type: httpType });
                newfiles.push(a);
              }
            });
            result.files = newfiles;
          }
        }

        if (expandModel) {
          expand =
            expandModel === "categories"
              ? "category"
              : expandModel.substr(0, expandModel.length - 1);
          expandId = result[expand + "Id"] as number;
          result[expand] =
            ds[expandModel][
            ds[expandModel].findIndex((d: { id: number }) => d.id === expandId)
            ];
        }
      } else {
        result = ds[model].map((m: { [x: string]: TODO }) => {
          if (expandModel) {
            expand =
              expandModel === "categories"
                ? "category"
                : expandModel.substr(0, expandModel.length - 1);
            expandId = m[expand + "Id"] as number;
            m[expand] =
              ds[expandModel][
              ds[expandModel].findIndex((d: { id: number }) => d.id === expandId)
              ];
          }
          return m;
        });
      }

      if (filters !== null && filters !== undefined && Object.keys(filters).length > 0) {
        result = result.filter(
          row => Object.keys(filters).every(
            prop => filters[prop](prop, row)
          )
        )
      }
    }
    setTimeout(resolve, 300, { data: result });
  });
}

export function postData(action: string, data: Entity): Promise<TODO> {
  const ds = JSON.parse(localStorage.getItem('ds'));
  const { model } = parseRequest(action)
  return new Promise(function (resolve, _reject) {
    if (data.id==0) {
      if (model == 'customers') {
        data.id = parseInt(localStorage.getItem('customer-count')) + 1;
        localStorage.setItem('customer-count', data.id.toString());
      }
      if (model == 'orders') {
        data.id = parseInt(localStorage.getItem('order-count')) + 1;
        localStorage.setItem('order-count', data.id.toString());
      }
      if (model == 'products') {
        data.id = parseInt(localStorage.getItem('product-count')) + 1;
        localStorage.setItem('product-count', data.id.toString());
      }
    }

    ds[model].push(data);
    localStorage.setItem('ds', JSON.stringify(ds));
    setTimeout(resolve, 300, { data: data });
  });
}

export function putData(action: string, data: Entity): Promise<TODO> {
  const ds = JSON.parse(localStorage.getItem('ds'));
  const { model, id } = parseRequest(action)
  return new Promise(function (resolve, _reject) {
    const idx = ds[model].findIndex((d: { id: number }) => d.id === (id ? id : data.id));
    ds[model][idx] = Object.assign({}, data);
    localStorage.setItem('ds', JSON.stringify(ds));
    setTimeout(resolve, 300, { data: data });
  });
}

export function deleteData(action: string): Promise<TODO> {
  const ds = JSON.parse(localStorage.getItem('ds'));
  const { model, id } = parseRequest(action)
  return new Promise(function (resolve, _reject) {
    if (id > 0) {
      ds[model].splice(ds[model].findIndex((d: Entity) => d.id === id), 1);
    }
    localStorage.setItem('ds', JSON.stringify(ds));
    setTimeout(resolve, 300, { data: id });
  });
}

export function login(action: string, _method: HttpMethod, data: TODO): Promise<TODO> {
  return new Promise(function (resolve, _reject) {
    const ds = JSON.parse(localStorage.getItem('ds'));
    if (data.username === "admin@test.com" && data.password === "password") {
      const { accessToken: accessToken, user } = ds.token;
      setTimeout(resolve, 300, {
        token: accessToken,
        user,
      });
    } else {
      _reject({
        code: 403,
        error: "Your name or password is wrong",
      });
    }
  });
}

export function callApi(endpoint, method: HttpMethod, data?: TODO, filters?: TODO) {
  switch (method) {
    case HttpMethod.GET:
      return getData(endpoint);
    case HttpMethod.PUT:
      return putData(endpoint, data);
    case HttpMethod.POST:
      return postData(endpoint, data)
    case HttpMethod.DELETE:
      return deleteData(endpoint)
    default:
      return null;

  }

}

export const CALL_API = Symbol("Call API")

