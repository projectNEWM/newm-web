import { FunctionComponent, useEffect } from "react";
import { useFormikContext } from "formik";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Button, Dialog, HorizontalLine } from "@newm-web/elements";
import theme from "@newm-web/theme";
import {
  LOVELACE_CONVERSION,
  formatNewmAmount,
  formatUsdAmount,
} from "@newm-web/utils";
import { Charli3Logo, CheckCircleRadioIcon } from "@newm-web/assets";
import { PaymentType } from "@newm-web/types";
import {
  UploadSongThunkRequest,
  useGetMintSongEstimateQuery,
} from "../../../modules/song";

import { useGetNewmUsdConversionRateQuery } from "../../../modules/crypto";
import { openPayPalPopup } from "../../../common/paypalUtils";

interface OrderSummaryDialogProps {
  readonly onClose: () => void;
  readonly open: boolean;
}

const OrderSummaryDialog: FunctionComponent<OrderSummaryDialogProps> = ({
  open,
  onClose,
}) => {
  const { values, submitForm, setFieldValue } =
    useFormikContext<UploadSongThunkRequest>();

  useEffect(() => {
    if (values.paymentType === PaymentType.ADA) {
      setFieldValue("paymentType", PaymentType.NEWM);
    }
  }, [setFieldValue, values.paymentType]);

  const isNewmPayment = values.paymentType === PaymentType.NEWM;
  const isPaypalPayment = values.paymentType === PaymentType.PAYPAL;

  const { data: songEstimate, isError: isSongEstimateError } =
    useGetMintSongEstimateQuery(
      {
        collaborators: values.owners.length,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const { data: { usdPrice: newmiesUsdConversionRate = 0 } = {} } =
    useGetNewmUsdConversionRateQuery();

  const songEstimatePrices = songEstimate?.mintPaymentOptions?.find(
    (option) => option.paymentType === values.paymentType
  );

  const newmUsdConversionRate = newmiesUsdConversionRate / LOVELACE_CONVERSION;

  const convertUsdToNewm = (usdValue?: string) => {
    if (!usdValue || !newmUsdConversionRate) return undefined;
    return Number(usdValue) / newmUsdConversionRate;
  };

  const displayPrices = {
    collabPriceNewm: formatNewmAmount(
      isPaypalPayment
        ? Number(convertUsdToNewm(songEstimatePrices?.collabPrice))
        : Number(songEstimatePrices?.collabPrice),
      {
        includeEstimateSymbol: true,
        precision: 2,
        returnZeroValue: false,
      }
    ),
    collabPriceUsd: formatUsdAmount(
      Number(songEstimatePrices?.collabPriceUsd),
      {
        precision: 2,
        returnZeroValue: false,
      }
    ),
    dspPriceNewm: formatNewmAmount(
      isPaypalPayment
        ? Number(convertUsdToNewm(songEstimatePrices?.dspPrice))
        : Number(songEstimatePrices?.dspPrice),
      {
        includeEstimateSymbol: true,
        precision: 2,
        returnZeroValue: false,
      }
    ),
    dspPriceUsd: formatUsdAmount(Number(songEstimatePrices?.dspPriceUsd), {
      precision: 2,
      returnZeroValue: false,
    }),
    mintPriceNewm: formatNewmAmount(
      isPaypalPayment
        ? Number(convertUsdToNewm(songEstimatePrices?.mintPrice))
        : Number(songEstimatePrices?.mintPrice),
      {
        includeEstimateSymbol: true,
        precision: 2,
        returnZeroValue: false,
      }
    ),
    mintPriceUsd: formatUsdAmount(Number(songEstimatePrices?.mintPriceUsd), {
      precision: 2,
      returnZeroValue: false,
    }),
    priceNewm: formatNewmAmount(
      isPaypalPayment
        ? Number(convertUsdToNewm(songEstimatePrices?.price))
        : Number(songEstimatePrices?.price),
      {
        includeEstimateSymbol: true,
        precision: 2,
        returnZeroValue: false,
      }
    ),
    priceUsd: formatUsdAmount(Number(songEstimatePrices?.priceUsd), {
      precision: 2,
      returnZeroValue: false,
    }),
  };

  const noDiscountDistributionCost = formatUsdAmount(
    Number(
      songEstimate?.mintPaymentOptions?.find(
        (option) => option.paymentType === PaymentType.PAYPAL
      )?.dspPriceUsd
    ),
    {
      precision: 2,
      returnZeroValue: false,
    }
  );

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFieldValue("paymentType", event.target.value);
  };

  const handleConfirmAndPay = () => {
    if (values.paymentType === PaymentType.PAYPAL) {
      openPayPalPopup(); // opens synchronously; avoids popup blocker
    }
    submitForm(); // will later navigate the paypal popup to the approval URL
  };

  return (
    <Dialog fullWidth={ true } open={ open } onClose={ onClose }>
      <DialogTitle sx={ { pb: 0, pt: 3 } } variant="body2">
        Order Summary
      </DialogTitle>

      <DialogContent sx={ { pb: 2, px: 3 } }>
        <Stack>
          { /* Payment Method Selection */ }
          <Stack py={ 2 }>
            <FormControl component="fieldset">
              <RadioGroup
                value={ values.paymentType }
                onChange={ handlePaymentMethodChange }
              >
                <Stack direction="row" width="100%">
                  { /* NEWM payment option */ }

                  <FormControlLabel
                    control={
                      <Radio
                        checkedIcon={ <CheckCircleRadioIcon /> }
                        size="small"
                        sx={ {
                          color: theme.colors.grey400,
                        } }
                      />
                    }
                    label={
                      <Stack>
                        <Typography
                          fontWeight={ theme.typography.fontWeightMedium }
                        >
                          Pay with $NEWM
                        </Typography>
                        <Typography
                          color={ theme.colors.green }
                          fontWeight={ theme.typography.fontWeightRegular }
                        >
                          20% discount
                        </Typography>
                      </Stack>
                    }
                    sx={ {
                      background: isNewmPayment
                        ? theme.gradients.activeBackground
                        : theme.colors.grey600,
                      border: `2px solid ${theme.colors.grey500}`,
                      borderBottomLeftRadius: 8,
                      borderImage: isNewmPayment
                        ? theme.gradients.activeBackground
                        : null,
                      borderImageSlice: 1,
                      borderRight: !isNewmPayment ? "none" : undefined,
                      borderTopLeftRadius: 8,
                      flex: 1,
                      margin: 0,
                      px: 1.5,
                      py: 1,
                    } }
                    value={ PaymentType.NEWM }
                  />

                  { /* Paypal payment option */ }

                  <FormControlLabel
                    control={
                      <Radio
                        checkedIcon={ <CheckCircleRadioIcon /> }
                        size="small"
                        sx={ {
                          color: theme.colors.grey400,
                        } }
                      />
                    }
                    label={
                      <Typography
                        fontWeight={ theme.typography.fontWeightMedium }
                      >
                        Pay with PayPal, Credit, or Debit Card
                      </Typography>
                    }
                    sx={ {
                      background: isPaypalPayment
                        ? theme.gradients.activeBackground
                        : theme.colors.grey600,
                      border: `2px solid ${theme.colors.grey500}`,
                      borderBottomRightRadius: 8,
                      borderImage: isPaypalPayment
                        ? theme.gradients.activeBackground
                        : null,
                      borderImageSlice: 1,
                      borderLeft: !isPaypalPayment ? "none" : undefined,
                      borderTopRightRadius: 8,
                      flex: 1,
                      margin: 0,
                      px: 1.5,
                      py: 1,
                    } }
                    value={ PaymentType.PAYPAL }
                  />
                </Stack>
              </RadioGroup>
            </FormControl>
          </Stack>
          <Stack gap={ 1 }>
            { /* Release Details */ }

            <Stack
              sx={ {
                backgroundColor: theme.colors.grey600,
                borderRadius: 1,
                gap: 0.5,
                p: 1.5,
              } }
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={ {
                    color: theme.colors.grey200,
                    fontWeight: theme.typography.fontWeightRegular,
                  } }
                >
                  Release name
                </Typography>
                <Typography>{ values.title }</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={ {
                    color: theme.colors.grey200,
                    fontWeight: theme.typography.fontWeightRegular,
                  } }
                >
                  Number of collaborators
                </Typography>
                <Typography>{ values.owners.length }</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={ {
                    color: theme.colors.grey200,
                    fontWeight: theme.typography.fontWeightRegular,
                  } }
                >
                  Release date
                </Typography>
                <Typography>
                  { values.releaseDate
                    ? new Date(values.releaseDate).toLocaleDateString()
                    : new Date().toLocaleDateString() }
                </Typography>
              </Stack>
            </Stack>

            { /* Cost Breakdown */ }

            <Stack
              sx={ {
                backgroundColor: theme.colors.grey600,
                borderRadius: 1,
                gap: 0.5,
                p: 1.5,
              } }
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={ {
                    color: theme.colors.grey200,
                    fontWeight: theme.typography.fontWeightRegular,
                  } }
                >
                  Distribution cost
                </Typography>
                <Stack direction={ "row" } gap={ 1 }>
                  { isNewmPayment ? (
                    <>
                      <Typography variant="subtitle2">
                        ({ displayPrices.dspPriceNewm })
                      </Typography>
                      <Typography
                        sx={ {
                          textDecoration: "line-through",
                        } }
                      >
                        { noDiscountDistributionCost }
                      </Typography>
                      <Typography
                        sx={ {
                          color: theme.colors.green,
                        } }
                      >
                        { displayPrices.dspPriceUsd }
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="subtitle2">
                        ({ displayPrices.dspPriceNewm })
                      </Typography>
                      <Typography>{ displayPrices.dspPriceUsd }</Typography>
                    </>
                  ) }
                </Stack>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={ {
                    color: theme.colors.grey200,
                    fontWeight: theme.typography.fontWeightRegular,
                  } }
                >
                  Stream Token minting
                </Typography>
                <Stack alignItems="center" direction={ "row" } gap={ 1 }>
                  {
                    <Typography variant="subtitle2">
                      ({ displayPrices.mintPriceNewm })
                    </Typography>
                  }
                  <Typography>{ displayPrices.mintPriceUsd }</Typography>
                </Stack>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={ {
                    color: theme.colors.grey200,
                    fontWeight: theme.typography.fontWeightRegular,
                  } }
                >
                  Royalty splits
                </Typography>
                <Stack alignItems="center" direction={ "row" } gap={ 1 }>
                  {
                    <Typography variant="subtitle2">
                      ({ displayPrices.collabPriceNewm })
                    </Typography>
                  }
                  <Typography>{ displayPrices.collabPriceUsd }</Typography>
                </Stack>
              </Stack>
            </Stack>

            { /* Total */ }

            <Stack
              sx={ {
                backgroundColor: theme.colors.grey600,
                borderRadius: 1,
                p: 1.5,
              } }
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography>Total</Typography>
                <Stack alignItems="center" direction={ "row" } gap={ 1 }>
                  {
                    <Typography variant="subtitle2">
                      ({ displayPrices.priceNewm })
                    </Typography>
                  }
                  <Typography>{ displayPrices.priceUsd }</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Typography mt={ 0.5 } variant="subtitle2">
            Total does not include the Cardano blockchain network fee. Fee
            prices are not guaranteed, costs may vary.
          </Typography>
        </Stack>
      </DialogContent>

      <Stack>
        <HorizontalLine />
      </Stack>

      <DialogActions sx={ { p: 0 } }>
        <Stack
          alignItems="center"
          flexDirection={ ["column", "row"] }
          flexGrow={ 1 }
          flexWrap="wrap"
          justifyContent={ ["center", "space-between"] }
          px={ 3 }
          py={ 1.5 }
        >
          <Stack
            alignSelf={ [undefined, "flex-end"] }
            columnGap={ 0.5 }
            flexDirection="row"
            order={ [1, 0] }
          >
            <Charli3Logo />

            <Typography
              fontSize="8px"
              sx={ { color: theme.colors.grey200 } }
              variant="subtitle1"
            >
              Prices powered by Charli3
            </Typography>
          </Stack>
          <Stack columnGap={ 1.5 } flexDirection="row">
            <Button
              color="music"
              variant="secondary"
              width="compact"
              onClick={ onClose }
            >
              Cancel
            </Button>
            <Button
              disabled={ isSongEstimateError }
              type="button"
              width="compact"
              onClick={ handleConfirmAndPay }
            >
              Confirm & Pay
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default OrderSummaryDialog;
