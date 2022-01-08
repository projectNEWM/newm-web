import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useField, useFormikContext } from "formik";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, fieldState, theme) {
  return {
    fontWeight:
      fieldState.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultiDropdown({ name, label, options, ...otherProps }) {
  const theme = useTheme();
  const [fieldState, setFieldState] = React.useState([]);
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const names = options;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFieldValue(name, value);
    setFieldState(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
    <div>
      <FormControl sx={{ width: 325 }}>
        <InputLabel sx={{}} id="demo-multiple-name-label">
          {label}
        </InputLabel>
        <Select
          sx={{
            minWidth: "100px",
            height: "38px",
            border: "1px solid #2F2F2F",
            borderRadius: "9px",
            opacity: 1,
            backgroundColor: "#151515",
            boxShadow: "inset 0px 3px 6px #000000D0",
          }}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={fieldState}
          onChange={handleChange}
          input={<OutlinedInput sx={{ height: "15px" }} label={label} />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, fieldState, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
