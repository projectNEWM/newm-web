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
      disableAutoFocus={ true }
      open={ isOpen }
      sx={ { m: 2, mb: 10, mt: 1 } }
    >
      <Box display="flex" flex={ 1 } flexDirection="column" height="100%">
        { isCloseButtonVisible && (
          <Box display="flex" justifyContent="flex-end" mb={ 1 }>
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
