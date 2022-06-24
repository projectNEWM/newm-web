import { useDispatch, useSelector } from "react-redux";
import {
  SyntheticEvent,
  useEffect,
  useState
} from "react";
import { clearToastMessage, selectUi } from "modules/ui";
import { Alert, Snackbar } from "@mui/material";
import CheckCircleIcon from "assets/images/CheckCircle";
import CloseCircleFill from "assets/images/CloseCircleFill";
import styled from "styled-components";
import theme from "theme";

const StyledHeading = styled.p`
  margin: 0;
  font-weight: ${theme.typography.fontWeightBold};
  font-size: 12px;
  line-height: 14.52px;
`;

const StyledSubHeading = styled.p`
  font-size: 12px;
  line-height: 14.52px;
  margin: 8px 0 0;
`;

const Toast = () => {
  const dispatch = useDispatch();
  const { toast: { heading, message, severity } } = useSelector(selectUi);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (heading || message) setOpen(true);
  }, [heading, message]);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    dispatch(clearToastMessage());
    setOpen(false);
  };

  return open ? (
    <Snackbar
      anchorOrigin={ { vertical: "top", horizontal: "right" } }
      autoHideDuration={ 6000 }
      onClose={ handleClose }
      open={ open }
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
        <StyledHeading>{ heading }</StyledHeading>
        <StyledSubHeading>{ message }</StyledSubHeading>
      </Alert>
    </Snackbar>
  ) : null;
};

export default Toast;
