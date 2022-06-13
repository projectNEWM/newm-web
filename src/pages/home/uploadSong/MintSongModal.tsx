import { FunctionComponent, useState } from "react";
import { supportedWallets, walletInfo } from "common";
import {
  Dialog,
  DialogProps,
  OutlinedButton,
  TransparentButton,
  Typography,
} from "elements";
import { Box, Stack, useTheme } from "@mui/material";

interface MintSongModalProps extends Omit<DialogProps, "onClose"> {
  readonly onClose: VoidFunction;
}

interface DialogContent {
  readonly title: string;
  readonly subtitle: string;
}

const MintSongModal: FunctionComponent<MintSongModalProps> = (props) => {
  const theme = useTheme();

  const [selectedWallet, setSelectedWallet] = useState("");

  console.log("selected wallet: ", selectedWallet);

  // const availableWallets: ReadonlyArray<any> = []; // for testing
  const availableWallets = supportedWallets.filter((walletName: string) => {
    return !!window.cardano && !!window.cardano[walletName];
  });

  const handleSelectWallet = (walletName: string) => {
    setSelectedWallet(walletName);
  };

  const walletContent =
    availableWallets.length > 0
      ? {
          title: "Select a connected wallet",
          subtitle:
            "Please select a connected to wallet to mint your song with.",
        }
      : {
          title: "Connect a Cardano wallet",
          subtitle:
            "Setup and or connect a Cardano wallet using one of the official " +
            "browser extensions below. After you've connected your wallet, " +
            "return to this screen to mint your song.",
        };

  const wallets =
    availableWallets.length > 0 ? availableWallets : supportedWallets;

  return (
    <Dialog {...props}>
      <Stack spacing={2} padding={3} paddingBottom={2}>
        <Stack spacing={0.5}>
          <Typography variant="body2">{walletContent.title}</Typography>
          <Typography variant="subtitle1">{walletContent.subtitle}</Typography>
        </Stack>

        <Stack spacing={1}>
          {wallets.map((identifier) => {
            const info = walletInfo[identifier];

            return (
              <TransparentButton
                key={identifier}
                onClick={() => handleSelectWallet(identifier)}
                sx={{ opacity: 1, justifyContent: "flex-start" }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <img
                    alt={`${info.name} logo`}
                    src={info.logo}
                    width={30}
                    height={30}
                  />
                  <span>{info.name}</span>
                </Stack>
              </TransparentButton>
            );
          })}
        </Stack>
      </Stack>

      <Stack
        direction="row"
        py={1.5}
        px={3}
        sx={{
          justifyContent: "flex-end",
          backgroundColor: theme.colors.grey600,
        }}
      >
        <OutlinedButton
          backgroundColor={theme.colors.grey600}
          onClick={() => props.onClose()}
        >
          Cancel
        </OutlinedButton>
      </Stack>
    </Dialog>
  );
};

export default MintSongModal;
