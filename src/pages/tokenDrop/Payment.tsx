import { Box, Stack, useTheme } from "@mui/material";
import { DisplayText, SectionHeading } from "components";
import {
  AccentButton,
  FilledButton,
  HorizontalLine,
  Typography,
} from "elements";
import { FunctionComponent, useState } from "react";
import mursProfileImageSm from "assets/images/murs-profile@60px.png";
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
import { useNavigate } from "react-router-dom";
import MintSongModal from "./MintSongModal";

const Payment: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const { walletName: selectedWallet } = useSelector(selectWallet);

  const handleViewAlbumArt = () => {
    navigate("");
  };

  const handlePurchase = () => {
    navigate("../congratulations");
  };

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
    <Box mt={ 3 } display="flex" flexDirection="column">
      <MintSongModal
        open={ isModalOpen }
        onClose={ () => setIsModalOpen(false) }
        onConfirm={ handleSelectWallet }
      />

      <Stack spacing={ 3 } direction="column" maxWidth={ [9999, 9999, 450] }>
        <Box flexDirection="column">
          <Box mb={ 1 }>
            <SectionHeading>SONG</SectionHeading>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={ {
              backgroundColor: theme.colors.grey600,
              borderRadius: "6px",
              padding: 1.5,
            } }
          >
            <Stack spacing={ 2 } direction="row" alignItems="center">
              <img
                src={ mursProfileImageSm }
                style={ { width: 60, height: 60, borderRadius: "50%" } }
                alt="murs profile"
              />

              <Box flexDirection="column">
                <Typography variant="h4" fontWeight={ 700 }>
                  Break up
                </Typography>
                <Typography variant="subtitle2">Murs</Typography>
              </Box>
            </Stack>

            <AccentButton onClick={ handleViewAlbumArt }>
              See album art
            </AccentButton>
          </Box>
        </Box>

        <HorizontalLine />

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
              <SectionHeading>WHAT YOU GET</SectionHeading>
            </Box>

            <Box mb={ 0.25 }>
              <Typography variant="subtitle1">
                <DisplayText>0.008%</DisplayText> of
              </Typography>
            </Box>

            <Typography variant="subtitle1">
              future streaming royalties
            </Typography>
          </Box>

          <Box flexDirection="column" flex={ 1 }>
            <Box mb={ 1 }>
              <SectionHeading>WHAT YOU PAY</SectionHeading>
            </Box>

            <Box mb={ 0.25 }>
              <DisplayText>42 ADA</DisplayText>
            </Box>

            <Typography variant="subtitle1">~37.54 USD</Typography>
          </Box>
        </Box>

        <HorizontalLine />

        <Box flexDirection="column">
          <Box mb={ 1 }>
            <SectionHeading>HOW TO PURCHASE</SectionHeading>
          </Box>

          <Stack direction="column" spacing={ 3 }>
            <AccentButton
              onClick={ () => setIsModalOpen(true) }
              onMouseEnter={ () => setIsButtonHovered(true) }
              onMouseLeave={ () => setIsButtonHovered(false) }
              fullWidth={ true }
            >
              { isButtonHovered && selectedWallet ? (
                "Connect new wallet"
              ) : selectedWallet ? (
                <span>{ capitalize(selectedWallet) } wallet is connected</span>
              ) : (
                "Connect wallet"
              ) }
            </AccentButton>

            <FilledButton
              backgroundColor={ theme.colors.pink }
              onClick={ handlePurchase }
              fullWidth={ true }
              disabled={ !selectedWallet }
            >
              Complete purchase
            </FilledButton>
          </Stack>
        </Box>

        <HorizontalLine />
      </Stack>
    </Box>
  );
};

export default Payment;
