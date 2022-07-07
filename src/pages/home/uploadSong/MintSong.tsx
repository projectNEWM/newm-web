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
import AddOwner from "./AddOwner";
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
          backgroundColor: theme.colors.grey600,
          padding: theme.spacing(3),
        } }
      >
        <Stack
          spacing={ 1 }
          sx={ {
            alignItems: "center",
            display: "flex",
            flexDirection: [null, null, "row"],
            justifyContent: "space-between",
          } }
        >
          <Stack spacing={ 1 } sx={ { maxWidth: theme.spacing(45) } }>
            <Typography>MINT SONG</Typography>
            <Typography fontSize={ 12 } variant="subtitle1">
              Minting a song will make it an NFT, becoming a uniquely publishing
              token on the blockchain to make it purchasable.
            </Typography>
            { errors.isMinting && (
              <ErrorMessage>{ errors.isMinting }</ErrorMessage>
            ) }
          </Stack>

          <Switch
            checked={ values.isMinting }
            onChange={ (event) => {
              setIsModalOpen(event.target.value === "off");
            } }
            sx={ {
              marginTop: [theme.spacing(2), theme.spacing(2), 0],
            } }
            value={ isModalOpen ? "on" : "off" }
          />
        </Stack>

        <AddOwner />
      </Box>

      <MintSongModal
        open={ isModalOpen }
        onCancel={ () => {
          setIsModalOpen(false);
          setValue(false);
        } }
        onClose={ () => {
          setIsModalOpen(false);
        } }
        onConfirm={ handleSelectWallet }
      />
    </>
  );
};

export default MintSong;
