import React, { Component } from "react";
import PropTypes from "prop-types";
import FormErrors from "./formErrors";
import { FastField } from "formik";
import { TextField } from "@material-ui/core";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import {
  MobileDatePicker,
  MobileDateTimePicker,
  LocalizationProvider,
} from "@material-ui/pickers";
import { getLanguage } from "../../i18n";
import { i18n } from "../../i18n";

export class DatePickerFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      placeholder,
      autoFocus,
      autoComplete,
      inputProps,
      errorMessage,
      required,
      showTime,
    } = this.props;

    const DateTimePickerComponent = showTime
      ? MobileDateTimePicker
      : MobileDatePicker;

    const format = showTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy";
    // console.log("inputProps", inputProps);
    return (
      <DateTimePickerComponent
        clearable
        inputFormat={format}
        id={name}
        label={label}
        onChange={(value) => {
          form.setFieldValue(name, value);
          form.setFieldTouched(name);
        }}
        value={form.values[name] || null}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || undefined}
        autoComplete={autoComplete || undefined}
        // InputLabelProps={{
        //   shrink: true,
        // }}

        autoOk
        {...inputProps}
        renderInput={(props) => (
          <TextField
            margin="normal"
            variant="outlined"
            fullWidth
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

DatePickerFormItemNotFast.defaultProps = {
  required: false,
};

DatePickerFormItemNotFast.propTypes = {
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

class DatePickerFormItem extends Component {
  render() {
    return (
      <LocalizationProvider
        dateAdapter={DateFnsUtils}
        locale={getLanguage().dateFns}
      >
        <FastField
          name={this.props.name}
          render={({ form }) => (
            <DatePickerFormItemNotFast {...this.props} form={form} />
          )}
        ></FastField>
      </LocalizationProvider>
    );
  }
}

export default DatePickerFormItem;
