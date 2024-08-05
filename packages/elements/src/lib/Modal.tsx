import {
  Box,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  SxProps,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FunctionComponent, useEffect } from "react";

export interface ModalProps extends Omit<MuiModalProps, "open" | "onClose"> {
  readonly isCloseButtonVisible?: boolean;
  readonly isCloseOnClickBackgroundEnabled?: boolean;
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
      sx={ { display: "grid", mb: 10, mt: 2, mx: 4 } }
      onClose={ isCloseOnClickBackgroundEnabled ? onClose : undefined }
    >
      <Box
        sx={ {
          alignSelf: "center",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifySelf: "center",
        } }
      >
        { isCloseButtonVisible && (
          <Box position="absolute" right={ 0 } top={ 0 }>
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
