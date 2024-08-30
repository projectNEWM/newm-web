import { FunctionComponent } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button, HorizontalLine, Modal } from "@newm-web/elements";
import {
  LOVELACE_CONVERSION,
  formatNewmAmount,
  formatUsdAmount,
} from "@newm-web/utils";
import { useGetAdaUsdConversionRateQuery } from "../../modules/wallet/api";

interface PurchaseStreamTokensModalProps {
  readonly isLoading: boolean;
  readonly isOpen: boolean;
  readonly numPurchasedTokens: number;
  readonly onClose: VoidFunction;
  readonly onSubmit: VoidFunction;
  readonly percentageOfTotalRoyalties: number;
  readonly pricePerTokenNewm: number;
  readonly pricePerTokenUsd: number;
  readonly totalPurchaseValueNewm: number;
  readonly totalPurchaseValueUsd: number;
}

const PurchaseStreamTokensModal: FunctionComponent<
  PurchaseStreamTokensModalProps
> = ({
  isOpen,
  isLoading,
  percentageOfTotalRoyalties,
  totalPurchaseValueUsd,
  totalPurchaseValueNewm,
  pricePerTokenUsd,
  pricePerTokenNewm,
  numPurchasedTokens,
  onClose,
  onSubmit,
}) => {
  const theme = useTheme();

  const { data: { usdPrice: adaUsdConversionRate = 0 } = {} } =
    useGetAdaUsdConversionRateQuery();
  const { data: { usdPrice: newmUsdConversionRate = 0 } = {} } =
    useGetAdaUsdConversionRateQuery();

  const newmTransactionFeeUsd = 0.5;
  const newmTransactionFeeNewm =
    (newmTransactionFeeUsd * newmUsdConversionRate) / LOVELACE_CONVERSION;
  const adaTransactionFeeAda = 0.4;
  const adaTransactionFeeUsd =
    (adaTransactionFeeAda * adaUsdConversionRate) / LOVELACE_CONVERSION;

  return (
    <Modal
      isCloseButtonVisible={ false }
      isCloseOnClickBackgroundEnabled={ false }
      isOpen={ isOpen }
      onClose={ onClose }
    >
      <Box
        alignItems="center"
        alignSelf="center"
        display="flex"
        flex={ 1 }
        justifyContent="center"
        minWidth={ theme.breakpoints.values.sm }
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
            <Typography variant="body2">
              Stream Token Purchase Summary
            </Typography>

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
                  Stream tokens to purchase
                </Typography>
                <Typography variant="h4">
                  { numPurchasedTokens.toLocaleString() }
                </Typography>
              </Stack>
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">
                  % of Streaming Royalty Rights
                </Typography>
                <Typography variant="h4">
                  { percentageOfTotalRoyalties } %
                </Typography>
              </Stack>

              <HorizontalLine my={ 1.5 } />

              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">
                  Total purchase value
                </Typography>
                <Typography variant="h4">
                  <Typography component="span" mr={ 0.5 } variant="subtitle2">
                    (≈ { formatUsdAmount(totalPurchaseValueUsd, 2) }){ " " }
                  </Typography>
                  { formatNewmAmount(totalPurchaseValueNewm) }
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
                    (≈ { formatUsdAmount(pricePerTokenUsd) }){ " " }
                  </Typography>
                  { formatNewmAmount(pricePerTokenNewm) }
                </Typography>
              </Stack>

              <HorizontalLine my={ 1.5 } />

              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">NEWM fee</Typography>
                <Typography variant="h4">
                  <Typography component="span" mr={ 0.5 } variant="subtitle2">
                    { formatUsdAmount(newmTransactionFeeUsd, 2) }
                  </Typography>
                  { formatNewmAmount(newmTransactionFeeNewm) }
                </Typography>
              </Stack>
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">Transaction fee</Typography>
                <Typography variant="h4">
                  <Typography component="span" mr={ 0.5 } variant="subtitle2">
                    { formatUsdAmount(adaTransactionFeeUsd, 2) }{ " " }
                  </Typography>
                  ₳ { adaTransactionFeeAda }
                </Typography>
              </Stack>
            </Stack>

            <Typography variant="subtitle2">
              Stream tokens may take several minutes to appear in your wallet.
            </Typography>
          </Stack>

          <HorizontalLine />

          <Stack flexDirection="row" gap={ 1 } justifyContent="end" mt={ 1 }>
            <Button
              color="music"
              disabled={ isLoading }
              variant="secondary"
              width="compact"
              onClick={ onClose }
            >
              Cancel
            </Button>
            <Button isLoading={ isLoading } width="compact" onClick={ onSubmit }>
              Buy
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PurchaseStreamTokensModal;
