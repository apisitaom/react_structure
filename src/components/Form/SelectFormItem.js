import React, { Component } from "react";
import PropTypes from "prop-types";
import FormErrors from "./formErrors";
import { FastField } from "formik";
import Select from "react-select";
import { i18n } from "../../i18n";
import {
  components as materialUiComponents,
  styles as materialUiStyles,
} from "./reactSelectMaterialUi";
import { withStyles } from "@material-ui/core/styles";

class SelectFormItemNotFast extends Component {
  value = () => {
    const { mode } = this.props;
    if (mode === "multiple") {
      return this.valueMultiple();
    } else {
      return this.valueOne();
    }
  };

  valueMultiple = () => {
    const { form, name, options } = this.props;

    if (form.values[name]) {
      return form.values[name].map((value) =>
        options.find((option) => option.value === value)
      );
    }

    return [];
  };

  valueOne = () => {
    const { form, name, options } = this.props;

    if (form.values[name]) {
      return options.find((option) => option.value === form.values[name]);
    }

    return "";
  };

  handleSelect = (data) => {
    const { form, name } = this.props;
    form.setFieldTouched(name);
    const { mode } = this.props;
    if (mode === "multiple") {
      return this.handleSelectMultiple(data);
    } else {
      return this.handleSelectOne(data);
    }
  };

  handleSelectMultiple = (values) => {
    const { form, name } = this.props;

    if (!values) {
      form.setFieldValue(name, []);
      return;
    }

    form.setFieldValue(
      name,
      values.map((data) => (data ? data.value : undefined)).filter(Boolean)
    );
  };

  handleSelectOne = (data) => {
    const { form, name, onSetSelect, allValues } = this.props;

    if (!data) {
      form.setFieldValue(name, undefined);
      return;
    }

    if (onSetSelect) {
      // SET VALUE ตรงนึ้
      onSetSelect(form, data.allValues);
    }

    form.setFieldValue(name, data.value);
  };

  render() {
    const {
      name,
      label,
      form,
      hint,
      options,
      disable,
      errorMessage,
      required,
      mode,
      placeholder,
      isClearable,
      classes,
    } = this.props;
    const isInvalid = !!FormErrors.displayableError(form, name, errorMessage);
    const value = this.value();
    const controlStyles = {
      container: (provided) => ({
        ...provided,
        width: "100%",
        marginTop: "16px",
        marginBottom: "8px",
      }),
      control: (provided) => ({
        ...provided,
        borderColor: isInvalid ? "red" : undefined,
      }),
    };

    return (
      <Select
        styles={controlStyles}
        classes={classes}
        value={value}
        onChange={this.handleSelect}
        inputId={name}
        TextFieldProps={{
          label,
          required,
          variant: "outlined",
          //shrink: false,
          fullWidth: true,
          //value: value,

          error: !!FormErrors.displayableError(form, name, errorMessage),
          helperText:
            FormErrors.displayableError(form, name, errorMessage) || hint,
          InputLabelProps: {
            shrink: true,
            //variant: "outlined",
          },
          // InputProps: { classes: { root: classes.selectRoot } },
        }}
        components={materialUiComponents}
        options={options}
        isDisabled={disable || false}
        isMulti={mode === "multiple"}
        placeholder={placeholder || ""}
        isClearable={isClearable}
        loadingMessage={() => i18n("autocomplete.loading")}
        noOptionsMessage={() => i18n("autocomplete.noOptions")}
      />
    );
  }
}

SelectFormItemNotFast.defaultProps = {
  required: false,
  isClearable: true,
};

SelectFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  mode: PropTypes.string,
  isClearable: PropTypes.bool,
};

class SelectFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <SelectFormItemNotFast {...this.props} form={form} />
        )}
      />
    );
  }
}

export default withStyles(materialUiStyles)(SelectFormItem);
