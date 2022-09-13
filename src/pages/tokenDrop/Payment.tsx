import { Box, Stack, useTheme } from "@mui/material";
import { DisplayText } from "components";
import { AccentButton, Typography } from "elements";
import { FunctionComponent, useState } from "react";
import mursProfileImageXs from "assets/images/murs-profile-small.png";
import {
  enableWallet,
  getUtxos,
  protocolParameters,
  selectWallet,
  setWalletName,
} from "modules/wallet";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "modules/ui";
import { capitalize } from "common";
import MintSongModal from "./MintSongModal";

const Payment: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const { walletName: selectedWallet } = useSelector(selectWallet);

  /**
   * Select a wallet, enable it, and update the
   * window Wallet object with the wallet API.
   */
  const handleSelectWallet = async (walletName: string) => {
    try {
      const wallet = await enableWallet(walletName);

      // if no error thrown and no wallet, user manually exited before enabling
      if (!wallet) return;

      dispatch(setWalletName(walletName));
      setIsModalOpen(false);

      const utxos = await getUtxos(walletName);
      const largestUtxo = Math.max(...utxos);

      if (largestUtxo < Number(protocolParameters.minUtxo)) {
        dispatch(
          setToastMessage(
            "Please add more ADA to your wallet to mint your song."
          )
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setToastMessage(error.message));
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <MintSongModal
        open={ isModalOpen }
        onClose={ () => setIsModalOpen(false) }
        onConfirm={ handleSelectWallet }
      />

      <Box
        display="flex"
        flexGrow={ 1 }
        flexDirection={ ["column", "column", "row"] }
        justifyContent="space-between"
      >
        <Box
          flex={ 1 }
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          mb={ [4, 4, 0] }
        >
          <Box mb={ 1 }>
            <Typography variant="subtitle2" fontWeight={ 600 }>
              WHAT YOU GET
            </Typography>
          </Box>

          <Box mb={ 0.25 }>
            <Typography variant="subtitle1">
              <DisplayText>2%</DisplayText> of
            </Typography>
          </Box>

          <Typography variant="subtitle1">
            future streaming royalties
          </Typography>

          <Stack
            spacing={ 2 }
            direction="row"
            alignItems="center"
            sx={ {
              mt: 1,
              backgroundColor: theme.colors.grey600,
              borderRadius: "6px",
              padding: 1.25,
              paddingRight: 4,
            } }
          >
            <img
              src={ mursProfileImageXs }
              style={ { width: 40, height: 40, borderRadius: "50%" } }
              alt="murs profile"
            />

            <Box flexDirection="column">
              <Typography variant="h4" fontWeight={ 700 }>
                Break up
              </Typography>
              <Typography variant="subtitle2">Murs</Typography>
            </Box>
          </Stack>
        </Box>

        <Box flexDirection="column" flex={ 1 }>
          <Box mb={ 1 }>
            <Typography variant="subtitle2" fontWeight={ 600 }>
              WHAT YOU PAY
            </Typography>
          </Box>

          <Box mb={ 0.25 }>
            <DisplayText>42 ADA</DisplayText>
          </Box>

          <Typography variant="subtitle1">~37.54 USD</Typography>
        </Box>
      </Box>

      <Box mt={ [4, 4, 8] } mb={ 1 }>
        <Typography variant="subtitle2" fontWeight={ 600 }>
          HOW TO PURCHASE
        </Typography>
      </Box>

      <AccentButton
        onClick={ () => setIsModalOpen(true) }
        onMouseEnter={ () => setIsButtonHovered(true) }
        onMouseLeave={ () => setIsButtonHovered(false) }
      >
        { isButtonHovered && selectedWallet ? (
          "Connect new wallet"
        ) : selectedWallet ? (
          <span>{ capitalize(selectedWallet) } wallet is connected</span>
        ) : (
          "Connect wallet"
        ) }
      </AccentButton>
    </Box>
  );
};

export default Payment;
