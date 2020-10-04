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

class SelectNoForm extends Component {


    render() {
        const {
            name,
            label,
            options,
            disable,
            required,
            mode,
            placeholder,
            isClearable,
            classes,
            value
        } = this.props;

        const controlStyles = {
            container: (provided) => ({
                ...provided,
                width: "100%",
                marginTop: "16px",
                marginBottom: "8px",
            }),
            control: (provided) => ({
                ...provided,

            }),
        };

        return (
            <Select
                {...this.props}
                styles={controlStyles}
                classes={classes}
                value={value}

                inputId={name}
                TextFieldProps={{
                    label,
                    required,
                    variant: "outlined",
                    //shrink: false,
                    fullWidth: true,
                    //value: value,


                    InputLabelProps: {
                        shrink: true,

                    },

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




export default withStyles(materialUiStyles)(SelectNoForm);
