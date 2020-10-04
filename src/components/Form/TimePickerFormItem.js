import React, { Component } from "react";
import PropTypes from "prop-types";
import FormErrors from "./formErrors";
import { FastField } from "formik";
import { TextField } from "@material-ui/core";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import { TimePicker, LocalizationProvider } from "@material-ui/pickers";
import { getLanguage } from "../../i18n";
import { i18n } from "../../i18n";

export class TimePickerFormItemNotFast extends Component {
  state = {
    MinTime: this.props.minTime,
  };
  render() {
    const {
      label,
      name,
      form,
      hint,
      autoComplete,
      inputProps,
      errorMessage,
      required,
      minTime,
      maxTime,
      date,
    } = this.props;

    return (
      <TimePicker
        id={name}
        label={label}
        ampm={false}
        autoComplete={autoComplete || undefined}
        autoOk={true}
        minTime={minTime || undefined}
        maxTime={maxTime || undefined}
        value={form.values[name] || null}
        onChange={(value) => {
          form.setFieldValue(name, value);
          form.setFieldTouched(name);
        }}
        {...inputProps}
        renderInput={(props) => (
          <TextField
            margin="normal"
            variant="outlined"
            {...props}
            required={required}
            error={!!FormErrors.displayableError(form, name, errorMessage)}
            helperText={
              FormErrors.displayableError(form, name, errorMessage) || hint
            }
          />
        )}
      />
    );
  }
}

TimePickerFormItemNotFast.defaultProps = {
  required: false,
};

TimePickerFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  inputProps: PropTypes.object,
};

class TimePickerFormItem extends Component {
  render() {
    return (
      <LocalizationProvider
        dateAdapter={DateFnsUtils}
        locale={getLanguage().dateFns}
      >
        <FastField
          name={this.props.name}
          render={({ form }) => (
            <TimePickerFormItemNotFast {...this.props} form={form} />
          )}
        ></FastField>
      </LocalizationProvider>
    );
  }
}

export default TimePickerFormItem;
