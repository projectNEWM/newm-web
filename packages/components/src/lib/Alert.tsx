import { FunctionComponent, SyntheticEvent, useEffect, useState } from "react";
import { Alert as MUIAlert, Snackbar, Typography } from "@mui/material";
import { CheckCircle, CloseCircleFill } from "@newm-web/assets";
import theme from "@newm-web/theme";

interface AlertProps {
  readonly heading?: string;
  readonly message: string;
  readonly onClose?: () => void;
  readonly severity?: "error" | "success";
}

const Alert: FunctionComponent<AlertProps> = ({
  onClose,
  heading,
  message,
  severity,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (heading || message) setIsOpen(true);
  }, [heading, message]);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    onClose?.();
    setIsOpen(false);
  };

  // Without message check the alert is set to empty but the snackbar
  // persists for a short period when clearToastMessage is called
  return isOpen && !!message ? (
    <Snackbar
      anchorOrigin={ { horizontal: "right", vertical: "top" } }
      autoHideDuration={ severity === "error" ? null : 2000 }
      open={ isOpen }
      sx={ {
        "&.MuiSnackbar-root": {
          left: [null, null, "32px"],
          right: [null, null, "32px"],
          top: "32px",
        },
      } }
      onClose={ handleClose }
    >
      <MUIAlert
        iconMapping={ {
          error: <CloseCircleFill />,
          success: <CheckCircle fill={ theme.colors.green } />,
        } }
        severity={ severity }
        sx={ {
          "&.MuiAlert-root": {
            "&.MuiAlert-outlined": {
              "&.MuiAlert-outlinedError": {
                borderColor: theme.colors.red,
              },
              "&.MuiAlert-outlinedSuccess": {
                borderColor: theme.colors.green,
              },
              ".MuiSvgIcon-root": {
                color: theme.colors.white,
              },
              backgroundColor: theme.colors.black,
              color: theme.colors.white,
              textAlign: "left",
            },
            ".MuiAlert-action": {
              paddingTop: 0,
            },
            ".MuiAlert-message": {
              paddingRight: [1, 2, 6],
            },
            alignItems: "center",
          },
        } }
        variant="outlined"
        onClose={ handleClose }
      >
        <Typography variant="h6">{ heading }</Typography>
        <Typography
          sx={ { fontWeight: "400", marginTop: heading ? 1 : 0 } }
          variant="h6"
        >
          { message }
        </Typography>
      </MUIAlert>
    </Snackbar>
  ) : null;
};

export default Alert;
