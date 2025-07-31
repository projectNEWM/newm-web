import { FunctionComponent } from "react";
import { useFormikContext } from "formik";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { Charli3Logo } from "@newm-web/assets";
import { Button, Dialog, HorizontalLine } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { formatPriceToDecimal } from "@newm-web/utils";
import {
  PaymentType,
  UploadSongThunkRequest,
  getCollaboratorInfo,
  useGetCollaboratorsQuery,
  useGetMintSongEstimateQuery,
} from "../../../modules/song";

interface PriceSummaryDialogProps {
  readonly onClose: () => void;
  readonly open: boolean;
}

const PriceSummaryDialog: FunctionComponent<PriceSummaryDialogProps> = ({
  open,
  onClose,
}) => {
  const { values, submitForm } = useFormikContext<UploadSongThunkRequest>();

  const { data: songEstimate } = useGetMintSongEstimateQuery({
    collaborators: values.owners.length,
  });

  const displayPrices = songEstimate?.mintPaymentOptions?.find(
    (option) => option.paymentType === PaymentType.ADA
  );

  const ownerEmails = values.owners.map((owner) => owner.email);

  const { data: owners } = useGetCollaboratorsQuery(
    {
      emails: ownerEmails,
    },
    {
      skip: !ownerEmails.length,
    }
  );

  const ownersDisplay = values.owners
    ?.map((owner) => {
      const collaboratorInfo = getCollaboratorInfo(owner.email, owners);

      if (!collaboratorInfo.email) {
        return owner.email;
      }

      const displayName =
        collaboratorInfo.firstName + " " + collaboratorInfo.lastName;

      return displayName.trim() || owner.email;
    })
    .join(", ") // join names with commas
    .replace(/, ([^,]*)$/, " & $1"); // replace last comma with an ampersand

  return (
    <Dialog fullWidth={ true } open={ open } onClose={ onClose }>
      <DialogTitle sx={ { pb: 1, pt: 3 } }>
        <Typography fontSize={ 20 } fontWeight={ 800 } variant="body2">
          PAYMENT SUMMARY
        </Typography>
      </DialogTitle>
      <DialogContent sx={ { p: 0 } }>
        <Stack alignItems="center" mt={ 1.5 } rowGap={ 0.5 }>
          <Typography fontWeight={ 500 } sx={ { color: theme.colors.music } }>
            Total amount
          </Typography>
          <Typography variant="h3">
            ₳{ formatPriceToDecimal(displayPrices?.price) || "N/A" }
          </Typography>
          <Typography variant="subtitle1">
            ${ formatPriceToDecimal(displayPrices?.priceUsd) || "N/A" }
          </Typography>
        </Stack>

        <Stack sx={ { mt: "20px", p: "0 48px", rowGap: "8px" } }>
          <Stack
            alignItems="center"
            columnGap={ 0.5 }
            display="grid"
            gridTemplateColumns={ [
              "1fr minmax(52px, max-content)",
              "1fr minmax(120px, max-content)",
            ] }
          >
            <Stack>
              <Typography sx={ { color: theme.colors.grey200 } }>
                Minting
              </Typography>
              <Typography
                sx={ { color: theme.colors.grey300 } }
                variant="subtitle1"
              >
                { `"${values.title}"` }
              </Typography>
            </Stack>
            <Stack rowGap={ 0.5 }>
              <Typography>
                ₳{ formatPriceToDecimal(displayPrices?.mintPrice) || "N/A" }
              </Typography>
              <Typography variant="subtitle1">
                ${ formatPriceToDecimal(displayPrices?.mintPriceUsd) || "N/A" }
              </Typography>
            </Stack>
          </Stack>
          <Stack
            alignItems="center"
            columnGap={ 0.5 }
            display="grid"
            gridTemplateColumns={ [
              "1fr minmax(52px, max-content)",
              "1fr minmax(120px, max-content)",
            ] }
          >
            <Stack>
              <Typography sx={ { color: theme.colors.grey200 } }>
                Collaborators
              </Typography>
              <Typography
                sx={ { color: theme.colors.grey300 } }
                variant="subtitle1"
              >
                { ownersDisplay }
              </Typography>
            </Stack>
            <Stack rowGap={ 0.5 }>
              <Typography>
                ₳{ formatPriceToDecimal(displayPrices?.collabPrice) || "N/A" }
              </Typography>
              <Typography variant="subtitle1">
                ${ formatPriceToDecimal(displayPrices?.collabPriceUsd) || "N/A" }
              </Typography>
            </Stack>
          </Stack>
          <Stack
            alignItems="center"
            columnGap={ 0.5 }
            display="grid"
            gridTemplateColumns={ [
              "1fr minmax(52px, max-content)",
              "1fr minmax(120px, max-content)",
            ] }
          >
            <Stack>
              <Typography sx={ { color: theme.colors.grey200 } }>
                Distribution cost
              </Typography>
            </Stack>
            <Stack rowGap={ 0.5 }>
              <Typography>
                ₳{ formatPriceToDecimal(displayPrices?.dspPrice) || "N/A" }
              </Typography>
              <Typography variant="subtitle1">
                ${ formatPriceToDecimal(displayPrices?.dspPriceUsd) || "N/A" }
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack sx={ { p: "12px 24px" } }>
          <HorizontalLine />
        </Stack>

        <Stack
          alignItems="center"
          columnGap={ 0.5 }
          display="grid"
          gridTemplateColumns={ [
            "1fr minmax(52px, max-content)",
            "1fr minmax(120px, max-content)",
          ] }
          sx={ { p: "0 48px" } }
        >
          <Stack>
            <Typography>Total</Typography>
          </Stack>
          <Stack rowGap={ 0.5 }>
            <Typography>
              ₳{ formatPriceToDecimal(displayPrices?.price) || "N/A" }
            </Typography>
            <Typography variant="subtitle1">
              ${ formatPriceToDecimal(displayPrices?.priceUsd) || "N/A" }
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack
          alignItems="center"
          flexDirection={ ["column", "row"] }
          flexGrow={ 1 }
          flexWrap="wrap"
          justifyContent={ ["center", "space-between"] }
          p={ 2 }
          rowGap={ 1 }
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

          <Stack columnGap={ 2 } flexDirection="row">
            <Button
              color="music"
              variant="secondary"
              width="compact"
              onClick={ onClose }
            >
              Cancel
            </Button>
            <Button type="submit" width="compact" onClick={ submitForm }>
              Confirm & Pay
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default PriceSummaryDialog;
