import React, { Component } from "react";
import PropTypes from "prop-types";
import FormErrors from "./formErrors";
import { FastField } from "formik";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import TextField from "@material-ui/core/TextField";
import {
  MobileDateRangePicker,
  DateRangeDelimiter,
  LocalizationProvider,
  DateTimePicker,
  DatePicker,
} from "@material-ui/pickers";
import { getLanguage } from "../../i18n";
import { i18n } from "../../i18n";

class DatePickerRangeFormItemNotFast extends Component {
  handleStartChanged = (value) => {
    const { form, name } = this.props;
    form.setFieldTouched(name);
    form.setFieldValue(name, [value, this.endValue()]);
  };

  handleEndChanged = (value) => {
    const { form, name } = this.props;
    form.setFieldTouched(name);
    form.setFieldValue(name, [this.startValue(), value]);
  };

  value = () => {
    const { form, name } = this.props;
    if (!form.values[name][0] && !form.values[name][1]) {
      return undefined;
    }
    return [form.values[name][0] || null, form.values[name][1] || null];
  };

  handleChangeValue = (date) => {
    const { form, name } = this.props;
    if (!form.values[name][0] || !form.values[name][1]) {
      form.setFieldValue(name, date);
    } else {
      form.setFieldTouched(name);
      form.setFieldValue(name, date);
    }
  };

  startValue = () => {
    if (!this.value()) {
      return null;
    }

    if (Array.isArray(!this.value())) {
      return null;
    }

    if (!this.value().length) {
      return null;
    }

    return this.value()[0] || null;
  };

  endValue = () => {
    if (!this.value()) {
      return null;
    }

    if (Array.isArray(!this.value())) {
      return null;
    }

    if (this.value().length < 2) {
      return null;
    }

    return this.value()[1] || null;
  };

  _validateion = () => {
    const { form, name, required } = this.props;
    const toShowError = form.touched[name] ? !!form.touched[name] : false;
    if (required) {
      if (!form.touched[name]) {
        form.setErrors({
          ...form.errors,
          [name]: `Date should not be before`,
        });
        return false;
      }

      const errors = form.errors[name];

      if (!errors) {
        form.setErrors({
          ...form.errors,
          [name]: `Date should not be errors`,
        });
        return false;
      }

      return true;
    } else {
      return required;
    }
  };

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

    const DateTimePickerComponent = showTime ? DateTimePicker : DatePicker;
    const format = showTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy";
    const selectDate = this.value() || [null, null];
    //const isInvalid = this._validateion();

    return (
      <div>
        <MobileDateRangePicker
          clearable
          label={label}
          inputFormat={format}
          startText={`${label} ${i18n("common.start")}`}
          endText={`${label} ${i18n("common.end")}`}
          value={selectDate}
          name={name}
          required={required}
          //placeholder={placeholder || undefined}
          //autoFocus={autoFocus || undefined}
          //fullWidth
          onChange={(value) => this.handleChangeValue(value)}
          {...inputProps}
          autoOk={false}
          renderInput={(startProps, endProps) => {
            return (
              <React.Fragment>
                <TextField
                  margin="normal"
                  variant="outlined"
                  {...startProps}
                  fullWidth={true}
                  required={required}
                  autoComplete={autoComplete || undefined}
                  error={
                    !!FormErrors.displayableError(form, name, errorMessage)
                  }
                  helperText={
                    FormErrors.displayableError(form, name, errorMessage) ||
                    hint
                  }
                />
                <DateRangeDelimiter> to </DateRangeDelimiter>
                <TextField
                  margin="normal"
                  variant="outlined"
                  {...endProps}
                  fullWidth={true}
                  required={required}
                  autoComplete={autoComplete || undefined}
                  error={
                    !!FormErrors.displayableError(form, name, errorMessage)
                  }
                  helperText={
                    FormErrors.displayableError(form, name, errorMessage) ||
                    hint
                  }
                />
              </React.Fragment>
            );
          }}
        />
      </div>
    );
  }
}

DatePickerRangeFormItemNotFast.defaultProps = {
  required: false,
};

DatePickerRangeFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class DatePickerRangeFormItem extends Component {
  render() {
    return (
      <LocalizationProvider
        dateAdapter={DateFnsUtils}
        locale={getLanguage().dateFns}
      >
        <FastField
          name={this.props.name}
          render={({ form }) => (
            <DatePickerRangeFormItemNotFast {...this.props} form={form} />
          )}
        />
      </LocalizationProvider>
    );
  }
}

export default DatePickerRangeFormItem;
