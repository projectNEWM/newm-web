import { FunctionComponent } from "react";
import { useFormikContext } from "formik";
import {
  DialogTitle,
  Typography,
  DialogContent,
  Stack,
  DialogActions,
} from "@mui/material";
import { Charli3Logo } from "@newm-web/assets";
import { HorizontalLine, Button, Dialog } from "@newm-web/elements";
import theme from "@newm-web/theme";
import {
  UploadSongRequest,
  getCollaboratorInfo,
  useGetCollaboratorsQuery,
  useGetMintSongEstimateQuery,
} from "../../../modules/song";
import { formatPriceToDecimal } from "@newm-web/utils";

interface PriceSummaryDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

const PriceSummaryDialog: FunctionComponent<PriceSummaryDialogProps> = ({
  open,
  onClose,
}) => {
  const { values, submitForm } = useFormikContext<UploadSongRequest>();
  const { data: songEstimate } = useGetMintSongEstimateQuery({
    collaborators: values.owners.length,
  });

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
    <Dialog fullWidth={true} onClose={onClose} open={open}>
      <DialogTitle sx={{ pb: 1, pt: 3 }}>
        <Typography fontSize={20} fontWeight={800} variant="body2">
          PAYMENT SUMMARY
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Stack alignItems="center" rowGap={0.5} mt={1.5}>
          <Typography sx={{ color: theme.colors.music }} fontWeight={500}>
            Total amount
          </Typography>
          <Typography variant="h3">
            {formatPriceToDecimal(songEstimate?.adaPrice) || "N/A"}₳
          </Typography>
          <Typography variant="subtitle1">
            ${formatPriceToDecimal(songEstimate?.usdPrice) || "N/A"}
          </Typography>
        </Stack>

        <Stack sx={{ p: "0 48px", rowGap: "8px", mt: "20px" }}>
          <Stack
            alignItems="center"
            columnGap={0.5}
            display="grid"
            gridTemplateColumns={[
              "1fr minmax(52px, max-content)",
              "1fr minmax(120px, max-content)",
            ]}
          >
            <Stack>
              <Typography sx={{ color: theme.colors.grey200 }}>
                Minting
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.colors.grey300 }}
              >
                {`"${values.title}"`}
              </Typography>
            </Stack>
            <Stack rowGap={0.5}>
              <Typography>
                {formatPriceToDecimal(songEstimate?.mintPriceAda) || "N/A"}₳
              </Typography>
              <Typography variant="subtitle1">
                ${formatPriceToDecimal(songEstimate?.mintPriceUsd) || "N/A"}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            alignItems="center"
            display="grid"
            gridTemplateColumns={[
              "1fr minmax(52px, max-content)",
              "1fr minmax(120px, max-content)",
            ]}
            columnGap={0.5}
          >
            <Stack>
              <Typography sx={{ color: theme.colors.grey200 }}>
                Collaborators
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.colors.grey300 }}
              >
                {ownersDisplay}
              </Typography>
            </Stack>
            <Stack rowGap={0.5}>
              <Typography>
                {formatPriceToDecimal(songEstimate?.collabPriceAda) || "N/A"}₳
              </Typography>
              <Typography variant="subtitle1">
                ${formatPriceToDecimal(songEstimate?.collabPriceUsd) || "N/A"}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            alignItems="center"
            columnGap={0.5}
            display="grid"
            gridTemplateColumns={[
              "1fr minmax(52px, max-content)",
              "1fr minmax(120px, max-content)",
            ]}
          >
            <Stack>
              <Typography sx={{ color: theme.colors.grey200 }}>
                Distribution cost
              </Typography>
            </Stack>
            <Stack rowGap={0.5}>
              <Typography>
                {formatPriceToDecimal(songEstimate?.dspPriceAda) || "N/A"}₳
              </Typography>
              <Typography variant="subtitle1">
                ${formatPriceToDecimal(songEstimate?.dspPriceUsd) || "N/A"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack sx={{ p: "12px 24px" }}>
          <HorizontalLine />
        </Stack>

        <Stack
          alignItems="center"
          columnGap={0.5}
          display="grid"
          gridTemplateColumns={[
            "1fr minmax(52px, max-content)",
            "1fr minmax(120px, max-content)",
          ]}
          sx={{ p: "0 48px" }}
        >
          <Stack>
            <Typography>Total</Typography>
          </Stack>
          <Stack rowGap={0.5}>
            <Typography>
              {formatPriceToDecimal(songEstimate?.adaPrice) || "N/A"}₳
            </Typography>
            <Typography variant="subtitle1">
              ${formatPriceToDecimal(songEstimate?.usdPrice) || "N/A"}
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack
          alignItems="center"
          flexDirection={["column", "row"]}
          flexGrow={1}
          flexWrap="wrap"
          justifyContent={["center", "space-between"]}
          p={2}
          rowGap={1}
        >
          <Stack
            alignSelf={[undefined, "flex-end"]}
            columnGap={0.5}
            flexDirection="row"
            order={[1, 0]}
          >
            <Charli3Logo />

            <Typography
              variant="subtitle1"
              sx={{ color: theme.colors.grey200 }}
              fontSize="8px"
            >
              Prices powered by Charli3
            </Typography>
          </Stack>

          <Stack flexDirection="row" columnGap={2}>
            <Button
              color="music"
              onClick={onClose}
              variant="secondary"
              width="compact"
            >
              Cancel
            </Button>
            <Button type="submit" width="compact" onClick={submitForm}>
              Confirm & Pay
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default PriceSummaryDialog;
