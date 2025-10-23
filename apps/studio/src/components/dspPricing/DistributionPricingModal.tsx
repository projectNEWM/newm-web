import { Button, Dialog } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { LocalStorage, formatPriceToDecimal } from "@newm-web/utils";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import { LocalStorageKey } from "@newm-web/types";
import { FunctionComponent } from "react";
import { useUpdateProfileThunk } from "../../modules/session";
import { useGetMintSongEstimateQuery } from "../../modules/song";

interface DistributionPricingModalProps {
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
  readonly open: boolean;
}

// TODO: Verify if Modal or Dialog component is more appropriate for UX, general Modal def is the UX necessary here
// TODO: Add figma changes to this component

/**
 * Allows users to select a pricing plan.
 */
const DistributionPricingModal: FunctionComponent<
  DistributionPricingModalProps
> = ({ onCancel, onConfirm, open }) => {
  const [updateProfile, { isLoading }] = useUpdateProfileThunk();

  const handleOptionClick = () => {
    updateProfile({ dspPlanSubscribed: true }).then(() => {
      LocalStorage.setItem(LocalStorageKey.isStudioPricingPlanAccepted, "true");
      onConfirm();
    });
  };

  const {
    data: {
      dspPriceAda,
      dspPriceUsd,
      mintPriceAda,
      collabPerArtistPriceAda,
    } = {},
  } = useGetMintSongEstimateQuery({
    collaborators: 1,
  });

  const dspFormattedPricingUsd = dspPriceUsd
    ? `$${formatPriceToDecimal(dspPriceUsd)}/RELEASE`
    : "N/A";

  const dspFormattedPricingAda = dspPriceAda
    ? `(≈₳${formatPriceToDecimal(dspPriceAda)}/RELEASE)`
    : undefined;

  const collabFormattedPricing = collabPerArtistPriceAda
    ? ` (≈₳${formatPriceToDecimal(collabPerArtistPriceAda, 1)}/each)`
    : "";

  const totalMintFormattedPricing =
    mintPriceAda && collabPerArtistPriceAda
      ? ` (≈₳${formatPriceToDecimal(
          String(
            parseFloat(mintPriceAda) + parseFloat(collabPerArtistPriceAda)
          ),
          1
        )}/release)`
      : "";

  const pricingPlanCriteria = [
    "Customize artist profile",
    "Track catalog status",
    "Accept/decline collaborations",
    "Connect wallet to receive royalty splits",
    "View collaborator details",
    "Upload your music",
    `Invite collaborators${collabFormattedPricing}`,
    "Free EAN barcode & ISRCs",
    "Distribute music to 130+ global platforms",
    `Mint music${totalMintFormattedPricing}`,
    "Automate royalty splits to collaborators",
    "List your music on NEWMMarketplace (coming soon)",
  ];

  return (
    <Dialog
      open={ open }
      sx={ {
        "& .MuiPaper-root": {
          backgroundColor: theme.colors.grey600,
          border: `1px solid ${theme.colors.grey400}`,
          borderRadius: "12px",
        },

        height: "100%",
      } }
      onClose={ onCancel }
    >
      <Box
        sx={ {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 5,
          position: "relative",
          [theme.breakpoints.down("xl")]: { paddingX: 2 },
        } }
      >
        <Stack
          sx={ {
            alignItems: "center",
            display: "flex",
            flex: 1,
            gap: 4,
          } }
        >
          <Stack textAlign="center">
            <Typography
              sx={ {
                display: "flex",
                flexDirection: "column",
                fontWeight: 700,
                height: "40px",
                justifyContent: "center",
                pb: 4,
              } }
              variant="h4"
            >
              <Box>
                <Box
                  component="span"
                  sx={ { mr: 1, textDecoration: "line-through" } }
                >
                  $14/RELEASE
                </Box>
                { dspFormattedPricingUsd }
              </Box>
              <Typography variant="subtitle1">
                { dspFormattedPricingAda }
              </Typography>
            </Typography>

            <Stack>
              <Typography variant="h2">The Artist</Typography>
              <Typography
                sx={ {
                  fontWeight: 500,
                  [theme.breakpoints.up("lg")]: { height: "48px" },
                  width: ["auto", "320px"],
                } }
                variant="subtitle1"
              >
                Release your music with NEWM and ensure correct royalty splits.
              </Typography>
            </Stack>
          </Stack>

          <Stack gap={ 1.25 }>
            { pricingPlanCriteria.map((criterion, index) => (
              <Stack
                key={ index }
                sx={ {
                  display: "flex",
                  flexDirection: "row",
                  gap: 1.5,
                  [theme.breakpoints.down("xl")]: { paddingX: 3 },
                } }
              >
                <Check sx={ { color: theme.colors.green } } />

                <Typography
                  alignSelf={ "center" }
                  fontWeight={ 500 }
                  variant="body1"
                >
                  { criterion }
                </Typography>
              </Stack>
            )) }
          </Stack>

          <Divider color={ theme.colors.grey400 } sx={ { width: "70%" } } />
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
        </Stack>
      </Box>
    </Dialog>
  );
};

export default DistributionPricingModal;
