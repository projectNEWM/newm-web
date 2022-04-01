import { Theme, useTheme } from "@emotion/react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useFormikContext } from "formik";
import { FunctionComponent, useState } from "react";

interface MultiSelectProps {
  name: string;
  label: string;
  options: string[];
  size?: "small" | "medium";
  width?: string;
}

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

const MultiSelect: FunctionComponent<MultiSelectProps> = ({
  name,
  label,
  options,
  size,
  width,
}) => {
  const theme = useTheme();
  const [fieldState, setFieldState] = useState<string[]>([]);
  const { setFieldValue } = useFormikContext();

  const names = options;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setFieldValue(name, value);
    setFieldState(value as string[]);
  };

  return (
    <div>
      <FormControl
        size={ size ? size : "small" }
        sx={ { width: width ?? "-webkit-fill-available" } }
      >
        <InputLabel id="demo-multiple-name-label">{ label }</InputLabel>
        <Select
          sx={ {
            backgroundColor: "#151515",
            border: "1px solid #2F2F2F",
            borderRadius: "9px",
            boxShadow: "inset 0px 3px 6px #000000D0",
            height: "38px",
            minWidth: "100px",
            opacity: 1,
          } }
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={ fieldState }
          onChange={ handleChange }
          input={ <OutlinedInput sx={ { height: "15px" } } label={ label } /> }
          MenuProps={ MenuProps }
        >
          { names.map((name) => (
            <MenuItem
              key={ name }
              value={ name }
              style={ getStyles(name, fieldState, theme) }
            >
              { name }
            </MenuItem>
          )) }
        </Select>
      </FormControl>
    </div>
  );
};

function getStyles(name: string, fieldState: string | string[], theme: Theme) {
  return {
    fontWeight:
      fieldState.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default MultiSelect;
