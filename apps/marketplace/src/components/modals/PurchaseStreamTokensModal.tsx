import { FunctionComponent, useState } from "react";
import {
  Box,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import {
  Button,
  Checkbox,
  HorizontalLine,
  Modal,
  Tooltip,
} from "@newm-web/elements";
import {
  LOVELACE_CONVERSION,
  NEWM_TERMS_OF_SERVICE_URL,
  TRANSACTION_FEE_IN_ADA,
  formatNewmAmount,
  formatUsdAmount,
} from "@newm-web/utils";
import { useGetNewmUsdConversionRateQuery } from "../../modules/wallet";
import { useGetOrderFeesQuery } from "../../modules/sale";

interface PurchaseStreamTokensModalProps {
  readonly isLoading: boolean;
  readonly isOpen: boolean;
  readonly numPurchasedTokens: number;
  readonly onClose: VoidFunction;
  readonly onSubmit: VoidFunction;
  readonly percentageOfTotalRoyalties: number;
  readonly songTitle: string;
  readonly tokenAgreementUrl: string;
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
  tokenAgreementUrl,
  numPurchasedTokens,
  onClose,
  songTitle,
  onSubmit,
}) => {
  const theme = useTheme();
  const [agreesToContractAndConditions, setAgreesToContractAndConditions] =
    useState(false);

  const { data: { usdPrice: newmUsdConversionRate = 0 } = {} } =
    useGetNewmUsdConversionRateQuery();
  const { data: { serviceFeePercentage = 0, profitAmountUsd = 0 } = {} } =
    useGetOrderFeesQuery();

  const newmTransactionFeeNewm =
    profitAmountUsd / (newmUsdConversionRate / LOVELACE_CONVERSION);
  const serviceFeeUsd = totalPurchaseValueUsd * (serviceFeePercentage / 100);
  const serviceFeeNewm = totalPurchaseValueNewm * (serviceFeePercentage / 100);
  const totalUsd = totalPurchaseValueUsd + serviceFeeUsd + profitAmountUsd;
  const totalNewm =
    totalPurchaseValueNewm + serviceFeeNewm + newmTransactionFeeNewm;

  const handleCheckboxChange = () => {
    setAgreesToContractAndConditions(!agreesToContractAndConditions);
  };

  const handleClose = () => {
    setAgreesToContractAndConditions(false);
    onClose();
  };

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
        maxWidth={ theme.breakpoints.values.sm }
        minWidth={ theme.breakpoints.values.xs }
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
          <Stack gap={ 0.5 } textAlign="start">
            <Typography variant="body2">Stream Token Order Summary</Typography>

            <Stack
              sx={ {
                backgroundColor: theme.colors.grey600,
                gap: 0.5,
                mt: 1.5,
                p: 1.5,
              } }
            >
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">Song name</Typography>
                <Typography variant="h4">{ songTitle }</Typography>
              </Stack>
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">
                  Amount of Stream Tokens
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
            </Stack>
            <Stack
              sx={ {
                backgroundColor: theme.colors.grey600,
                gap: 0.5,
                mt: 1.5,
                p: 1.5,
              } }
            >
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">Market price</Typography>
                <Typography variant="h4">
                  <Typography component="span" mr={ 0.5 } variant="subtitle2">
                    (
                    { formatUsdAmount(totalPurchaseValueUsd, {
                      includeEstimateSymbol: true,
                    }) }
                    ){ " " }
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
                  Service fee
                  <Tooltip
                    title={
                      "This fee covers our costs associated with tech " +
                      "development, maintenance and operational expenses."
                    }
                  >
                    <IconButton sx={ { padding: 0, pl: 0.5 } }>
                      <HelpIcon
                        fontSize="small"
                        sx={ { color: theme.colors.grey100 } }
                      />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Typography variant="h4">
                  <Typography component="span" mr={ 0.5 } variant="subtitle2">
                    (
                    { formatUsdAmount(serviceFeeUsd, {
                      includeEstimateSymbol: true,
                    }) }
                    ){ " " }
                  </Typography>
                  { formatNewmAmount(serviceFeeNewm) }
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
                    (
                    { formatUsdAmount(profitAmountUsd, {
                      includeEstimateSymbol: true,
                    }) }
                    ){ " " }
                  </Typography>
                  { formatNewmAmount(newmTransactionFeeNewm) }
                </Typography>
              </Stack>

              <HorizontalLine my={ 1.5 } />

              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography>Total</Typography>
                <Typography variant="h4">
                  <Typography component="span" mr={ 0.5 } variant="subtitle2">
                    (
                    { formatUsdAmount(totalUsd, { includeEstimateSymbol: true }) }
                    ){ " " }
                  </Typography>
                  { formatNewmAmount(totalNewm) }
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="subtitle2">
              { `Total does not include the network fee (≈ ${TRANSACTION_FEE_IN_ADA} ADA) for using the
              Cardano blockchain. Fee prices are not guaranteed, costs may vary.
              Stream tokens may take several minutes to appear in the wallet.` }
            </Typography>
          </Stack>

          <Stack
            alignItems="center"
            flexDirection="row"
            sx={ { backgroundColor: theme.colors.grey600, p: 1.5 } }
          >
            <Checkbox
              aria-checked={ agreesToContractAndConditions }
              checked={ agreesToContractAndConditions }
              label={
                <Typography
                  color="white"
                  fontSize="12px"
                  fontWeight={ 400 }
                  textAlign="left"
                  variant="subtitle1"
                >
                  I have read the{ " " }
                  <Link
                    href={ tokenAgreementUrl }
                    rel="noopener noreferrer"
                    style={ { color: theme.colors.music } }
                    sx={ { fontSize: "12px", width: "fit-content" } }
                    target="_blank"
                    variant="h4"
                  >
                    stream token contract{ " " }
                  </Link>
                  and agree to its{ " " }
                  <Link
                    color={ theme.colors.music }
                    href={ NEWM_TERMS_OF_SERVICE_URL }
                    rel="noopener noreferrer"
                    style={ { color: theme.colors.music } }
                    sx={ { fontSize: "12px", width: "fit-content" } }
                    target="_blank"
                    variant="h4"
                  >
                    Terms and Conditions.
                  </Link>{ " " }
                </Typography>
              }
              name="agreeToContractAndConditions"
              onChange={ handleCheckboxChange }
            />
          </Stack>

          <HorizontalLine mt={ 1 } />

          <Stack flexDirection="row" gap={ 1 } justifyContent="end">
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
              disabled={ !agreesToContractAndConditions }
              isLoading={ isLoading }
              width="compact"
              onClick={ onSubmit }
            >
              Buy
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PurchaseStreamTokensModal;
