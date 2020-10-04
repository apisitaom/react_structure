import GenericField from "./GenericField";
import * as yup from "yup";
import moment from "moment";
import { i18n } from "../../i18n";

export default class DateTimeRangeField extends GenericField {
  constructor(name, label, { required = false } = {}) {
    super(name, label);

    this.required = required;
  }
  forFilter() {
    return yup.mixed().label(this.label);
  }

  forForm() {
    let yupChain = yup
      .array()
      .of(
        yup
          .mixed()
          .nullable(true)
          .label(this.label)
          .transform((value) => (value ? moment(value).format("YYYY-MM-DDTHH:mm:ss") : null))
      )
      .label(this.label);

    if (this.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  }

  forFormInitialValue(value) {
    if (!value || !value.length) {
      return [];
    }

    return value.map((item) => (item ? moment(item).toDate() : null));
  }
}
