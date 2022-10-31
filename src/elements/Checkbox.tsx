import { ForwardRefRenderFunction, ForwardedRef, forwardRef } from "react";
import theme from "theme";
import {
  Checkbox as MUICheckbox,
  CheckboxProps as MUICheckboxProps,
  Stack,
} from "@mui/material";
import CheckboxIcon from "assets/images/CheckboxIcon";

interface CheckboxProps extends MUICheckboxProps {
  ariaDescribedBy?: string;
}

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { ariaDescribedBy, checked, ...rest },
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <MUICheckbox
      aria-describedby={ ariaDescribedBy }
      checked={ checked }
      inputRef={ ref }
      icon={
        <Stack
          sx={ {
            border: `2px solid ${theme.colors.grey400}`,
            borderRadius: "2px",
            height: "20px",
            width: "20px",
          } }
        ></Stack>
      }
      checkedIcon={ <CheckboxIcon /> }
      sx={ {
        "&.MuiCheckbox-root": {
          backgroundColor: theme.colors.grey600,
          borderRadius: "2px",
          minHeight: "20px",
          minWidth: "20px",
          overflow: "hidden",
          p: 0,
        },

        "&.Mui-checked": {
          backgroundColor: theme.colors.pink,
        },
      } }
      { ...rest }
    />
  );
};

export default forwardRef(Checkbox);
