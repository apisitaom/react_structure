import React, { Component } from "react";
import PropTypes from "prop-types";
import FormErrors from "./formErrors";
import { FastField } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Switch,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  switchBase: {
    //color: "",
    "&$checked": {
      //transform: "translateX(20px)",
      color: "#52d869",
    },
    "&$checked + $track": {
      backgroundColor: "#c8e6c9",
      opacity: 1,
      border: "none",
    },
  },
  checked: {},
  track: {},
});

export class SwitchFormItemNotFast extends Component {
  render() {
    const {
      classes,
      label,
      name,
      form,
      hint,
      inputProps,
      errorMessage,
      required,
      color,
      style,
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
        <FormLabel component="legend">{label}</FormLabel>
        <Switch
          classes={{
            switchBase: classes.switchBase,
            checked: classes.checked,
            track: classes.track,
          }}
          id={name}
          name={name}
          checked={form.values[name] || false}
          onChange={(e) => {
            form.setFieldValue(name, !!e.target.checked);
            form.setFieldTouched(name);
          }}
          // color={color || "primary"}
          {...inputProps}
        ></Switch>
        {formHelperText && (
          <FormHelperText style={{ marginTop: 0 }}>
            {formHelperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

SwitchFormItemNotFast.defaultProps = {};

SwitchFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  errorMessage: PropTypes.string,
  inputProps: PropTypes.object,
};

class SwitchFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <SwitchFormItemNotFast {...this.props} form={form} />
        )}
      />
    );
  }
}

export default withStyles(styles)(SwitchFormItem);
