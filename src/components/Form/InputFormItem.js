import React, { Component } from "react";
import PropTypes from "prop-types";
import FormErrors from "./formErrors";
import { FastField } from "formik";
import { TextField } from "@material-ui/core";


export class InputFormItemNotFast extends Component {
  
  render() {
    const {
      label,
      name,
      form,
      hint,
      type,
      placeholder,
      autoFocus,
      autoComplete,
      inputProps,
      disable,
      errorMessage,
      required,
      readonly,
      
    } = this.props;
        
    return (
      <TextField
        id={name}
        type={type}
        label={label}
        required={required}
        margin="normal"
        fullWidth
        variant="outlined"
        onChange={(event) => {
          form.setFieldValue(name, event.target.value);
          form.setFieldTouched(name);
        }}
        value={form.values[name] || ""}
        disabled={disable || false}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || undefined}
        autoComplete={autoComplete || undefined}
        InputLabelProps={{
          //shrink: true,   
        }}
        InputProps={{
          readOnly: readonly || false,
        }}
    
        error={!!FormErrors.displayableError(form, name, errorMessage)}
        helperText={
          FormErrors.displayableError(form, name, errorMessage) || hint
        }
      
        {...inputProps}
      />
    );
  }
}

InputFormItemNotFast.defaultProps = {
  type: "text",
  required: false,
};

InputFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  readonly: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  inputProps: PropTypes.object,
};

class InputFormItem extends Component {
  render() {
   
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => <InputFormItemNotFast {...this.props} form={form} />}
      />
    );
  }
}

export default InputFormItem;
