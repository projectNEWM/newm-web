import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button, Typography } from "elements";
import theme from "theme";
import { selectInvites, useFetchInvitesThunk } from "modules/song";
import { selectUi, setIsInvitesModalOpen } from "modules/ui";
import { selectSession } from "modules/session";
import InvitesTable from "./InvitesTable";

const InvitesModal: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [fetchInvites] = useFetchInvitesThunk();
  const { isInvitesModalOpen } = useSelector(selectUi);
  const { isLoggedIn } = useSelector(selectSession);
  const invites = useSelector(selectInvites);

  useEffect(() => {
    if (isLoggedIn) fetchInvites();
  }, [fetchInvites, isLoggedIn]);

  return isInvitesModalOpen && invites?.length ? (
    <>
      <Dialog
        fullWidth={ true }
        maxWidth={ "lg" }
        open={ isInvitesModalOpen }
        onClose={ () => dispatch(setIsInvitesModalOpen(false)) }
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
          <InvitesTable invites={ invites } />
        </DialogContent>
        <DialogActions sx={ { backgroundColor: theme.colors.grey600, px: 3 } }>
          <Button
            color="music"
            onClick={ () => dispatch(setIsInvitesModalOpen(false)) }
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

export default InvitesModal;
