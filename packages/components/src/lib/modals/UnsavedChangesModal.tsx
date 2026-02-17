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
        sx={ {
          margin: "0 20px",
        } }
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
          <Stack gap={ 1 } mb={ 1 } textAlign="start">
            { !!title && (
              <Typography
                sx={ {
                  fontSize: 20,
                  fontWeight: 700,
                  textTransform: "uppercase",
                } }
              >
                { title }
              </Typography>
            ) }
            <Typography
              sx={ { fontSize: 14, fontWeight: 400 } }
              variant="subtitle1"
            >
              { message }
            </Typography>
          </Stack>

          <HorizontalLine />

          <Stack flexDirection="row" gap={ 2 } justifyContent="end" mb={ 1 } mt={ 1 }>
            <Button variant="primary" width="compact" onClick={ onStay }>
              Keep editing
            </Button>
            <Button
              color="music"
              variant="secondary"
              width="compact"
              onClick={ onLeave }
            >
              Discard
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

UnsavedChangesModal.displayName = "UnsavedChangesModal";

export default UnsavedChangesModal;
