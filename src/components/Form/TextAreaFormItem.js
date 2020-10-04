import React, { Component } from "react";
import PropTypes from "prop-types";
import FormErrors from "./formErrors";
import { FastField } from "formik";
import { TextField } from "@material-ui/core";


export class TextAreaFormItemNotFast extends Component {
  
  render() {
    const requires = <div style={{ color: "red" }}>require</div>;
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
      errorMessage,
      required,
      rows,
      disable,
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
        multiline
        rows={rows}
        error={!!FormErrors.displayableError(form, name, errorMessage)}
        helperText={
          FormErrors.displayableError(form, name, errorMessage) || hint
        }
        InputProps={inputProps}
       
        {...inputProps}
      />
    );
  }
}

TextAreaFormItemNotFast.defaultProps = {
  type: "text",
  required: false,
};

TextAreaFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  inputProps: PropTypes.object,
};

class TextAreaFormItem extends Component {
  render() {
   
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => <TextAreaFormItemNotFast {...this.props} form={form} />}
      />
    );
  }
}

export default TextAreaFormItem;
