import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { Socials, SocialsProps } from "@newm-web/components";
import { Button, Modal, ModalProps } from "@newm-web/elements";
import { FunctionComponent } from "react";

interface AboutArtistModalProps extends Omit<ModalProps, "children"> {
  readonly content: string;
  readonly name: string;
  readonly socials: SocialsProps;
}

const AboutArtistModal: FunctionComponent<AboutArtistModalProps> = ({
  name,
  isOpen,
  onClose,
  socials,
  content,
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
            <Typography variant="subtitle1">{ content }</Typography>
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

export default AboutArtistModal;
