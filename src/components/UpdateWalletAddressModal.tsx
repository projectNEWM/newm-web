import { selectUi, setIsUpdateWalletAddressModalOpen } from "modules/ui";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button } from "elements";
import { useAppDispatch } from "common";
import {
  getWalletAddress,
  useConnectWallet,
} from "@newm.io/cardano-dapp-wallet-connector";
import {
  emptyProfile,
  selectSession,
  updateProfile,
  useGetProfileQuery,
} from "modules/session";
import Modal from "./Modal";

const UpdateWalletAddressModal: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();
  const { isLoggedIn } = useSelector(selectSession);
  const { isUpdateWalletAddressModalOpen } = useSelector(selectUi);
  const { data: { walletAddress } = emptyProfile } = useGetProfileQuery(
    undefined,
    {
      skip: !isLoggedIn,
    }
  );

  const message = walletAddress
    ? "You already have a wallet address saved to your profile. Would you " +
      "like to overwrite it with an address from your currently connected " +
      "wallet?"
    : "You have not saved an address to your profile yet. The address saved " +
      "to your profile is where you will receive any song tokens and " +
      "royalties. Would you like to save an address from your currently " +
      "connected wallet now?";

  const handleClose = () => {
    dispatch(setIsUpdateWalletAddressModalOpen(false));
  };

  const handleConfirm = async () => {
    const walletAddress = await getWalletAddress(wallet);
    dispatch(updateProfile({ walletAddress }));
    dispatch(setIsUpdateWalletAddressModalOpen(false));
  };

  return (
    <Modal
      isOpen={ isUpdateWalletAddressModalOpen }
      onClose={ handleClose }
      isCloseButtonVisible={ false }
    >
      <Box display="flex" flex={ 1 } justifyContent="center" alignItems="center">
        <Stack
          gap={ 2 }
          sx={ {
            padding: 2,
            background: theme.colors.grey600,
            textAlign: "left",
            maxWidth: "85%",
          } }
        >
          <Typography>{ message }</Typography>

          <Stack direction="row" gap={ 2 } justifyContent="flex-end">
            <Button
              width="compact"
              variant="secondary"
              color="music"
              onClick={ handleClose }
            >
              No
            </Button>

            <Button width="compact" onClick={ handleConfirm }>
              Yes
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UpdateWalletAddressModal;
