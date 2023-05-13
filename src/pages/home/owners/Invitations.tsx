import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button, Typography } from "elements";
import theme from "theme";
import { selectInvites } from "modules/song";
import InvitationsTable from "./InvitationsTable";

const Invitations: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalStatus = () => {
    setIsModalOpen(!isModalOpen);
  };

  const invites = useSelector(selectInvites);

  return invites ? (
    <>
      <Button onClick={ handleModalStatus } width="compact">
        Invitation pending
      </Button>
      <Dialog
        fullWidth={ true }
        maxWidth={ "lg" }
        open={ isModalOpen }
        onClose={ handleModalStatus }
      >
        <DialogTitle
          sx={ { backgroundColor: theme.colors.grey500, pb: 1, pt: 3 } }
        >
          <Typography variant="body2">Invitations pending</Typography>
        </DialogTitle>
        <DialogContentText
          sx={ { backgroundColor: theme.colors.grey500, px: 3 } }
        >
          <Typography variant="subtitle1">
            You need to take action on these pending invitations.
          </Typography>
        </DialogContentText>
        <DialogContent sx={ { backgroundColor: theme.colors.grey500 } }>
          <InvitationsTable invites={ invites } />
        </DialogContent>
        <DialogActions sx={ { backgroundColor: theme.colors.grey600, px: 3 } }>
          <Button
            color="music"
            onClick={ handleModalStatus }
            variant="secondary"
            width="compact"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : null;
};

export default Invitations;
