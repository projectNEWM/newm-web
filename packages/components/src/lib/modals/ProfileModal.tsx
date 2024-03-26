import { Container, Stack, Typography, useTheme } from "@mui/material";
import { Button, Modal, ModalProps } from "@newm-web/elements";
import { FunctionComponent, ReactNode } from "react";
import Socials, { SocialsProps } from "../Socials";

interface ProfileModalProps extends Omit<ModalProps, "children"> {
  readonly children: ReactNode;
  readonly name: string;
  readonly socials: SocialsProps;
}

const ProfileModal: FunctionComponent<ProfileModalProps> = ({
  name,
  isOpen,
  onClose,
  socials,
  children,
  isCloseButtonVisible = false,
}) => {
  const theme = useTheme();

  return (
    <Modal
      isCloseButtonVisible={ isCloseButtonVisible }
      isOpen={ isOpen }
      onClose={ onClose }
    >
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

          <Stack direction="row" justifyContent="space-between" p={ 1.5 }>
            <Socials { ...socials } />
            <Button
              color="music"
              variant="secondary"
              width="compact"
              onClick={ onClose }
            >
              Close
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Modal>
  );
};

export default ProfileModal;
