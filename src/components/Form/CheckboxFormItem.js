import React, { Component } from "react";
import PropTypes from "prop-types";
import FormErrors from "./formErrors";
import { FastField } from "formik";
import {
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";

export class CheckboxFormItemNotFast extends Component {
  render() {
    const {
      legend,
      label,
      name,
      form,
      hint,
      color,
      inputProps,
      errorMessage,
      required,
    } = this.props;

    const formHelperText =
      FormErrors.displayableError(form, name, errorMessage) || hint;

    return (
      <FormControl
        style={{ marginTop: "16px" }}
        required={required}
        fullWidth
        error={!!FormErrors.displayableError(form, name, errorMessage)}
        component="fieldset"
      >
        {legend && <FormLabel component="legend">{legend}</FormLabel>}
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                id={name}
                name={name}
                checked={form.values[name] || false}
                onChange={(e) => {
                  form.setFieldValue(name, !!e.target.checked);
                  form.setFieldTouched(name);
                }}
                color={color || "secondary"}
                {...inputProps}
              />
            }
            label={label}
          />
        </FormGroup>
        {formHelperText && (
          <FormHelperText style={{ marginTop: 0 }}>
            {formHelperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

CheckboxFormItemNotFast.defaultProps = {};

CheckboxFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  legend: PropTypes.string,
  hint: PropTypes.string,
  color: PropTypes.string,
  errorMessage: PropTypes.string,
  inputProps: PropTypes.object,
};

class CheckboxFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <CheckboxFormItemNotFast {...this.props} form={form} />
        )}
      />
    );
  }
}

export default CheckboxFormItem;
