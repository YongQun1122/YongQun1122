import { Rule } from "antd/lib/form";
import _ from "lodash";

export const FormLayout = {
  labelCol: { xs: 24, sm: 7 },
  wrapperCol: { xs: 24, sm: 14, md: 13, lg: 10 }
};

export const FormButtonLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 12, offset: 7 },
    md: { span: 10, offset: 7 }
  }
};

const typeTemplate = "${label} is not a valid ${type}";
export const ValidateMessages = {
  default: "Validation error on field ${label}",
  required: "${label} is required",
  enum: "${label} must be one of [${enum}]",
  whitespace: "${label} cannot be empty",
  date: {
    format: "${label} is invalid for format date",
    parse: "${label} could not be parsed as date",
    invalid: "${label} is invalid date"
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate
  },
  string: {
    len: "${label} must be exactly ${len} characters",
    min: "${label} must be at least ${min} characters",
    max: "${label} cannot be longer than ${max} characters",
    range: "${label} must be between ${min} and ${max} characters"
  },
  number: {
    len: "${label} must equal ${len}",
    min: "${label} cannot be less than ${min}",
    max: "${label} cannot be greater than ${max}",
    range: "${label} must be between ${min} and ${max}"
  },
  array: {
    len: "${label} must be exactly ${len} in length",
    min: "${label} cannot be less than ${min} in length",
    max: "${label} cannot be greater than ${max} in length",
    range: "${label} must be between ${min} and ${max} in length"
  },
  pattern: {
    mismatch: "${label} does not match pattern ${pattern}"
  }
};

export const Rules = {
  required: (text: string): Rule => ({ required: true, message: `${text} is required` }),
  email: (): Rule => ({ type: "email", message: "Email is not a valid email." }),
  min: (label: string, min: number): Rule => ({ type: "number", min, message: `${label} must be more than ${min}` }),
  max: (label: string, max: number): Rule => ({ type: "number", max, message: `${label} must be less than ${max}` })
};

export const FormRule = (name: string) => ({
  required: (): Rule => ({ required: true, message: `${name} is required` }),
  email: (): Rule => ({ type: "email", message: `${name} is not a valid email.` }),
  notEmpty: (): Rule => ({ type: "string", message: `${name} cannot be empty.` }),
  noSpecialChar: (): Rule => {
    return () => ({
      validator: (_rule, value) => {
        if (value) {
          const valid = !value.match(/[^a-zA-Z0-9-_]/);
          if (!valid) return Promise.reject(new Error(`Special characters not allowed.`));
        }
        return Promise.resolve();
      }
    });
  },
  noWhiteSpace: (): Rule => {
    return () => ({
      validator: (_rule, value) => {
        if (value) {
          const valid = /^\S+$/.test(value);
          if (!valid) return Promise.reject(new Error(`${name} cannot contain space.`));
        }
        return Promise.resolve();
      }
    });
  },
  min: (min: number): Rule => {
    return () => ({
      validator: (_rule, value): Promise<void> => {
        if (value) {
          if (_.isString(value)) {
            const valid = value.length >= min;
            if (!valid) return Promise.reject(new Error(`${name} must be more than ${min} characters long.`));
          } else if (_.isNumber(value)) {
            const valid = value >= min;
            if (!valid) return Promise.reject(new Error(`${name} must be more than ${min}`));
          } else if (_.isArray(value)) {
            const valid = value.length >= min;
            if (!valid) return Promise.reject(new Error(`${name} must be more than ${min} items.`));
          }
        }
        return Promise.resolve();
      }
    });
  },
  max: (max: number): Rule => {
    return () => ({
      validator: (_rule, value): Promise<void> => {
        if (value) {
          if (_.isString(value)) {
            const valid = value.length <= max;
            if (!valid) return Promise.reject(new Error(`${name} must be less than ${max} characters long.`));
          } else if (_.isNumber(value)) {
            const valid = value <= max;
            if (!valid) return Promise.reject(new Error(`${name} must be less than ${max}`));
          } else if (_.isArray(value)) {
            const valid = value.length <= max;
            if (!valid) return Promise.reject(new Error(`${name} must be less than ${max} items.`));
          }
        }
        return Promise.resolve();
      }
    });
  }
});
