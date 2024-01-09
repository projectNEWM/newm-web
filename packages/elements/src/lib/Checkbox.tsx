import {
  ForwardRefRenderFunction,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react";
import theme from "@newm-web/theme";
import {
  Box,
  Checkbox as MUICheckbox,
  CheckboxProps as MUICheckboxProps,
  Stack,
  Typography,
} from "@mui/material";
import { CheckboxIcon } from "@newm-web/assets";
import ErrorMessage from "./styled/ErrorMessage";

export interface CheckboxProps extends MUICheckboxProps {
  readonly ariaDescribedBy?: string;
  readonly errorMessage?: string;
  readonly label?: string | ReactNode;
}

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { ariaDescribedBy, checked, sx, errorMessage, label, ...rest },
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <Stack alignItems="flex-start" direction="row" gap={ 1.5 }>
      <MUICheckbox
        aria-describedby={ ariaDescribedBy }
        checked={ checked }
        checkedIcon={ <CheckboxIcon /> }
        icon={
          <Box
            sx={ {
              border: `2px solid ${theme.colors.grey400}`,
              borderRadius: "2px",
              height: "20px",
              width: "20px",
            } }
          />
        }
        inputRef={ ref }
        sx={ {
          "&.Mui-checked": {
            backgroundColor: theme.colors.music,
          },

          "&.MuiCheckbox-root": {
            backgroundColor: theme.colors.grey600,
            borderRadius: "2px",
            minHeight: "20px",
            minWidth: "20px",
            overflow: "hidden",
            p: 0,
          },

          ...sx,
        } }
        { ...rest }
      />

      <Stack direction="column">
        { typeof label === "string" ? (
          <Typography
            sx={ { color: theme.colors.white, fontSize: 12 } }
            variant="subtitle1"
          >
            { label }
          </Typography>
        ) : (
          label
        ) }

        { !!errorMessage && <ErrorMessage>{ errorMessage }</ErrorMessage> }
      </Stack>
    </Stack>
  );
};

export default forwardRef(Checkbox);
