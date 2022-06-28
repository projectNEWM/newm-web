import { useDispatch, useSelector } from "react-redux";
import {
  SyntheticEvent,
  useEffect,
  useState
} from "react";
import { clearToastMessage, selectUi } from "modules/ui";
import { Alert, Snackbar, Typography } from "@mui/material";
import CheckCircleIcon from "assets/images/CheckCircle";
import CloseCircleFill from "assets/images/CloseCircleFill";
import theme from "theme";

const Toast = () => {
  const dispatch = useDispatch();
  const { toast: { heading, message, severity } } = useSelector(selectUi);
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
      anchorOrigin={ { vertical: "top", horizontal: "right" } }
      autoHideDuration={ 6000 }
      onClose={ handleClose }
      open={ isOpen }
      sx={ {
        "&.MuiSnackbar-root": {
          left: [null, null, "32px"],
          right: [null, null, "32px"],
          top: "32px",
        }
      } }
    >
      <Alert
        iconMapping={ {
          error: <CloseCircleFill />,
          success: <CheckCircleIcon />
        } }
        onClose={ handleClose }
        severity={ severity }
        sx={ {
          "&.MuiAlert-root": {
            ".MuiAlert-message": {
              paddingRight: ["8px", "16px", "48px"]
            },
            "&.MuiAlert-outlined": {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
              textAlign: "left",
              ".MuiSvgIcon-root": {
                color: theme.palette.text.primary,
              },
              "&.MuiAlert-outlinedSuccess": {
                borderColor: theme.palette.success.main,
              },
              "&.MuiAlert-outlinedError": {
                borderColor: theme.palette.error.main,
              },
            },
          },
        } }
        variant="outlined"
      >
        <Typography variant="h6">{ heading }</Typography>
        <Typography sx={ { fontWeight: "400", margin: "8px 0 0" } } variant="h6">{ message }</Typography>
      </Alert>
    </Snackbar>
  ) : null;
};

export default Toast;
