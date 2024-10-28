import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/material";
import SellSharpIcon from "@mui/icons-material/SellSharp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { HorizontalLine } from "@newm-web/elements";
import theme from "@newm-web/theme";
import {
  convertAdaiesToAda,
  convertNewmiesToNewm,
  formatAdaAmount,
  formatNewmAmount,
  formatTimeFromISO,
} from "@newm-web/utils";
import { TransactionConfig, TransactionProps, TransactionType } from "./types";

const config: Record<TransactionType, TransactionConfig> = {
  claim: {
    amountColor: theme.colors.green,
    converter: convertNewmiesToNewm,
    formatter: formatNewmAmount,
    heading: "Earnings claimed",
    icon: <CheckCircleIcon sx={ { height: 20, width: 20 } } />,
    iconBackground: theme.gradients.crypto,
    isPositive: true,
  },
  mint: {
    amountColor: theme.colors.red,
    converter: convertAdaiesToAda,
    formatter: formatAdaAmount,
    heading: "Track distribution and minting",
    icon: (
      <SellSharpIcon sx={ { height: 20, transform: "scaleX(-1)", width: 20 } } />
    ),
    iconBackground: theme.gradients.magazine,
    isPositive: false,
  },
};

const defaultConfig: TransactionConfig = {
  amountColor: theme.colors.grey200,
  converter: () => 0,
  formatter: () => "0",
  heading: "Unknown transaction",
  icon: null,
  iconBackground: theme.colors.red,
  isPositive: false,
};

const Transaction: FunctionComponent<TransactionProps> = ({
  date,
  subheading,
  amount,
  type,
}) => {
  // Fallback for unknown types
  const {
    heading,
    amountColor,
    iconBackground,
    icon,
    isPositive,
    formatter,
    converter,
  } = config[type] || defaultConfig;

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

export default Transaction;
