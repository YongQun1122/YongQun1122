import { AxiosError, AxiosResponse } from "axios";
import { notification } from "antd";
import { NextRouter } from "next/router";
import _ from "lodash";
import FileSaver from "file-saver";
import { parseMoney } from "./parser";

export * from "./parser";

export const getErrorMessage = (error: AxiosError | Error | string): string => {
  let message = "";
  if (_.isString(error)) {
    message = error;
  } else if (_.get(error, "response.data")) {
    const data = _.get(error, "response.data");
    message = _.get(data, "message") || "";
    if (!message) message = _.toString(_.get(error, "response.data"));
  } else if (!_.isEmpty(_.get(error, "networkError.result.errors"))) {
    const errors = _.get(error, "networkError.result.errors");
    message = _.join(_.map(errors, "message"), ", ");
  } else if (error instanceof Error) {
    message = error.message;
  }
  return message;
};

export const printSuccessMessage = ({ message, description }: { message: string; description: string }): void => {
  notification.success({ message, description, duration: 3 });
};
export const printErrorMessage = (error: AxiosError | Error | string | any, title = ""): void => {
  const message = getErrorMessage(error);
  notification.error({
    message: title || "Error",
    description: message
  });
};

export const parseMinsToHours = (n: number) => {
  const num = n;
  const hours = num / 60 / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
};

/** Remove white space in string */
export const trimString = (str: string): string => {
  if (!str) return str;
  if (!_.isString(str)) return str;
  return str.replace(/^\s+|\s+$/g, "");
};

export const splitStringToArray = (str: string, symbol: string): string[] => {
  if (!str) return [];
  const result = str.split(symbol);
  result.forEach((val, index) => {
    result[index] = trimString(val);
  });
  return _.isEmpty(result) ? [] : result;
};

export const priceIncTax = (price: number, rate: number) => {
  const tax = (price * rate) / 100;
  const total = price + tax;
  return parseMoney(total);
};

export const saveFileFromRes = (res: AxiosResponse) => {
  const type = _.get(res.data, "type") || res.headers["content-type"];
  const blob = new Blob([res.data], { type });
  let filename = "";

  const disposition = res.headers["content-disposition"];
  if (disposition && disposition.indexOf("attachment") !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  }
  FileSaver.saveAs(blob, filename);
};

export const calculateVolumetricWeight = (length: number, width: number, height: number, quantity?: number): number => {
  const area = length * width * height;
  const vl = area / 6000;
  const result = quantity ? quantity * vl : vl;
  return Math.round(result * 100) / 100;
};

export const getPagingFromQuery = (router: NextRouter) => {
  const size = _.toNumber(_.get(router.query, "size", 10));
  const offset = (_.toNumber(_.get(router.query, "page", 1)) - 1) * size;
  return { limit: size, offset };
};

export const getFiltersFromQuery = (router: NextRouter) => ({ ..._.omit(router.query, ["limit", "offset", "field", "direction", "page", "size"]) });

export const getSortingFromQuery = (router: NextRouter) => {
  const field = _.get(router.query, "field") as string;
  const direction = _.get(router.query, "direction") || "ASC";
  if (!field) return undefined;
  return { field, direction };
};

export const generateArrayOfYears = (length: number) => {
  const max = new Date().getFullYear();
  const min = max - length;
  const years = [];
  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

export const generateArrayOfDays = (year: number, month: number) => {
  const totalDays = new Date(year, month, 0).getDate();
  const days = [];
  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }
  return days;
};

export const fileToBase64 = (file: any, callback?: (val: string) => void) => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback?.(reader.result as string);
      return Promise.resolve(reader.result);
    };
    reader.onerror = function (error) {
      return Promise.reject(error);
    };
  } catch (e) {
    return Promise.reject(e);
  }
};
