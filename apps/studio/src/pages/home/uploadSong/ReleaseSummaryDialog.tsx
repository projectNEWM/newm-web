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
import { formatNewmAmount, formatUsdAmount } from "@newm-web/utils";
import { Charli3Logo, CheckCircleRadioIcon } from "@newm-web/assets";
import {
  PaymentType,
  UploadSongThunkRequest,
  useGetMintSongEstimateQuery,
} from "../../../modules/song";
import { openPayPalPopup } from "../../../common/paypalUtils";

interface ReleaseSummaryDialogProps {
  readonly onClose: () => void;
  readonly open: boolean;
}

const ReleaseSummaryDialog: FunctionComponent<ReleaseSummaryDialogProps> = ({
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

  const { data: songEstimate } = useGetMintSongEstimateQuery({
    collaborators: values.owners.length,
  });

  const displayPrices = songEstimate?.mintPaymentOptions?.find(
    (option) => option.paymentType === values.paymentType
  );

  const noDiscountDistributionCost =
    songEstimate?.mintPaymentOptions?.find(
      (option) => option.paymentType === PaymentType.PAYPAL
    )?.dspPriceUsd || songEstimate?.dspPriceUsd;

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFieldValue("paymentType", event.target.value);
  };

  const handleConfirmAndPay = () => {
    if (values.paymentType === PaymentType.PAYPAL) {
      openPayPalPopup(); // opens synchronously; avoids popup blocker
    }
    submitForm(); // your thunk will later navigate the popup to approval URL
  };

  return (
    <Dialog fullWidth={ true } open={ open } onClose={ onClose }>
      <DialogTitle sx={ { pb: 0, pt: 3 } }>
        <Typography fontSize={ 20 } fontWeight={ 800 } variant="body2">
          Release Summary
        </Typography>
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
                    label={ <Typography>Pay with PayPal</Typography> }
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
                <Typography sx={ { color: theme.colors.grey200 } }>
                  Release name
                </Typography>
                <Typography>{ values.title }</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography sx={ { color: theme.colors.grey200 } }>
                  Number of collaborators
                </Typography>
                <Typography>{ values.owners.length }</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography sx={ { color: theme.colors.grey200 } }>
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
                <Typography sx={ { color: theme.colors.grey200 } }>
                  Distribution cost
                </Typography>
                <Stack direction={ "row" } gap={ 1 }>
                  { isNewmPayment ? (
                    <>
                      <Typography variant="subtitle2">
                        (
                        { displayPrices?.dspPrice
                          ? formatNewmAmount(Number(displayPrices?.dspPrice), {
                              includeEstimateSymbol: true,
                              precision: 2,
                            })
                          : "N/A" }
                        )
                      </Typography>
                      <Typography
                        sx={ {
                          textDecoration: "line-through",
                        } }
                      >
                        { noDiscountDistributionCost
                          ? formatUsdAmount(
                              Number(noDiscountDistributionCost),
                              {
                                precision: 2,
                              }
                            )
                          : "N/A" }
                      </Typography>
                      <Typography
                        sx={ {
                          color: theme.colors.green,
                        } }
                      >
                        { displayPrices?.dspPriceUsd
                          ? formatUsdAmount(
                              Number(displayPrices?.dspPriceUsd),
                              {
                                precision: 2,
                              }
                            )
                          : "N/A" }
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="subtitle2">
                        (
                        { displayPrices?.dspPrice
                          ? formatNewmAmount(Number(displayPrices?.dspPrice), {
                              includeEstimateSymbol: true,
                              precision: 2,
                            })
                          : "N/A" }
                        )
                      </Typography>
                      <Typography>
                        { displayPrices?.dspPriceUsd
                          ? formatUsdAmount(
                              Number(displayPrices?.dspPriceUsd),
                              {
                                precision: 2,
                              }
                            )
                          : "N/A" }
                      </Typography>
                    </>
                  ) }
                </Stack>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography sx={ { color: theme.colors.grey200 } }>
                  Stream Token minting
                </Typography>
                <Stack alignItems="center" direction={ "row" } gap={ 1 }>
                  { songEstimate?.mintPriceAda && (
                    <Typography variant="subtitle2">
                      (
                      { displayPrices?.mintPrice
                        ? formatNewmAmount(Number(displayPrices?.mintPrice), {
                            includeEstimateSymbol: true,
                            precision: 2,
                          })
                        : "N/A" }
                      )
                    </Typography>
                  ) }
                  <Typography fontWeight={ 600 }>
                    { displayPrices?.mintPriceUsd
                      ? formatUsdAmount(Number(displayPrices?.mintPriceUsd), {
                          precision: 2,
                        })
                      : "N/A" }
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography sx={ { color: theme.colors.grey200 } }>
                  Royalty splits
                </Typography>
                <Stack alignItems="center" direction={ "row" } gap={ 1 }>
                  { songEstimate?.collabPriceAda && (
                    <Typography variant="subtitle2">
                      (
                      { displayPrices?.collabPrice
                        ? formatNewmAmount(Number(displayPrices?.collabPrice), {
                            includeEstimateSymbol: true,
                            precision: 2,
                          })
                        : "N/A" }
                      )
                    </Typography>
                  ) }
                  <Typography fontWeight={ 600 }>
                    { displayPrices?.collabPriceUsd
                      ? formatUsdAmount(Number(displayPrices?.collabPriceUsd), {
                          precision: 2,
                        })
                      : "N/A" }
                  </Typography>
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
                <Typography fontWeight={ 600 }>Total</Typography>
                <Stack alignItems="center" direction={ "row" } gap={ 1 }>
                  { songEstimate?.adaPrice && (
                    <Typography variant="subtitle2">
                      (
                      { displayPrices?.price
                        ? formatNewmAmount(Number(displayPrices?.price), {
                            includeEstimateSymbol: true,
                            precision: 2,
                          })
                        : "N/A" }
                      )
                    </Typography>
                  ) }
                  <Typography fontWeight={ 600 }>
                    { displayPrices?.priceUsd
                      ? formatUsdAmount(Number(displayPrices?.priceUsd), {
                          precision: 2,
                        })
                      : "N/A" }
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>{ " " }
          <Typography variant="subtitle2">
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
              disabled={ !displayPrices }
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

export default ReleaseSummaryDialog;
