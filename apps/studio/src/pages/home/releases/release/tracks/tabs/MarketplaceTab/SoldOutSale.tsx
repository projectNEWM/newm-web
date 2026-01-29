import { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";

import { AlertTitle, Stack, Typography } from "@mui/material";

import { Alert, Button, HorizontalLine } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { Sale } from "@newm-web/types";

import { EndSaleModal } from "./EndSaleModal";
import { useEndSaleThunk } from "../../../../../../../modules/sale";

interface SoldOutSaleProps {
  readonly sale?: Sale;
}

export const SoldOutSale: FunctionComponent<SoldOutSaleProps> = ({ sale }) => {
  const [isSoldOutSaleModalOpen, setIsSoldOutSaleModalOpen] = useState(false);
  const { trackId } = useParams<"trackId">() as { trackId: string };
  const [endSale, { isLoading: isEndSaleLoading }] = useEndSaleThunk();
  const saleId = sale?.id;

  const handleEndSale = async () => {
    if (!saleId) {
      return;
    }

    await endSale({ isSoldOut: true, saleId, songId: trackId });

    setIsSoldOutSaleModalOpen(false);
  };

  if (!sale) {
    return null;
  }

  return (
    <Stack sx={ { gap: 2.5, mt: 1 } }>
      <Alert severity="success">
        <AlertTitle color={ theme.colors.green } sx={ { fontWeight: 600 } }>
          Congratulations! Your stream token sale has sold out. End this sale to
          claim your earnings.
        </AlertTitle>
      </Alert>
      <Typography mt={ 2.5 } variant="subtitle2">
        End this sale using the button below to move the earnings to your
        wallet.
      </Typography>
      <HorizontalLine />
      <Stack flexDirection="row" gap={ 2.5 }>
        <Button
          color="music"
          disabled={ isEndSaleLoading }
          width="compact"
          onClick={ () => setIsSoldOutSaleModalOpen(true) }
        >
          End stream token sale
        </Button>
      </Stack>

      <EndSaleModal
        handleClose={ () => setIsSoldOutSaleModalOpen(false) }
        handleEndSale={ handleEndSale }
        isLoading={ isEndSaleLoading }
        isOpen={ isSoldOutSaleModalOpen }
        isSoldOut={ true }
      />
    </Stack>
  );
};
