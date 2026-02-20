import { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlags } from "launchdarkly-react-client-sdk";

import currency from "currency.js";

import { AlertTitle, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

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

// TODO: Remove once 'webStudioDisableDistributionAndSales' retires.
const SundownButtons = ({
  saleId,
  isEndSaleLoading,
  setIsEndSaleModalOpen,
}: {
  isEndSaleLoading: boolean;
  saleId: string;
  setIsEndSaleModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <>
      <Button
        color="music"
        component="a"
        href={ `${NEWM_MARKETPLACE_URL}/sale/${saleId}/` }
        target="_blank"
        variant="secondary"
        width="compact"
      >
        View on Marketplace
      </Button>
      <Button
        disabled={ isEndSaleLoading }
        startIcon={ <Close /> }
        variant="primary"
        width="compact"
        onClick={ () => setIsEndSaleModalOpen(true) }
      >
        End stream token sale
      </Button>
    </>
  );
};

export const ActiveSale: FunctionComponent<ActiveSaleProps> = ({ sale }) => {
  const { webStudioDisableDistributionAndSales } = useFlags();

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
          { webStudioDisableDistributionAndSales
            ? "You have an active Stream Token sale for this track on the Marketplace!"
            : "You already have an active stream token sale for this track on the Marketplace!" }
        </AlertTitle>

        { webStudioDisableDistributionAndSales && (
          <Typography fontWeight={ 500 } variant="subtitle1">
            Please end the sale and we&apos;ll return the unsold Stream Tokens
            to your wallet.
          </Typography>
        ) }

        { !webStudioDisableDistributionAndSales && (
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
        ) }
      </Alert>

      { !webStudioDisableDistributionAndSales && (
        <Typography mt={ 2.5 } variant="subtitle2">
          You can choose to end this sale, and we&apos;ll return the unsold
          stream tokens to your wallet.
        </Typography>
      ) }

      { !webStudioDisableDistributionAndSales && <HorizontalLine /> }

      <Stack flexDirection="row" gap={ 2.5 } mt={ 1.5 }>
        { webStudioDisableDistributionAndSales ? (
          <SundownButtons
            isEndSaleLoading={ isEndSaleLoading }
            saleId={ saleId ?? "" }
            setIsEndSaleModalOpen={ setIsEndSaleModalOpen }
          />
        ) : (
          <>
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
          </>
        ) }
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
