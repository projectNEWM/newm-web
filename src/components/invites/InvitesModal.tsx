import { FunctionComponent, useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Button, Typography } from "elements";
import theme from "theme";
import {
  CollaborationStatus,
  getHasOwnershipInvite,
  useFetchInvitesThunk,
  useGetCollaborationsQuery,
} from "modules/song";
import {
  selectUi,
  setIsConnectWalletModalOpen,
  setIsIdenfyModalOpen,
  setIsInvitesModalOpen,
} from "modules/ui";
import {
  VerificationStatus,
  emptyProfile,
  selectSession,
  useGetProfileQuery,
} from "modules/session";
import { useAppDispatch, useAppSelector } from "common";
import InvitesTable from "./InvitesTable";

const { Verified } = VerificationStatus;

const InvitesModal: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { isInvitesModalOpen } = useAppSelector(selectUi);
  const { isLoggedIn } = useAppSelector(selectSession);
  const [fetchInvites, { data: invites = [] }] = useFetchInvitesThunk();
  const { data: collaborations = [] } = useGetCollaborationsQuery(
    {
      inbound: true,
      statuses: [CollaborationStatus.Waiting],
    },
    { skip: !isLoggedIn }
  );

  const {
    data: {
      firstName,
      lastName,
      verificationStatus,
      walletAddress,
    } = emptyProfile,
  } = useGetProfileQuery(undefined, { skip: !isLoggedIn });

  const [isFirstTimeModalOpen, setIsFirstTimeModalOpen] = useState(true);
  const isVerified = verificationStatus === Verified;
  const hasOwnershipInvite = getHasOwnershipInvite(invites);
  const isWalletAddressRequired = hasOwnershipInvite && !walletAddress;
  const isAcceptButtonDisabled = !isVerified || isWalletAddressRequired;

  const subtitleText = !isVerified
    ? "You need to verify your account to accept these pending invitations."
    : isWalletAddressRequired
    ? "You need to connect your wallet to accept these pending invitations."
    : "You need to take action on these pending invitations.";

  const handleConnectWallet = () => {
    dispatch(setIsConnectWalletModalOpen(true));
  };

  const handleVerifyProfile = () => {
    dispatch(setIsIdenfyModalOpen(true));
  };

  useEffect(() => {
    if (isLoggedIn && firstName && lastName) fetchInvites();
  }, [dispatch, isLoggedIn, fetchInvites, collaborations, firstName, lastName]);

  useEffect(() => {
    if (invites.length > 0 && isFirstTimeModalOpen) {
      dispatch(setIsInvitesModalOpen(true));
      setIsFirstTimeModalOpen(false);
    }
  }, [invites, dispatch, isFirstTimeModalOpen]);

  return isInvitesModalOpen && invites.length ? (
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
          <Stack
            alignItems={ [null, null, "center"] }
            columnGap={ 1 }
            flexDirection={ [null, null, "row"] }
            justifyContent="space-between"
            rowGap={ 2 }
          >
            <Typography variant="subtitle1">{ subtitleText }</Typography>

            <Stack direction="row" gap={ 3 }>
              { !isVerified && (
                <Button
                  color="yellow"
                  onClick={ handleVerifyProfile }
                  sx={ { textTransform: "none" } }
                  variant="outlined"
                  width="compact"
                >
                  Verify profile
                </Button>
              ) }

              { isWalletAddressRequired && (
                <Button
                  color="yellow"
                  onClick={ handleConnectWallet }
                  sx={ { textTransform: "none" } }
                  variant="outlined"
                  width="compact"
                >
                  Connect wallet
                </Button>
              ) }
            </Stack>
          </Stack>
        </DialogContentText>
        <DialogContent sx={ { backgroundColor: theme.colors.grey500 } }>
          <InvitesTable invites={ invites } disabled={ isAcceptButtonDisabled } />
        </DialogContent>
        <DialogActions
          sx={ { backgroundColor: theme.colors.grey600, px: 3, py: 2 } }
        >
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
