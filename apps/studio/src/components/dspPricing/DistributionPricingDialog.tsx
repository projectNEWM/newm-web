import { Button, Dialog } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { LocalStorage, formatUsdAmount } from "@newm-web/utils";
import {
  Box,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Check } from "@mui/icons-material";
import { LocalStorageKey, PaymentType } from "@newm-web/types";
import { FunctionComponent } from "react";
import { useUpdateProfileThunk } from "../../modules/session";
import { useGetMintSongEstimateQuery } from "../../modules/song";

interface DistributionPricingDialogProps {
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
  readonly open: boolean;
}

/**
 * Allows users to select a pricing plan for music distribution.
 */
const DistributionPricingDialog: FunctionComponent<
  DistributionPricingDialogProps
> = ({ onCancel, onConfirm, open }) => {
  const [updateProfile, { isLoading }] = useUpdateProfileThunk();

  const handleOptionClick = () => {
    updateProfile({ dspPlanSubscribed: true }).then(() => {
      LocalStorage.setItem(LocalStorageKey.isStudioPricingPlanAccepted, "true");
      onConfirm();
    });
  };

  const { data: { mintPaymentOptions } = {} } = useGetMintSongEstimateQuery({
    collaborators: 1,
  });

  const dspPriceUsd = mintPaymentOptions?.find(
    (option) => option.paymentType === PaymentType.PAYPAL
  )?.dspPriceUsd;

  const dspFormattedPricingUsd = formatUsdAmount(Number(dspPriceUsd), {
    precision: 2,
    returnZeroValue: false,
  });

  const pricingPlanCriteria = [
    { text: "Distribute your music to 130+ global platforms" },
    {
      highlight: "20% discount",
      highlightColor: theme.colors.baseGreen,
      text: "for paying in $NEWM Tokens",
    },
    { text: "Automate royalty splits" },
    { text: "Free EAN Release Code & ISRC generation" },
    { text: "Add and manage release collaborators" },
    { text: "Customize your artist profile" },
    { text: "Track catalog status" },
    { text: "Sell music rights to your fans on the NEWM Marketplace!" },
  ];

  return (
    <Dialog
      maxWidth="xs"
      open={ open }
      sx={ {
        "& .MuiPaper-root": {
          backgroundColor: theme.colors.grey600,
          border: `1px solid ${theme.colors.grey400}`,
          borderRadius: "12px",
          gap: 3.75,
          maxWidth: "430px",
          padding: [2, 4],
        },
      } }
      fullWidth
      onClose={ onCancel }
    >
      <DialogContent sx={ { p: 0 } }>
        <Stack
          sx={ {
            alignItems: "center",
            display: "flex",
            flex: 1,
            gap: 3.75,
          } }
        >
          <Stack sx={ { gap: 2 } } textAlign="center">
            <Typography
              sx={ {
                display: "flex",
                flexDirection: "column",
                fontWeight: 700,
                gap: 0.5,
              } }
              variant="h4"
            >
              <Box> { dspFormattedPricingUsd } / RELEASE</Box>
            </Typography>

            <Stack>
              <Typography variant="h2">Your music, your way</Typography>
              <Typography
                sx={ {
                  color: theme.colors.grey100,
                  fontWeight: 500,
                  maxWidth: "420px",
                } }
                variant="subtitle1"
              >
                Pay once to distribute and keep 100% of your future royalties!
              </Typography>
            </Stack>
          </Stack>

          <Stack gap={ 1 } sx={ { maxWidth: "420px", width: "100%" } }>
            { pricingPlanCriteria.map((criterion, index) => (
              <Box
                key={ index }
                sx={ {
                  display: "flex",
                  flexDirection: "row",
                  gap: 1.5,
                } }
              >
                <Check sx={ { color: theme.colors.baseGreen } } />

                <Typography
                  alignSelf={ "center" }
                  fontWeight={ 500 }
                  variant="body1"
                >
                  { criterion.highlight ? (
                    <>
                      <Box
                        component="span"
                        sx={ { color: criterion.highlightColor } }
                      >
                        { criterion.highlight }
                      </Box>
                      { " " + criterion.text }
                    </>
                  ) : (
                    criterion.text
                  ) }
                </Typography>
              </Box>
            )) }
          </Stack>

          <Divider color={ theme.colors.grey400 } sx={ { width: "70%" } } />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={ {
          // Override MUI default DialogActions gap/margin on last button
          "& > :not(:first-of-type)": {
            marginLeft: 0,
          },
          flexDirection: "column",
          gap: 3.75,
          justifyContent: "center",
          p: 0,
        } }
      >
        <Button isLoading={ isLoading } onClick={ handleOptionClick }>
          Get started
        </Button>
        <Button
          color="music"
          isLoading={ isLoading }
          variant="secondary"
          onClick={ onCancel }
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DistributionPricingDialog;
