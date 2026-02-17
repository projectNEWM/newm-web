import { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import currency from "currency.js";
import { AlertTitle, Stack, Typography } from "@mui/material";
import { Alert, Button, HorizontalLine } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { Sale } from "@newm-web/types";
import { EndSaleModal } from "./EndSaleModal";
import { SongRouteParams } from "../../../../common/types";
import { useEndSaleThunk } from "../../../../modules/sale";
import { NEWM_MARKETPLACE_URL } from "../../../../common";

interface ActiveSaleProps {
  readonly sale?: Sale;
}

export const ActiveSale: FunctionComponent<ActiveSaleProps> = ({ sale }) => {
  const [isEndSaleModalOpen, setIsEndSaleModalOpen] = useState(false);
  const { songId } = useParams<"songId">() as SongRouteParams;
  const [endSale, { isLoading: isEndSaleLoading }] = useEndSaleThunk();
  const saleId = sale?.id;

  const handleEndSale = async () => {
    if (!saleId) {
      return;
    }

    await endSale({ saleId, songId });

    setIsEndSaleModalOpen(false);
  };

  if (!sale) {
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
          { `There are ${currency(sale.availableBundleQuantity, {
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
          href={ `${NEWM_MARKETPLACE_URL}/sale/${saleId}/` }
          target="_blank"
          width="compact"
        >
          View on Marketplace
        </Button>
        <Button
          color="music"
          disabled={ isEndSaleLoading }
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
        isLoading={ isEndSaleLoading }
        isOpen={ isEndSaleModalOpen }
      />
    </Stack>
  );
};
