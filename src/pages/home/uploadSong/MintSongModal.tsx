import { FunctionComponent, useState } from "react";
// import { getWallet } from "common";
import {
  Dialog,
  DialogProps,
  OutlinedButton,
  TransparentButton,
  Typography,
} from "elements";
import { Box, Stack, useTheme } from "@mui/material";
import eternlLogoUrl from "assets/images/eternl-logo.png";

interface MintSongModalProps extends Omit<DialogProps, "onClose"> {
  readonly onClose: VoidFunction;
}

const MintSongModal: FunctionComponent<MintSongModalProps> = (props) => {
  const theme = useTheme();

  const [selectedWallet, setSelectedWallet] = useState("");

  console.log("selected wallet: ", selectedWallet);

  if (!window.cardano) {
    return (
      <Box>
        <Typography>Please install a Cardano wallet</Typography>
      </Box>
    );
  }

  const availableWallets = supportedWallets.filter((walletName: string) => {
    return !!window.cardano[walletName];
  });

  const handleSelectWallet = (walletName: string) => {
    setSelectedWallet(walletName);
  };

  return (
    <Dialog { ...props }>
      <Stack spacing={ 2 } padding={ 3 } paddingBottom={ 2 }>
        <Stack spacing={ 0.5 }>
          <Typography variant="body2">Select a wallet</Typography>
          <Typography variant="subtitle1">
            Please select a connected to wallet to mint your song with.
          </Typography>
        </Stack>

        <Stack spacing={ 1 }>
          { availableWallets.map((walletName) => {
            return (
              <TransparentButton
                key={ walletName }
                onClick={ () => handleSelectWallet(walletName) }
                sx={ { opacity: 1, justifyContent: "flex-start" } }
              >
                <Stack
                  direction="row"
                  spacing={ 2 }
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <img
                    alt="Eternl logo"
                    src={ eternlLogoUrl }
                    width={ 24 }
                    height={ 24 }
                  />
                  <span>{ walletName }</span>
                </Stack>
              </TransparentButton>
            );
          }) }
        </Stack>
      </Stack>

      <Stack
        direction="row"
        py={ 1.5 }
        px={ 3 }
        sx={ {
          justifyContent: "flex-end",
          backgroundColor: theme.colors.grey600,
        } }
      >
        <OutlinedButton
          backgroundColor={ theme.colors.grey600 }
          onClick={ () => props.onClose() }
        >
          Cancel
        </OutlinedButton>
      </Stack>
    </Dialog>
  );
};

export default MintSongModal;

const supportedWallets = [
  "nami",
  "eternl",
  "flint",
  "typhoncip30",
  "gerowallet",
];
