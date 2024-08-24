import {
  Box,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FunctionComponent, useEffect } from "react";

export interface ModalProps extends Omit<MuiModalProps, "open" | "onClose"> {
  readonly isCloseButtonVisible?: boolean;
  readonly isCloseOnClickBackgroundEnabled?: boolean;
  readonly isFullScreen?: boolean;
  readonly isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly onClose: (event: React.SyntheticEvent<any> | Event) => void;
}

/**
 * Full-screen modal component.
 */
const Modal: FunctionComponent<ModalProps> = ({
  isOpen = false,
  onClose,
  isCloseButtonVisible = true,
  isCloseOnClickBackgroundEnabled = false,
  isFullScreen = true,
  children,
}) => {
  const theme = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose(event);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <MuiModal
      open={ isOpen }
      sx={ { display: isFullScreen ? "flex" : "grid" } }
      onClose={ isCloseOnClickBackgroundEnabled ? onClose : undefined }
    >
      <Box
        sx={ {
          alignSelf: "center",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          height: isFullScreen ? "100%" : undefined,
          justifySelf: "center",
          pb: 10,
          position: "relative",
          pt: 6,
          px: 6,
        } }
      >
        { isCloseButtonVisible && (
          <Box
            position="absolute"
            right={ theme.spacing(1) }
            top={ theme.spacing(1) }
          >
            <CloseIcon
              sx={ {
                color: theme.colors.white,
                cursor: "pointer",
                fontSize: 42,
              } }
              onClick={ onClose }
            />
          </Box>
        ) }

        { children }
      </Box>
    </MuiModal>
  );
};

export default Modal;
