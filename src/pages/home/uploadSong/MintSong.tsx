import { Box, Stack, useTheme } from "@mui/material";
import { Switch, Typography } from "elements";
import { FunctionComponent, useState } from "react";
import { enableWallet, setWalletName } from "modules/wallet";
import { useDispatch } from "react-redux";
import { FormikValues, useFormikContext } from "formik";
import { ErrorMessage } from "components";
import MintSongModal from "./MintSongModal";
import AddOwner from "./AddOwner";

const MintSong: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { values, errors, setFieldValue } = useFormikContext<FormikValues>();

  const setValue = (value: boolean) => setFieldValue("isMinting", value);

  /**
   * Select a wallet, enable it, and update the
   * window Wallet object with the wallet API.
   */
  const handleSelectWallet = async (walletName: string) => {
    dispatch(setWalletName(walletName));
    dispatch(enableWallet());
    setIsModalOpen(false);
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

        { values.isMinting && <AddOwner /> }
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
