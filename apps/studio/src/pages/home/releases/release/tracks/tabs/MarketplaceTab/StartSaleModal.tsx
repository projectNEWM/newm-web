import { FunctionComponent } from "react";

import currency from "currency.js";

import { FormikValues } from "formik";

import { Box, Stack, Typography } from "@mui/material";

import { Button, HorizontalLine, Modal } from "@newm-web/elements";
import theme from "@newm-web/theme";
import {
  FULL_OWNERSHIP_STREAM_TOKENS,
  LOVELACE_CONVERSION,
  formatNewmAmount,
  formatPercentageAdaptive,
  formatUsdAmount,
} from "@newm-web/utils";
import { Currency } from "@newm-web/types";
import { useGetNewmUsdConversionRateQuery } from "../../../../../../../modules/crypto";

interface StartSaleModalProps {
  readonly handleClose: () => void;
  readonly handleStartSale: (values: FormikValues) => void;
  readonly isLoading: boolean;
  readonly isOpen: boolean;
  readonly saleCurrency: Currency;
  readonly tokensToSell: number;
  readonly totalSaleValue: number;
  readonly totalTokensOwnedByUser: number;
}

const StartSaleModal: FunctionComponent<StartSaleModalProps> = ({
  handleClose,
  isOpen,
  handleStartSale,
  isLoading,
  totalTokensOwnedByUser,
  totalSaleValue,
  tokensToSell,
  saleCurrency,
}) => {
  const { data: NEWMPriceData } = useGetNewmUsdConversionRateQuery();
  // Set the NEWM price in USD to 0 if the price data is not available
  const NEWMPriceInUSD = NEWMPriceData?.usdPrice
    ? NEWMPriceData?.usdPrice / LOVELACE_CONVERSION
    : 0;

  const isNEWMPriceUnavailable = NEWMPriceInUSD === 0;

  const totalSaleValueInNEWM =
    saleCurrency === Currency.NEWM
      ? totalSaleValue
      : NEWMPriceInUSD > 0
      ? totalSaleValue / NEWMPriceInUSD
      : 0;

  const totalSaleValueInUSD =
    saleCurrency === Currency.USD
      ? totalSaleValue
      : NEWMPriceInUSD > 0
      ? totalSaleValue * NEWMPriceInUSD
      : 0;

  const pricePerStreamTokenInUSD =
    tokensToSell > 0 ? totalSaleValueInUSD / tokensToSell : 0;

  return (
    <Modal isCloseButtonVisible={ false } isOpen={ isOpen } onClose={ handleClose }>
      <Box
        alignItems="center"
        alignSelf="center"
        display="flex"
        flex={ 1 }
        justifyContent="center"
        maxWidth={ 600 }
      >
        <Stack
          gap={ 2 }
          sx={ {
            backgroundColor: theme.colors.black,
            pb: 2,
            pt: 3,
            px: 3,
            textAlign: "center",
            width: "90%",
          } }
        >
          <Stack gap={ 1 } textAlign="start">
            <Typography variant="body2">Stream Token Sale Summary</Typography>

            <Stack
              sx={ {
                backgroundColor: theme.colors.grey600,
                gap: 0.5,
                my: 2,
                p: 1.5,
              } }
            >
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">
                  Stream tokens to sell
                </Typography>
                <Typography variant="h4">
                  { currency(tokensToSell, {
                    precision: 0,
                    symbol: "",
                  }).format() }
                </Typography>
              </Stack>
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
                mt={ 1.5 }
              >
                <Typography variant="subtitle1">
                  % of artist&apos;s stream token ownership
                </Typography>
                <Typography variant="h4">
                  { formatPercentageAdaptive(
                    (tokensToSell / totalTokensOwnedByUser) * 100
                  ) }
                  %
                </Typography>
              </Stack>
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">
                  % of track&apos;s total streaming royalty rights
                </Typography>
                <Typography variant="h4">
                  { formatPercentageAdaptive(
                    (tokensToSell / FULL_OWNERSHIP_STREAM_TOKENS) * 100
                  ) }
                  %
                </Typography>
              </Stack>
              <HorizontalLine my={ 1.5 } />
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">Total sale value</Typography>
                <Typography variant="h4">
                  <Typography component="span" mr={ 0.5 } variant="subtitle2">
                    { isNEWMPriceUnavailable
                      ? "(≈ $ N/A)"
                      : `(${formatUsdAmount(totalSaleValueInUSD, {
                          includeEstimateSymbol: true,
                        })})` }
                  </Typography>
                  { formatNewmAmount(totalSaleValueInNEWM) }
                </Typography>
              </Stack>
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">
                  Price per stream token
                </Typography>
                <Typography variant="h4">
                  <Typography component="span" mr={ 0.5 } variant="subtitle2">
                    { isNEWMPriceUnavailable
                      ? "(≈ $ N/A)"
                      : `(${formatUsdAmount(pricePerStreamTokenInUSD, {
                          includeEstimateSymbol: true,
                        })})` }
                  </Typography>
                  { formatNewmAmount(totalSaleValueInNEWM / tokensToSell) }
                </Typography>
              </Stack>
            </Stack>

            <Typography variant="subtitle2">
              Stream token sales may take several minutes to appear on the
              Marketplace. You will receive an email notification once the sale
              has been successfully created.
            </Typography>
          </Stack>
          <HorizontalLine />
          <Stack flexDirection="row" gap={ 1 } justifyContent="end" mt={ 1 }>
            <Button
              color="music"
              disabled={ isLoading }
              variant="secondary"
              width="compact"
              onClick={ handleClose }
            >
              Cancel
            </Button>
            <Button
              disabled={ isLoading }
              type="submit"
              width="compact"
              onClick={ handleStartSale }
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default StartSaleModal;
