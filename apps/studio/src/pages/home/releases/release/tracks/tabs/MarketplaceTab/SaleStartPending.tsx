import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import currency from "currency.js";

import { AlertTitle, Stack, Typography } from "@mui/material";

import { Alert, HorizontalLine } from "@newm-web/elements";
import theme from "@newm-web/theme";

import {
  LOCAL_STORAGE_SALE_START_PENDING_KEY,
  SaleStartPendingSongs,
} from "../../../../../../../common";

const SaleStartPending = () => {
  const { trackId } = useParams<"trackId">() as { trackId: string };
  const [tokensToSell, setTokensToSell] = useState<string>();

  useEffect(() => {
    const pendingSales = localStorage.getItem(
      LOCAL_STORAGE_SALE_START_PENDING_KEY
    );

    if (pendingSales) {
      const parsedPendingSales: SaleStartPendingSongs =
        JSON.parse(pendingSales);

      setTokensToSell(parsedPendingSales[trackId]?.tokensToSell);
    }
  }, [trackId]);

  return (
    <Stack sx={ { gap: 2.5, mt: 1 } }>
      <Alert>
        <AlertTitle color={ theme.colors.blue } sx={ { fontWeight: 600 } }>
          You already have a pending stream token sale for this track!
        </AlertTitle>
        <Typography
          color={ theme.colors.blue }
          fontWeight={ 500 }
          variant="subtitle1"
        >
          { `
          ${
            tokensToSell
              ? currency(tokensToSell, {
                  precision: 0,
                  symbol: "",
                }).format()
              : "Your"
          }
          stream tokens are being made available for sale on the Marketplace.` }
        </Typography>
      </Alert>
      <Typography mt={ 2.5 } variant="subtitle2">
        Stream token sales may take several minutes to appear on the
        Marketplace. You will receive an email notification once the sale has
        been successfully created. Once available, you can choose to end the
        sale, and we&apos;ll return the unsold stream tokens to your wallet.
      </Typography>
      <HorizontalLine />
    </Stack>
  );
};

export default SaleStartPending;
