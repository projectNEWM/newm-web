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
  SingleTransactionProps,
  TransactionType,
  TransactionVisualConfig,
} from "./types";

const PAYMENT_CONFIG = {
  [PaymentType.ADA]: {
    converter: convertLovelaceToAda,
    formatter: (amount: number) => formatAdaAmount(amount, { precision: 2 }),
  },
  [PaymentType.NEWM]: {
    converter: convertNewmiesToNewm,
    formatter: (amount: number) => formatNewmAmount(amount, { precision: 2 }),
  },
  [PaymentType.PAYPAL]: {
    converter: convertMicroUsdToUsd,
    formatter: (amount: number) => formatUsdAmount(amount, { precision: 2 }),
  },
} as const;

const DEFAULT_PAYMENT_CONFIG = {
  converter: (amount: number) => 0,
  formatter: (amount: number) => "0",
} as const;

const TRANSACTION_CONFIG = {
  [TransactionType.Claim]: {
    amountColor: theme.colors.green,
    heading: "Earnings claimed",
    icon: <CheckCircleIcon sx={ { height: 20, width: 20 } } />,
    iconBackground: theme.gradients.crypto,
    isPositive: true,
  },
  [TransactionType.Mint]: {
    amountColor: theme.colors.red,
    heading: "Track distribution and minting",
    icon: (
      <SellSharpIcon sx={ { height: 20, transform: "scaleX(-1)", width: 20 } } />
    ),
    iconBackground: theme.gradients.magazine,
    isPositive: false,
  },
} as const;

const DEFAULT_TRANSACTION_CONFIG: TransactionVisualConfig = {
  amountColor: theme.colors.grey200,
  heading: "Unknown transaction",
  icon: null,
  iconBackground: theme.colors.red,
  isPositive: false,
} as const;

function getTransactionConfig(
  type: TransactionType,
  mintPaymentType?: PaymentType
): TransactionVisualConfig {
  const baseVisuals = TRANSACTION_CONFIG[type];

  if (!baseVisuals) {
    return DEFAULT_TRANSACTION_CONFIG;
  }

  return {
    amountColor: mintPaymentType
      ? baseVisuals.amountColor
      : theme.colors.grey200,
    heading: baseVisuals.heading,
    icon: baseVisuals.icon,
    iconBackground: baseVisuals.iconBackground,
    isPositive: baseVisuals.isPositive,
  };
}
const SingleTransaction: FunctionComponent<SingleTransactionProps> = ({
  date,
  subheading,
  amount,
  type,
  mintPaymentType,
}) => {
  const paymentConfigData =
    (mintPaymentType && PAYMENT_CONFIG[mintPaymentType]) ||
    DEFAULT_PAYMENT_CONFIG;

  const transactionConfig = getTransactionConfig(type, mintPaymentType);

  const { converter, formatter } = paymentConfigData;
  const { heading, amountColor, iconBackground, icon, isPositive } =
    transactionConfig;

  const convertedAmount = converter(amount);
  const formattedAmount = `${isPositive ? "+" : "-"}${formatter(
    convertedAmount
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
