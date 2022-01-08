import { MenuItem, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";

const SelectWrapper = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField
      { ...configSelect }
      sx={ {
        minWidth: "100px",
        height: "38px",
        border: "1px solid #2F2F2F",
        borderRadius: "9px",
        opacity: 1,
        backgroundColor: "#151515",
        boxShadow: "inset 0px 3px 6px #000000D0",
      } }
    >
      { Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={ pos } value={ item }>
            { options[item] }
          </MenuItem>
        );
      }) }
    </TextField>
  );
};

export default SelectWrapper;
