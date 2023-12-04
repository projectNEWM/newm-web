import { SyntheticEvent, useEffect, useState } from "react";
import { clearToastMessage, selectUi } from "../modules/ui";
import { Alert, Snackbar, Typography, useTheme } from "@mui/material";
import { CheckCircle, CloseCircleFill } from "@newm-web/assets";
import { useAppDispatch, useAppSelector } from "../common";

const Toast = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const {
    toast: { heading, message, severity },
  } = useAppSelector(selectUi);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (heading || message) setIsOpen(true);
  }, [heading, message]);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    dispatch(clearToastMessage());
    setIsOpen(false);
  };

  return isOpen ? (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={handleClose}
      open={isOpen}
      sx={{
        "&.MuiSnackbar-root": {
          left: [null, null, "32px"],
          right: [null, null, "32px"],
          top: "32px",
        },
      }}
    >
      <Alert
        iconMapping={{
          error: <CloseCircleFill />,
          success: <CheckCircle fill={theme.colors.green} />,
        }}
        onClose={handleClose}
        severity={severity}
        sx={{
          "&.MuiAlert-root": {
            alignItems: "center",
            ".MuiAlert-message": {
              paddingRight: [1, 2, 6],
            },
            ".MuiAlert-action": {
              paddingTop: 0,
            },
            "&.MuiAlert-outlined": {
              color: theme.colors.white,
              backgroundColor: theme.colors.black,
              textAlign: "left",
              ".MuiSvgIcon-root": {
                color: theme.colors.white,
              },
              "&.MuiAlert-outlinedSuccess": {
                borderColor: theme.colors.green,
              },
              "&.MuiAlert-outlinedError": {
                borderColor: theme.colors.red,
              },
            },
          },
        }}
        variant="outlined"
      >
        <Typography variant="h6">{heading}</Typography>
        <Typography
          sx={{ fontWeight: "400", marginTop: heading ? 1 : 0 }}
          variant="h6"
        >
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  ) : null;
};

export default Toast;
