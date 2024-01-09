import { FunctionComponent } from "react";
import {
  Box,
  Collapse,
  Alert as MUIAlert,
  AlertProps as MUIAlertProps,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import theme from "@newm-web/theme";

interface AlertProps extends MUIAlertProps {
  open?: boolean;
}

// replaces default warning icon (filled instead of outlined)
const iconMapping = {
  warning: <WarningIcon />,
};

const Alert: FunctionComponent<AlertProps> = ({
  action,
  children,
  open = true,
  severity = "info",
  sx,
  ...rest
}) => {
  return (
    <Box sx={ { width: "100%" } }>
      <Collapse in={ open }>
        <MUIAlert
          action={
            <Box sx={ { alignItems: "center", display: "flex", height: "100%" } }>
              { action }
            </Box>
          }
          iconMapping={ iconMapping }
          severity={ severity }
          sx={ {
            ".MuiAlert-action": {
              mr: 0,
              p: 0,
            },
            ".MuiAlert-icon": {
              alignItems: "center",
            },
            ".MuiAlert-message": {
              paddingRight: 1,
            },
            ".MuiSvgIcon-root": {
              color: "inherit",
            },
            backgroundColor: theme.colors.grey600,
            borderRadius: "6px",
            p: "8px 16px",
            ...sx,
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
