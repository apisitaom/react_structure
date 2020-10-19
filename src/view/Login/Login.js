import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import InputFormItem from "../../components/Form/InputFormItem";
import { Formik } from "formik";
import fields from "../../models/Login/LoginModel";
import FormSchema from "../../components/Form/FormSchema";

export class Login extends Component {
  schema = new FormSchema(fields.id, [fields.userId, fields.password]);
  handleSubmit = async (values) => {
    const { id, ...data_ } = this.schema.cast(values);
    console.log("handleSubmit", values);
  };
  initialValues = () => this.schema.initialValues({});
  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize
          onSubmit={this.handleSubmit}
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          render={(form) => {
            return (
              <form onSubmit={this.handleSubmit}>
                <div style={{ paddingTop: "10%" }}>
                  <Grid container spacing={2}>
                    <Grid item sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                      <InputFormItem
                        name={fields.userId.name}
                        label={fields.userId.label}
                        required={true}
                      />
                    </Grid>
                    <Grid item sm={6}></Grid>
                    <Grid item sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                      <InputFormItem
                        name={fields.password.name}
                        label={fields.password.label}
                        required={true}
                      />
                    </Grid>
                    <Grid item sm={6}></Grid>
                    <Grid item sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        onClick={form.handleSubmit}
                      >
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </form>
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default Login;
