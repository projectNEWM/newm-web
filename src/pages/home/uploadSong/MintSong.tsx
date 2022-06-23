import { Box, Stack, useTheme } from "@mui/material";
import { Switch, Typography } from "elements";
import { FunctionComponent, useState } from "react";
import {
  enableWallet,
  getUtxos,
  protocolParameters,
  setWalletName,
} from "modules/wallet";
import { useDispatch } from "react-redux";
import { FormikValues, useFormikContext } from "formik";
import { ErrorMessage } from "components";
import MintSongModal from "./MintSongModal";

const MintSong: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { values, errors, setFieldValue, setFieldError } =
    useFormikContext<FormikValues>();

  const setError = (message: string) => setFieldError("isMinting", message);
  const setValue = (value: boolean) => setFieldValue("isMinting", value);

  /**
   * Select a wallet, enable it, and update the
   * window Wallet object with the wallet API.
   */
  const handleSelectWallet = async (walletName: string) => {
    try {
      const wallet = await enableWallet(walletName);

      // if no error thrown and no wallet, user manually exited before enabling
      if (!wallet) return;

      if (wallet) {
        setValue(true);
      }

      dispatch(setWalletName(walletName));
      setIsModalOpen(false);

      const utxos = await getUtxos(walletName);
      const largestUtxo = Math.max(...utxos);

      if (largestUtxo < Number(protocolParameters.minUtxo)) {
        setError("Please add more ADA to your wallet to mint your song.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <Box
        sx={ {
          display: "flex",
          flexDirection: ["column", "column", "row"],
          justifyContent: "space-between",
          alignItems: ["center", "center", "flex-start"],
          flexWrap: "nowrap",
          backgroundColor: theme.colors.grey600,
          padding: theme.spacing(3),
        } }
      >
        <Stack
          direction="column"
          spacing={ 1 }
          sx={ { width: "85%", maxWidth: theme.spacing(45) } }
        >
          <Typography>MINT SONG</Typography>
          <Typography variant="subtitle1" fontSize={ 12 }>
            Minting a song will make it an NFT, becoming a uniquely publishing
            token on the blockchain to make it purchasable.
          </Typography>

          { errors.isMinting && <ErrorMessage>{ errors.isMinting }</ErrorMessage> }
        </Stack>

        <Switch
          sx={ {
            marginTop: [theme.spacing(2), theme.spacing(2), 0],
          } }
          value={ isModalOpen ? "on" : "off" }
          checked={ values.isMinting }
          onChange={ (event) => {
            setIsModalOpen(event.target.value === "off");
          } }
        />
      </Box>

      <MintSongModal
        open={ isModalOpen }
        onConfirm={ handleSelectWallet }
        onCancel={ () => {
          setIsModalOpen(false);
          setValue(false);
        } }
        onClose={ () => {
          setIsModalOpen(false);
        } }
      />
    </>
  );
};

export default MintSong;
