import { FunctionComponent } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button, HorizontalLine, Modal } from "@newm-web/elements";
import {
  formatAdaAmount,
  formatNewmAmount,
  formatUsdAmount,
} from "@newm-web/utils";

interface PurchaseStreamTokensModalProps {
  readonly isLoading: boolean;
  readonly isOpen: boolean;
  readonly onClose: VoidFunction;
  readonly onSubmit: VoidFunction;
  readonly transactionFeeInADA: number;
  readonly transactionFeeInUSD: number;
  readonly unclaimedEarningsInNEWM: number;
  readonly unclaimedEarningsInUSD: number;
}

const EarningsSummaryModal: FunctionComponent<
  PurchaseStreamTokensModalProps
> = ({
  isOpen,
  isLoading,
  onClose,
  onSubmit,
  unclaimedEarningsInNEWM,
  unclaimedEarningsInUSD,
  transactionFeeInADA,
  transactionFeeInUSD,
}) => {
  const theme = useTheme();

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
            <Typography variant="body2">Earnings Claiming Summary</Typography>

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
                <Typography variant="subtitle1">Earnings</Typography>
                <Typography variant="h4">
                  <Typography component="span" mr={ 0.5 } variant="subtitle2">
                    (
                    { formatUsdAmount(unclaimedEarningsInUSD, {
                      includeEstimateSymbol: true,
                    }) }
                    ){ " " }
                  </Typography>
                  { formatNewmAmount(unclaimedEarningsInNEWM) }
                </Typography>
              </Stack>
              <HorizontalLine my={ 2 } />
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">Transaction fee</Typography>
                <Typography variant="h4">
                  <Typography component="span" mr={ 0.5 } variant="subtitle2">
                    (
                    { formatUsdAmount(transactionFeeInUSD, {
                      includeEstimateSymbol: true,
                    }) }
                    ){ " " }
                  </Typography>
                  { formatAdaAmount(transactionFeeInADA, {
                    includeCurrencySymbol: false,
                  }) }{ " " }
                  ₳
                </Typography>
              </Stack>
            </Stack>
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
              Confirm & Claim
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EarningsSummaryModal;
