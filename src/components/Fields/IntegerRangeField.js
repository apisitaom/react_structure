import GenericField from "./GenericField";
import * as yup from "yup";

export default class IntegerRangeField extends GenericField {
  forFilter() {
    return yup.mixed().label(this.label);
  }
  
  forForm() {
    return yup.mixed().label(this.label);
  }

  forFormInitialValue(value) {
    return value || [];
  }
}
