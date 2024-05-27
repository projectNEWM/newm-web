import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { Button, Modal, ModalProps } from "@newm-web/elements";
import { FunctionComponent, ReactNode } from "react";
import Socials, { SocialsProps } from "../Socials";

interface ProfileModalProps
  extends Omit<ModalProps, "isCloseButtonVisible" | "children"> {
  readonly children: ReactNode;
  readonly name?: string;
  readonly socials: SocialsProps;
}

const ProfileModal: FunctionComponent<ProfileModalProps> = ({
  name,
  isOpen,
  onClose,
  socials,
  children,
}) => {
  const theme = useTheme();

  return (
    <Modal isCloseButtonVisible={ false } isOpen={ isOpen } onClose={ onClose }>
      <Container
        maxWidth="sm"
        sx={ { alignItems: "center", display: "flex", height: "100vh" } }
      >
        <Stack sx={ { backgroundColor: theme.colors.grey600 } }>
          <Stack
            p={ 3 }
            pb={ 1.5 }
            spacing={ 1.5 }
            sx={ { borderBottom: `2px solid ${theme.colors.black}` } }
          >
            <Typography variant="body2">About { name }</Typography>
            { children }
          </Stack>

          <Stack
            direction={ ["column", "row", "row"] }
            justifyContent="space-between"
            px={ 3 }
            py={ 2 }
            rowGap={ 1 }
          >
            <Socials { ...socials } />

            <Box ml={ 1 }>
              <Button
                color="music"
                variant="secondary"
                width="compact"
                onClick={ onClose }
              >
                Close
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Modal>
  );
};

export default ProfileModal;
