import { Alert, Modal } from "@newm-web/elements";
import { FunctionComponent } from "react";
import Swap from "@dexhunterio/swaps";
import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import {
  getSupportedWallets,
  useConnectWallet,
} from "@newm.io/cardano-dapp-wallet-connector";
import { SelectedWallet } from "@dexhunterio/swaps/lib/typescript/cardano-api";
import "@dexhunterio/swaps/lib/assets/style.css";

interface SwapNewmModalProps {
  readonly isOpen: boolean;
  readonly onClose: VoidFunction;
  readonly partnerCode: string;
  readonly partnerName: string;
}

const SwapNewmModal: FunctionComponent<SwapNewmModalProps> = ({
  isOpen,
  onClose,
  partnerName,
  partnerCode,
}) => {
  const theme = useTheme();

  const { wallet } = useConnectWallet();

  if (!wallet) {
    throw new Error("Wallet must be connected before accessing swap modal.");
  }

  const isConnectedWalletSupported = dexhunterSupportedWallets.includes(
    wallet.name
  );

  return isConnectedWalletSupported ? (
    <Modal
      isCloseOnClickBackgroundEnabled={ true }
      isOpen={ isOpen }
      onClose={ onClose }
    >
      <Box alignItems="center" display="flex" justifyContent="center">
        <Swap
          colors={ {
            accent: theme.colors.crypto as `#${string}`,
            background: theme.colors.grey600 as `#${string}`,
            buttonText: theme.colors.white as `#${string}`,
            containers: theme.colors.grey500 as `#${string}`,
            mainText: theme.colors.white as `#${string}`,
            subText: theme.colors.grey100 as `#${string}`,
          } }
          defaultToken="682fe60c9918842b3323c43b5144bc3d52a23bd2fb81345560d73f634e45574d"
          orderTypes={ ["SWAP", "LIMIT"] }
          partnerCode={ partnerCode }
          partnerName={ partnerName }
          selectedWallet={ wallet?.name?.toLowerCase() as SelectedWallet }
          style={ {
            fontFamily: "Inter",
          } }
          supportedTokens={ [
            "682fe60c9918842b3323c43b5144bc3d52a23bd2fb81345560d73f634e45574d",
          ] }
          theme="dark"
          width="450"
        />
      </Box>
    </Modal>
  ) : (
    <Modal isOpen={ isOpen } onClose={ onClose }>
      <Container maxWidth="sm">
        <Alert severity="warning">
          <Stack spacing={ 0.5 }>
            <Typography color="yellow">Unsupported wallet</Typography>
            <Typography color="yellow" fontWeight={ 400 } variant="subtitle1">
              The wallet you have connected is not supported by the DexHunter
              token swap integration. To purchase NEWM through this integration,
              please use one of the following compatible wallets:{ " " }
              { renderSupportedWallets() }.
            </Typography>
          </Stack>
        </Alert>
      </Container>
    </Modal>
  );
};

/**
 * Render a list of supported wallets in bold.
 */
const renderSupportedWallets = () => {
  const supportedWalletNames = getSwapSupportedWalletNames();

  const getNameConnector = (idx: number) => {
    let connector;

    if (idx < supportedWalletNames.length - 2) {
      connector = ", ";
    } else if (idx === supportedWalletNames.length - 2) {
      connector = ", or ";
    }

    return connector;
  };

  return supportedWalletNames.map((name, idx) => {
    const connector = getNameConnector(idx);

    return (
      <>
        <strong key={ `supported-wallet-${name}` }>{ name }</strong>
        { connector }
      </>
    );
  });
};

/**
 * Get a list of wallet names supported by both the NEWM Cardano
 * Wallet Connector and DexHunter Swap packages.
 */
const getSwapSupportedWalletNames = () => {
  const supportedWallets = dexhunterSupportedWallets.map((walletId) => {
    return newmSupportedWallets.find((wallet) => wallet.id === walletId);
  });

  return supportedWallets.map((wallet) => wallet?.name);
};

const newmSupportedWallets = getSupportedWallets();

const dexhunterSupportedWallets = [
  "nami",
  "eternl",
  "flint",
  "gerowallet",
  "typhoncip30",
  "nufi",
  "lace",
  "vespr",
  "begin",
  "yoroi",
];

export default SwapNewmModal;
