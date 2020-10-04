import GenericField from "./GenericField";
import * as yup from "yup";

export default class DecimalRangeField extends GenericField {
  forFilter() {
    return yup
      .array()
      .ensure()
      .compact()
      .of(yup.number().nullable(true).label(this.label))
      .label(this.label);
  }

  forFormInitialValue(value) {
    return value || [];
  }
}
