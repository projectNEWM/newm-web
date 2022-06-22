import { Alert, Snackbar } from "@mui/material";
import {
  SyntheticEvent,
  useState
} from "react";
import CheckCircleIcon from "assets/images/CheckCircle";
import CloseCircleFill from "assets/images/CloseCircleFill";
import styled from "styled-components";
import theme from "theme";
import { AlertProps } from "@mui/material/Alert";
import { SnackbarProps } from "@mui/material/Snackbar";

export interface ToastProps {
  readonly heading?: string;
  readonly message?: string;
  readonly snackBarOverrides?: SnackbarProps;
  readonly alertOverrides?: AlertProps;
}

// TODO: Update font/lineheight when typography is defined
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

const Toast = ({
  heading,
  message,
  snackBarOverrides,
  alertOverrides
}: ToastProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    setOpen(false);
  };

  return heading || message ? (
    <Snackbar
      onClose={ handleClose }
      open={ open }
      anchorOrigin={ { vertical: "top", horizontal: "right" } }
      sx={ {
        "&.MuiSnackbar-root": {
          top: "32px",
          right: [null, null, "32px"],
          left: [null, null, "32px"],
        }
      } }
      { ...snackBarOverrides }
    >
      <Alert
        iconMapping={ {
          success: <CheckCircleIcon />,
          error: <CloseCircleFill />
        } }
        onClose={ handleClose }
        sx={ {
          "&.MuiAlert-root": {
            ".MuiAlert-message": {
              paddingRight: ["8px", "16px", "48px"]
            },
            "&.MuiAlert-outlined": {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
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
        { ...alertOverrides }
      >
        <StyledHeading>{ heading }</StyledHeading>
        <StyledSubHeading>{ message }</StyledSubHeading>
      </Alert>
    </Snackbar>
  ) : null;
};

export default Toast;
