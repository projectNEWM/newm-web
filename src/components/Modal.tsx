import CloseIcon from "@mui/icons-material/Close";
import { Box, useTheme } from "@mui/material";
import { FunctionComponent, ReactElement, useEffect } from "react";

interface ModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly handleClose: (event: React.SyntheticEvent<any> | Event) => void;
  readonly variant?: "framed" | "full";
  readonly children?: ReactElement;
  readonly open?: boolean;
}

const Modal: FunctionComponent<ModalProps> = ({
  handleClose,
  variant,
  children,
  open = false,
}) => {
  const theme = useTheme();

  const fullStyles = {
    maxHeight: "95vh",
  };

  const framedStyles = {
    maxHeight: ["80vh", "80vh", "95vh"],
    maxWidth: "720px",
    backgroundColor: theme.colors.black100,
    mx: 1,
    my: 5,
    pb: [5, 5, 7.5],
    pl: [3, 3, 7.5],
    pr: [3, 3, 4],
    pt: [3, 3, 4],
  };

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
        zIndex: 999999,
      } }
    >
      <Box
        role="dialog"
        sx={ {
          alignItems: "start",
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          mb: 1.5,
          ...(variant === "full" ? fullStyles : framedStyles),
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

        { children }
      </Box>
    </Box>
  ) : null;
};

export default Modal;
