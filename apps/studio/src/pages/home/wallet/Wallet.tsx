import {
  FunctionComponent,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Container,
  Stack,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@mui/material";
import theme from "@newm-web/theme";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { UnclaimedRoyalties } from "./UnclaimedRoyalties";
import Portfolio from "./Portfolio";
import Transactions from "./Transactions";
import { NoPendingEarnings } from "./NoPendingEarnings";
import { NoConnectedWallet } from "./NoConnectedWallet";
import { resetWalletPortfolioTableFilter } from "../../../modules/ui";
import { useAppDispatch } from "../../../common";
import { DisconnectWalletButton } from "../../../components";
import { useGetUserWalletSongsThunk } from "../../../modules/song";

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

interface ColorMap {
  [index: number]: Partial<keyof Theme["gradients" | "colors"]>;
}

const TabPanel: FunctionComponent<TabPanelProps> = ({
  children,
  value,
  index,
}) => {
  return (
    <Stack
      alignItems={ ["center", "center", "unset"] }
      aria-labelledby={ `tab-${index}` }
      hidden={ value !== index }
      id={ `tabpanel-${index}` }
      role="tabpanel"
    >
      { value === index && children }
    </Stack>
  );
};

const colorMap: ColorMap = {
  0: "crypto",
  1: "music",
};

const Wallet: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();
  const [getUserWalletSongs, { data: walletSongsResponse, isLoading }] =
    useGetUserWalletSongsThunk();

  const songs =
    walletSongsResponse?.data?.songs?.map((entry) => entry.song) || [];

  //Reset Portfolio Table Filter to view all royalty earnings on page navigation
  useEffect(() => {
    return () => {
      dispatch(resetWalletPortfolioTableFilter());
    };
  }, [dispatch]);

  useEffect(() => {
    getUserWalletSongs({
      limit: 1,
      offset: 0,
    });
  }, [getUserWalletSongs, wallet]);

  const [tab, setTab] = useState(0);
  const [unclaimedRoyalties, setUnclaimedRoyalties] = useState(1);

  const handleChange = (event: SyntheticEvent, nextTab: number) => {
    setTab(nextTab);
  };

  if (!wallet) {
    return <NoConnectedWallet />;
  }

  return (
    <Container maxWidth={ false }>
      <Box mx={ [null, null, 1.5] }>
        <Box
          sx={ {
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            mb: 5,
          } }
        >
          <Typography fontWeight={ 800 } variant="h3">
            WALLET
          </Typography>
          <DisconnectWalletButton />
        </Box>

        { songs.length === 0 && !isLoading ? null : unclaimedRoyalties ? (
          <UnclaimedRoyalties unclaimedRoyalties={ unclaimedRoyalties } />
        ) : (
          <NoPendingEarnings />
        ) }

        <Box mt={ 5 } pb={ 5 }>
          <Box borderBottom={ 1 } borderColor={ theme.colors.grey400 }>
            <Tabs
              aria-label="Wallet details"
              sx={ {
                ".Mui-selected": {
                  background: theme.gradients[colorMap[tab]],
                  backgroundClip: "text",
                  color: theme.colors[colorMap[tab]],
                  textFillColor: "transparent",
                },
                ".MuiButtonBase-root.MuiTab-root": {
                  minWidth: "auto",
                  ...theme.typography.subtitle2,
                  color: theme.colors.grey400,
                  fontWeight: 500,
                },
                ".MuiTabs-flexContainer": {
                  gap: 4,
                  justifyContent: ["center", "center", "normal"],
                },
                ".MuiTabs-indicator": {
                  background: theme.gradients[colorMap[tab]],
                },
              } }
              value={ tab }
              onChange={ handleChange }
            >
              <Tab aria-controls="tabpanel-0" id="tab-0" label="PORTFOLIO" />
              <Tab aria-controls="tabpanel-1" id="tab-1" label="TRANSACTIONS" />
            </Tabs>
          </Box>

          <TabPanel index={ 0 } value={ tab }>
            <Portfolio />
          </TabPanel>
          <TabPanel index={ 1 } value={ tab }>
            <Transactions />
          </TabPanel>
        </Box>
      </Box>
    </Container>
  );
};

export default Wallet;
