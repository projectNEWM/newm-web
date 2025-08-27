import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/material";
import SellSharpIcon from "@mui/icons-material/SellSharp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { HorizontalLine } from "@newm-web/elements";
import theme from "@newm-web/theme";
import {
  convertLovelaceToAda,
  convertMicroUsdToUsd,
  convertNewmiesToNewm,
  formatAdaAmount,
  formatNewmAmount,
  formatTimeFromISO,
  formatUsdAmount,
} from "@newm-web/utils";
import { PaymentType } from "@newm-web/types";
import {
  PaymentConfig,
  SingleTransactionProps,
  TransactionConfig,
  TransactionType,
} from "./types";

// Payment type configurations
const paymentConfig: Record<
  PaymentType,
  {
    converter: (amount: number) => number;
    formatter: (amount: number) => string;
  }
> = {
  ADA: {
    converter: convertLovelaceToAda,
    formatter: formatAdaAmount,
  },
  NEWM: {
    converter: convertNewmiesToNewm,
    formatter: formatNewmAmount,
  },
  PAYPAL: {
    converter: convertMicroUsdToUsd,
    formatter: formatUsdAmount,
  },
};

const config: Record<TransactionType, TransactionConfig> = {
  claim: {
    amountColor: theme.colors.green,
    heading: "Earnings claimed",
    icon: <CheckCircleIcon sx={ { height: 20, width: 20 } } />,
    iconBackground: theme.gradients.crypto,
    isPositive: true,
  },
  mint: {
    amountColor: theme.colors.red,
    heading: "Track distribution and minting",
    icon: (
      <SellSharpIcon sx={ { height: 20, transform: "scaleX(-1)", width: 20 } } />
    ),
    iconBackground: theme.gradients.magazine,
    isPositive: false,
  },
};

const defaultTransactionConfig: TransactionConfig = {
  amountColor: theme.colors.grey200,
  heading: "Unknown transaction",
  icon: null,
  iconBackground: theme.colors.red,
  isPositive: false,
};

const defaultPaymentConfig: PaymentConfig = {
  converter: (amount: number) => 0,
  formatter: (amount: number) => "0",
};

const SingleTransaction: FunctionComponent<SingleTransactionProps> = ({
  date,
  subheading,
  amount,
  type,
  mintPaymentType,
}) => {
  // Get transaction config
  const transactionConfig = config[type] || defaultTransactionConfig;

  // Get payment config
  const paymentConfigData =
    paymentConfig[mintPaymentType] || defaultPaymentConfig;

  const { converter, formatter } = paymentConfigData;
  const { heading, amountColor, iconBackground, icon, isPositive } =
    transactionConfig;

  const formattedAmount = `${isPositive ? "+" : "-"}${formatter(
    converter(amount)
  )}`;

  return (
    <Stack>
      <Stack alignItems="center" direction="row" gap={ 1.5 }>
        <Stack
          sx={ {
            alignItems: "center",
            background: iconBackground,
            borderRadius: "4px",
            height: "32px",
            justifyContent: "center",
            minWidth: "32px",
          } }
        >
          { icon }
        </Stack>
        <Stack gap={ 0.25 }>
          <Typography
            color={ theme.colors.white }
            component="span"
            fontWeight={ 500 }
            variant="subtitle2"
          >
            { heading }
            { subheading && (
              <Typography component="span" fontWeight={ 500 } variant="subtitle2">
                { " " }
                - { subheading }
              </Typography>
            ) }
          </Typography>
          <Typography
            color={ theme.colors.grey200 }
            component="span"
            fontWeight={ 500 }
            variant="subtitle2"
          >
            { formatTimeFromISO(date) }
          </Typography>
        </Stack>
        <Stack ml="auto">
          <Typography color={ amountColor } component="span">
            { formattedAmount }
          </Typography>
        </Stack>
      </Stack>
      <HorizontalLine mt={ 2 } />
    </Stack>
  );
};

export default SingleTransaction;
