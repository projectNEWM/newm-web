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
import {
  EarningsClaimInProgress,
  NoConnectedWallet,
  NoPendingEarnings,
  UnclaimedEarnings,
} from "@newm-web/components";
import {
  EARNINGS_IN_PROGRESS_UPDATED_EVENT,
  LOCAL_STORAGE_EARNINGS_IN_PROGRESS_KEY,
  TRANSACTION_FEE_IN_ADA,
  convertAdaToUsd,
  convertNewmiesToNewm,
  convertNewmiesToUsd,
} from "@newm-web/utils";
import { EarningsInProgress } from "@newm-web/types";
import Portfolio from "./portfolio/Portfolio";
import Transactions from "./transactions/Transactions";
import {
  useGetAdaUsdConversionRateQuery,
  useGetNewmUsdConversionRateQuery,
} from "../../../modules/crypto";
import { setIsConnectWalletModalOpen } from "../../../modules/ui";
import { useAppDispatch, useAppSelector } from "../../../common";
import { DisconnectWalletButton } from "../../../components";
import {
  selectWallet,
  useClaimEarningsThunk,
  useGetEarningsQuery,
} from "../../../modules/wallet";

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
  const { walletAddress = "" } = useAppSelector(selectWallet);
  const {
    data: earningsData,
    isLoading: isEarningsLoading,
    isError: isEarningsError,
  } = useGetEarningsQuery(walletAddress, {
    skip: !walletAddress,
  });
  const {
    data: newmUsdConversionRate,
    isLoading: isConversionLoading,
    isError: isConversionError,
  } = useGetNewmUsdConversionRateQuery();
  const { data: { usdPrice: adaUsdConversionRate = 0 } = {} } =
    useGetAdaUsdConversionRateQuery();
  const [claimEarnings, { isLoading: isClaimEarningsLoading }] =
    useClaimEarningsThunk();

  const preConvertedUsdPrice = newmUsdConversionRate?.usdPrice ?? 0;
  const { earnings = [], amountCborHex = "" } = earningsData || {};

  const unclaimedEarnings =
    earnings?.filter((earning) => !earning.claimed) || [];
  const unclaimedEarningsInNewmies =
    unclaimedEarnings?.reduce(
      (sum, earning) => sum + (earning.amount || 0),
      0
    ) || 0;
  const unclaimedEarningsInNEWM = convertNewmiesToNewm(
    unclaimedEarningsInNewmies
  );
  const unclaimedEarningsInUSD = convertNewmiesToUsd(
    unclaimedEarningsInNewmies,
    preConvertedUsdPrice
  );
  const totalClaimed = earningsData?.totalClaimed ?? 0;
  const totalClaimedInNEWM = convertNewmiesToNewm(totalClaimed);
  const totalClaimedInUSD = convertNewmiesToUsd(
    totalClaimed,
    preConvertedUsdPrice
  );

  const transactionFeeInUSD = convertAdaToUsd(
    TRANSACTION_FEE_IN_ADA,
    adaUsdConversionRate
  );
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

  const handleClaimEarnings = async () => {
    await claimEarnings({
      amountCborHex,
      unclaimedEarningsInNEWM,
      unclaimedEarningsInUSD,
    });
  };

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

  if (!wallet) {
    return (
      <NoConnectedWallet
        onConnectWallet={ () => dispatch(setIsConnectWalletModalOpen(true)) }
      />
    );
  }

  return (
    <Container maxWidth={ false }>
      <Box marginTop={ 10.5 } mx={ [null, null, 3] }>
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
              unclaimedEarningsInNEWM={ unclaimedEarningsInNEWM }
              unclaimedEarningsInUSD={ unclaimedEarningsInUSD }
            />
          ) : (
            <UnclaimedEarnings
              isClaimEarningsLoading={ isClaimEarningsLoading }
              isConversionLoading={ isConversionLoading }
              isEarningsError={ isEarningsError }
              isEarningsLoading={ isEarningsLoading }
              transactionFeeInADA={ TRANSACTION_FEE_IN_ADA }
              transactionFeeInUSD={ transactionFeeInUSD }
              unclaimedEarningsInNEWM={ unclaimedEarningsInNEWM }
              unclaimedEarningsInUSD={ unclaimedEarningsInUSD }
              onClaimEarnings={ handleClaimEarnings }
            />
          )
        ) : (
          <NoPendingEarnings
            isConversionError={ isConversionError }
            isConversionLoading={ isConversionLoading }
            isEarningsError={ isEarningsError }
            isEarningsLoading={ isEarningsLoading }
            totalClaimedInNEWM={ totalClaimedInNEWM }
            totalClaimedInUSD={ totalClaimedInUSD }
          />
        ) }

        <Box maxWidth={ 1000 } mt={ 5 } pb={ 5 }>
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
                  fontWeight: 600,
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
