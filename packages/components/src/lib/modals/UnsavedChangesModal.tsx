import type { FunctionComponent, ReactNode } from "react";

import { Box, Stack, Typography } from "@mui/material";

import { Button, HorizontalLine, Modal } from "@newm-web/elements";
import theme from "@newm-web/theme";

const DEFAULT_MESSAGE =
  "You have unsaved changes. If you leave, your data will be lost.";

interface UnsavedChangesModalProps {
  readonly isOpen: boolean;
  readonly message?: ReactNode;
  readonly onLeave: () => void;
  readonly onStay: () => void;
  readonly title?: string;
}

export const UnsavedChangesModal: FunctionComponent<
  UnsavedChangesModalProps
> = ({ isOpen, message = DEFAULT_MESSAGE, onLeave, onStay, title }) => {
  return (
    <Modal
      isCloseButtonVisible={ false }
      isOpen={ isOpen }
      slotProps={ {
        backdrop: {
          sx: { backgroundColor: theme.colors.backdropBlur },
        },
      } }
      onClose={ onStay }
    >
      <Box
        alignItems="center"
        alignSelf="center"
        display="flex"
        flex={ 1 }
        justifyContent="center"
        maxWidth={ 600 }
      >
        <Stack
          gap={ 2 }
          sx={ {
            backgroundColor: theme.colors.black,
            borderRadius: "8px",
            maxWidth: "670px",
            padding: "24px 24px 10px",
            rowGap: 1,
          } }
        >
          <Stack gap={ 1 } textAlign="start">
            { !!title && <Typography variant="h5">{ title }</Typography> }
            <Typography variant="body2">{ message }</Typography>
          </Stack>

          <HorizontalLine />

          <Stack flexDirection="row" gap={ 1 } justifyContent="end" mb={ 1 } mt={ 1 }>
            <Button
              color="music"
              variant="secondary"
              width="compact"
              onClick={ onStay }
            >
              Stay
            </Button>
            <Button variant="primary" width="compact" onClick={ onLeave }>
              Leave
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

UnsavedChangesModal.displayName = "UnsavedChangesModal";

export default UnsavedChangesModal;
