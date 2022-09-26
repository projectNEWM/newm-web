import CloseIcon from "@mui/icons-material/Close";
import { Box, Stack, useTheme } from "@mui/material";
import { FunctionComponent, ReactElement, useEffect } from "react";

interface ModalProps {
  readonly children?: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly handleClose: (event: React.SyntheticEvent<any> | Event) => void;
  readonly open?: boolean;
}

const Modal: FunctionComponent<ModalProps> = ({
  children,
  handleClose,
  open = false,
}) => {
  const theme = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose(event);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  useEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      body.style.overflow = open ? "hidden" : "auto";
    }
  }, [open]);

  return open ? (
    <Box
      sx={ {
        backgroundColor: "rgba(0,0,0,.9)",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        left: 0,
        position: "fixed",
        right: 0,
        textAlign: "center",
        top: 0,
      } }
    >
      <Box
        role="dialog"
        sx={ {
          alignItems: "start",
          alignSelf: "center",
          backgroundColor: theme.colors.black100,
          display: "flex",
          flexDirection: "column",
          maxHeight: "650px",
          maxWidth: "720px",
          mx: 1,
          my: 5,
          pb: 7.5,
          pl: [3, 3, 7.5],
          pr: [3, 3, 4],
          pt: 4,
        } }
      >
        <CloseIcon
          sx={ {
            alignSelf: "end",
            color: theme.colors.white,
            cursor: "pointer",
          } }
          onClick={ handleClose }
        />
        <Stack sx={ { maxHeight: "100vh", overflow: "auto" } }>{ children }</Stack>
      </Box>
    </Box>
  ) : null;
};

export default Modal;
