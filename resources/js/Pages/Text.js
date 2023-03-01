import React, { useState } from "react";
import ReactDOM from "react-dom";
import NumberFormat from "react-number-format";
import TextField from '@mui/material/TextField';


export default function Text() {
    const [values, setValues] = React.useState(1320);

    const handleChange = event => {
        setValues(parseInt(event.target.value));
    };

    return (
            <TextField
                label="react-number-format"
                value={values.toFixed(2)}
                onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                    inputComponent: React.forwardRef((props, ref) => (
                            <NumberFormat
                                getInputRef={props.inputRef}
                                onValueChange={values => {
                                    props.onChange({
                                        target: {
                                            name: props.name,
                                            value: values.value
                                        }
                                    });
                                }}
                                thousandSeparator
                                // isNumericString
                            />
                    ))
                }}
            />
    );
}
