import React, { Component } from "react";
import PropTypes from "prop-types";
import FormErrors from "./formErrors";
import { FastField } from "formik";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

export class CheckboxListFormItemNotFast extends Component {
  state = { checked: 0 };

  UNSAFE_componentWillMount() {
    this.handleCheck_Check_All();
  }

  handleCheck_Check_All = async () => {
    const { form, name, AllowCheckAll, dataProvider } = this.props;
    const datas = form.values[name] || [];
    this.setState({ checked: datas.length ? datas.length : 0 });
    
    
  };

  handleSelect = (values) => {
    const { form, name, AllowCheckAll, dataProvider } = this.props;
    const datas = form.values[name] || [];
    const index = datas.indexOf(values.target.name);
    if (AllowCheckAll) {
    }
    if (index === -1) {
      datas.push(values.target.name);
    } else {
      datas.splice(index, 1);
    }
    if (!datas || !datas.length) {
      form.setFieldValue(name, undefined);
      return;
    }
    form.setFieldValue(
      name,
      datas.map((data) => (data ? data : undefined)).filter(Boolean)
    );
    this.setState({ checked: datas.length ? datas.length : 0 }); // checked all

    form.setFieldTouched(name);
  };

  CheckAll = () => {
    const { form, name, dataProvider } = this.props;
    form.setFieldValue(
      name,
      dataProvider.map((data) => (data ? data.id : undefined)).filter(Boolean)
    );

    form.setFieldTouched(name);
  };

  handleSelectAll = (event) => {
    const { form, name, dataProvider } = this.props;
    if (event.target.checked) {
      form.setFieldValue(
        name,
        dataProvider.map((data) => (data ? data.id : undefined)).filter(Boolean)
      );
      form.setFieldTouched(name);
      this.setState({ checked: dataProvider.length ? dataProvider.length : 0 }); // checked all
    } else {
      form.setFieldValue(name, undefined);
      this.setState({ checked: 0 });
    }
  };

  render() {
    // console.log("CheckboxListFormItemNotFast", this.props);
    const {
      label,
      name,
      form,
      hint,
      inputProps,
      errorMessage,
      required,
      dataProvider,
      AllowCheckAll,
      labelAll,
      defaultAll,
    } = this.props;

    const { checked } = this.state;

    const formHelperText =
      FormErrors.displayableError(form, name, errorMessage) || hint;
    const values = form.values[name] || [];

    return (
      <FormControl
        style={{ marginTop: "16px" }}
        required={required}
        fullWidth
        error={!!FormErrors.displayableError(form, name, errorMessage)}
        component="fieldset"
      >
        <FormLabel component="legend">{label}</FormLabel>

        <FormGroup row>
          <Grid container>
            {AllowCheckAll && (
              <Grid item xs={"3"}>
                <FormControlLabel
                  key={"all"}
                  control={
                    <Checkbox
                      id={name + "_All"}
                      name={name + "_All"}
                      checked={checked == dataProvider.length}
                      onChange={(e) => this.handleSelectAll(e)}
                      color="primary"
                      {...inputProps}
                    />
                  }
                  label={labelAll ? labelAll : "All " + label}
                />
              </Grid>
            )}

            {dataProvider.map((row, index) => (
              <Grid item={index} md={"3"} xs={"6"}>
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      id={name + "_" + row.id}
                      name={row.id}
                      checked={values.indexOf(row.id) !== -1}
                      onChange={this.handleSelect}
                      color="primary"
                      {...inputProps}
                    />
                  }
                  label={row.label}
                />
              </Grid>
            ))}
          </Grid>
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

CheckboxListFormItemNotFast.defaultProps = {};

CheckboxListFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  errorMessage: PropTypes.string,
  inputProps: PropTypes.object,
  dataProvider: PropTypes.array,
  AllowCheckAll: PropTypes.bool,
  labelAll: PropTypes.string,
  defaultAll: PropTypes.bool,
};

class CheckboxListFormItem extends Component {
  state = {
    test: false,
  };

  UNSAFE_componentWillReceiveProps(next) {
    if (this.props.dataProvider !== next.dataProvider) {
      this.setState({ test: this.state.test ? false : true });
    }
  }
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <CheckboxListFormItemNotFast
            {...this.props}
            testaa={this.state.test}
            form={form}
          />
        )}
      />
    );
  }
}

export default CheckboxListFormItem;