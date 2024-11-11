import {
  FunctionComponent,
  ReactNode,
  SyntheticEvent,
  useCallback,
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
import { Button } from "@newm-web/elements";
import { NoConnectedWallet } from "@newm-web/components";
import {
  EARNINGS_IN_PROGRESS_UPDATED_EVENT,
  LOCAL_STORAGE_EARNINGS_IN_PROGRESS_KEY,
} from "@newm-web/utils";
import { EarningsInProgress } from "@newm-web/types";
import { UnclaimedRoyalties } from "./UnclaimedRoyalties";
import Portfolio from "./Portfolio";
import Transactions from "./transactions/Transactions";
import { NoPendingEarnings } from "./NoPendingEarnings";
import { EarningsClaimInProgress } from "./EarningsClaimInProgress";
import { LegacyPortfolio, LegacyUnclaimedRoyalties } from "./legacyWallet";
import { useGetStudioClientConfigQuery } from "../../../modules/content";
import {
  resetWalletPortfolioTableFilter,
  setIsConnectWalletModalOpen,
} from "../../../modules/ui";
import { useAppDispatch, useAppSelector } from "../../../common";
import { DisconnectWalletButton } from "../../../components";
import { selectWallet, useGetEarningsQuery } from "../../../modules/wallet";

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
  const [tab, setTab] = useState(0);
  const [earningsInProgress, setEarningsInProgress] =
    useState<EarningsInProgress>();
  const { wallet } = useConnectWallet();
  const { data: clientConfig, isLoading: isClientConfigLoading } =
    useGetStudioClientConfigQuery();
  const { walletAddress = "" } = useAppSelector(selectWallet);
  const { data: earningsData } = useGetEarningsQuery(walletAddress, {
    skip: !walletAddress,
  });

  const earnings = earningsData?.earnings ?? [];

  const isClaimWalletRoyaltiesEnabled =
    clientConfig?.featureFlags?.claimWalletRoyaltiesEnabled ?? false;
  const unclaimedEarnings = earnings.filter((earning) => !earning.claimed);
  const isEarningsInProgress =
    earningsInProgress?.unclaimedEarningsInNEWM ||
    earningsInProgress?.unclaimedEarningsInUSD;

  const handleChange = (event: SyntheticEvent, nextTab: number) => {
    setTab(nextTab);
  };

  /**
   * Handle the pending state for sale end.
   */
  const handleSaleEndPending = useCallback(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_EARNINGS_IN_PROGRESS_KEY
    );
    if (pendingSales) {
      const parsedPendingSales = JSON.parse(pendingSales);
      setEarningsInProgress(parsedPendingSales);
    } else {
      setEarningsInProgress(undefined);
    }
  }, []);

  /**
   * Initialize and manage the event listeners for pending sales updates.
   */
  useEffect(() => {
    handleSaleEndPending();

    window.addEventListener(
      EARNINGS_IN_PROGRESS_UPDATED_EVENT,
      handleSaleEndPending
    );

    return () => {
      window.removeEventListener(
        EARNINGS_IN_PROGRESS_UPDATED_EVENT,
        handleSaleEndPending
      );
    };
  }, [handleSaleEndPending]);

  //Reset Portfolio Table Filter to view all royalty earnings on page navigation
  useEffect(() => {
    return () => {
      dispatch(resetWalletPortfolioTableFilter());
    };
  }, [dispatch]);

  // Don't show any content until client config has loaded
  if (isClientConfigLoading) return;

  // Current State of the Wallet Page
  if (!isClaimWalletRoyaltiesEnabled) {
    return (
      <Container maxWidth={ false }>
        <Box ml={ [null, null, 3] }>
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

            { wallet ? (
              <DisconnectWalletButton />
            ) : (
              <Button
                gradient="crypto"
                sx={ { mb: 5, mr: [0, 4.75] } }
                width="compact"
                onClick={ () => dispatch(setIsConnectWalletModalOpen(true)) }
              >
                Connect Wallet
              </Button>
            ) }
          </Box>

          <LegacyUnclaimedRoyalties unclaimedRoyalties={ 0 } />

          <Box mt={ 2.5 }>
            <LegacyPortfolio />
          </Box>
        </Box>
      </Container>
    );
  } else {
    // New Wallet Royalties and Enhancement Features
    if (!wallet) {
      return (
        <NoConnectedWallet
          onConnectWallet={ () => dispatch(setIsConnectWalletModalOpen(true)) }
        />
      );
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

          { unclaimedEarnings?.length ? (
            isEarningsInProgress ? (
              <EarningsClaimInProgress
                unclaimedEarningsInNEWM={
                  earningsInProgress?.unclaimedEarningsInNEWM || 0
                }
                unclaimedEarningsInUSD={
                  earningsInProgress.unclaimedEarningsInUSD || 0
                }
              />
            ) : (
              <UnclaimedRoyalties />
            )
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
                <Tab
                  aria-controls="tabpanel-1"
                  id="tab-1"
                  label="TRANSACTIONS"
                />
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
  }
};

export default Wallet;
