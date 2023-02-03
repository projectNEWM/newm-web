import { FunctionComponent } from "react";
import {
  Box,
  Collapse,
  Alert as MUIAlert,
  AlertProps as MUIAlertProps,
} from "@mui/material";
import theme from "theme";

interface AlertProps extends MUIAlertProps {
  open?: boolean;
}

const Alert: FunctionComponent<AlertProps> = ({
  action,
  children,
  open = true,
  severity = "info",
  ...rest
}) => {
  return (
    <Box sx={ { width: "100%" } }>
      <Collapse in={ open }>
        <MUIAlert
          action={ action }
          severity={ severity }
          sx={ {
            backgroundColor: theme.colors.grey600,
            borderRadius: "6px",
            p: "8px 16px",
            ".MuiSvgIcon-root": {
              color: "inherit",
            },
            ".MuiAlert-action": {
              p: 0,
              mr: 0,
            },
          } }
          { ...rest }
        >
          { children }
        </MUIAlert>
      </Collapse>
    </Box>
  );
};

export default Alert;
