import { useState } from "react";
import { useParams } from "react-router-dom";
import currency from "currency.js";
import { AlertTitle, Stack, Typography } from "@mui/material";
import { Alert, Button, HorizontalLine } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { EndSaleModal } from "./EndSaleModal";
import { MarketplaceTabSkeleton } from "../../../../components";
import { SongRouteParams } from "../types";
import { useGetSalesQuery } from "../../../../modules/sale";
import { NEWM_MARKETPLACE_URL } from "../../../../common";

export const ActiveSale = () => {
  const [isEndSaleModalOpen, setIsEndSaleModalOpen] = useState(false);
  const { songId } = useParams<"songId">() as SongRouteParams;
  const { data: sales = [], isLoading } = useGetSalesQuery({
    songIds: [songId],
  });

  const handleEndSale = () => {
    console.log("TODO: Handle end sale. Show sucess toast and update the UI.");
  };

  if (isLoading) {
    return <MarketplaceTabSkeleton />;
  }

  if (!sales.length) {
    return null;
  }

  return (
    <Stack sx={ { gap: 2.5, mt: 1 } }>
      <Alert>
        <AlertTitle color={ theme.colors.blue } sx={ { fontWeight: 600 } }>
          You already have an active stream token sale for this track on the
          Marketplace!
        </AlertTitle>
        <Typography
          color={ theme.colors.blue }
          fontWeight={ 500 }
          variant="subtitle1"
        >
          { `There are ${currency(sales[0].availableBundleQuantity, {
            precision: 0,
            symbol: "",
          }).format()} remaining stream tokens available for sale.` }
        </Typography>
      </Alert>
      <Typography mt={ 2.5 } variant="subtitle2">
        You can choose to end this sale, and we&apos;ll return the unsold stream
        tokens to your wallet.
      </Typography>
      <HorizontalLine />
      <Stack flexDirection="row" gap={ 2.5 }>
        <Button
          component="a"
          href={ `${NEWM_MARKETPLACE_URL}/sale/${sales[0].id}/` }
          target="_blank"
          width="compact"
        >
          View on Marketplace
        </Button>
        <Button
          color="music"
          variant="secondary"
          width="compact"
          onClick={ () => setIsEndSaleModalOpen(true) }
        >
          End stream token sale
        </Button>
      </Stack>
      <EndSaleModal
        handleClose={ () => setIsEndSaleModalOpen(false) }
        handleEndSale={ handleEndSale }
        isOpen={ isEndSaleModalOpen }
      />
    </Stack>
  );
};
