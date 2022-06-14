import { Box, Stack, useTheme } from "@mui/material";
import { Switch, Typography } from "elements";
import { FunctionComponent, useState } from "react";
import { getWallet, selectWallet, setSelectedWallet } from "modules/wallet";
import { useDispatch, useSelector } from "react-redux";
import { FormikValues, useFormikContext } from "formik";
import MintSongModal from "./MintSongModal";

const MintSong: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedWallet } = useSelector(selectWallet);

  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const wallet = getWallet(selectedWallet);

  return (
    <>
      <Box
        sx={ {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
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
        </Stack>

        <Switch
          value={ isModalOpen ? "on" : "off" }
          checked={ values.isMinting }
          onChange={ (event) => {
            setIsModalOpen(event.target.value === "off");
          } }
        />
      </Box>

      <MintSongModal
        open={ isModalOpen }
        onConfirm={ (walletId: string) => {
          setIsModalOpen(false);
          dispatch(setSelectedWallet(walletId));
          setFieldValue("isMinting", true);
        } }
        onCancel={ () => {
          setIsModalOpen(false);
          setFieldValue("isMinting", false);
        } }
        onClose={ () => {
          setIsModalOpen(false);
        } }
      />
    </>
  );
};

export default MintSong;
