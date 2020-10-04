import GenericField from "./GenericField";
import * as yup from "yup";

export default class StringField extends GenericField {
  constructor(
    name,
    label,
    {
      required = false,
      min = undefined,
      max = undefined,
      matches = undefined,
      email = undefined,
      mobile = undefined,
    } = {}
  ) {
    super(name, label);

    this.required = required;
    this.matches = matches;
    this.min = min;
    this.max = max;
    this.email = email;
    this.mobile = mobile;
  }

  forView(value) {
    return value;
  }

  forFormInitialValue(value) {
    return value;
  }

  forForm() {

    let yupChain = yup.string().nullable(true).trim().label(this.label);

    if (this.required) {
      yupChain = yupChain.required();
    }

    if (this.min || this.min === 0) {
      yupChain = yupChain.min(this.min);
    }

    if (this.max) {
      yupChain = yupChain.max(this.max);
    }

    if (this.matches) {
      yupChain = yupChain.matches(/^[0-9]/);
    }

    if (this.email) {
      yupChain = yupChain.matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    }

    if (this.mobile) {
      yupChain = yupChain.matches(/(\+60|\+63|\+62|\+66|\-|0)\d{0,13}/m);
    }

    return yupChain;
  }

  forFilter() {
    return yup.string().nullable(true).trim().label(this.label);
  }

  forExport() {
    return yup.mixed().label(this.label);
  }

  forImport() {
    let yupChain = yup.string().nullable(true).trim().label(this.label);

    if (this.required) {
      yupChain = yupChain.required();
    }

    if (this.min || this.min === 0) {
      yupChain = yupChain.min(this.min);
    }

    if (this.max) {
      yupChain = yupChain.max(this.max);
    }

    if (this.matches) {
      yupChain = yupChain.matches(/^[0-9]/);
    }

    return yupChain;
  }
}
