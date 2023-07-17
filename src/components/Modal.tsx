import {
  Box,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FunctionComponent, useEffect } from "react";

interface ModalProps extends Omit<MuiModalProps, "open" | "onClose"> {
  readonly isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly onClose: (event: React.SyntheticEvent<any> | Event) => void;
  readonly isCloseButtonVisible?: boolean;
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
    <MuiModal open={ isOpen } sx={ { m: 2, mt: 1, mb: 10 } }>
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
