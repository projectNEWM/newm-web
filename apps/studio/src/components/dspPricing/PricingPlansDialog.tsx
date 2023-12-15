import { Button, Dialog } from "@newm-web/elements";
import theme from "@newm-web/theme";
import { useGetMintSongEstimateQuery } from "../../modules/song";
import { useUpdateProfileThunk } from "../../modules/session";
import { formatPriceToDecimal } from "@newm-web/utils";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

interface PricingPlansDialogProps {
  readonly onClose: () => void;
  readonly open: boolean;
}

const PricingPlansDialog = ({ onClose, open }: PricingPlansDialogProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileThunk();

  const handleOptionClick = () => {
    updateProfile({ dspPlanSubscribed: true }).then(() => {
      onClose();
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
    ? `(~${formatPriceToDecimal(dspPriceAda)}₳/RELEASE)`
    : undefined;

  const collabFormattedPricing = collabPerArtistPriceAda
    ? ` (~${formatPriceToDecimal(collabPerArtistPriceAda, 1)}₳/each)`
    : "";

  const totalMintFormattedPricing =
    mintPriceAda && collabPerArtistPriceAda
      ? ` (~${formatPriceToDecimal(
          String(
            parseFloat(mintPriceAda) + parseFloat(collabPerArtistPriceAda)
          ),
          1
        )}₳/release)`
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
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: theme.colors.grey600,
          border: `1px solid ${theme.colors.grey400}`,
          borderRadius: "12px",
        },

        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 5,
          position: "relative",
          justifyContent: "center",
          [theme.breakpoints.down("xl")]: { paddingX: 2 },
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
            display: "flex",
            gap: 4,
            flex: 1,
          }}
        >
          <Stack textAlign="center">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                pb: 4,
                height: "40px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <Box
                  component="span"
                  sx={{ textDecoration: "line-through", mr: 1 }}
                >
                  $14/RELEASE
                </Box>
                {dspFormattedPricingUsd}
              </Box>
              <Typography variant="subtitle1">
                {dspFormattedPricingAda}
              </Typography>
            </Typography>

            <Stack>
              <Typography variant="h2">The Artist</Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  [theme.breakpoints.up("lg")]: { height: "48px" },
                  width: ["auto", "320px"],
                }}
              >
                Release your music with NEWM and ensure correct royalty splits.
              </Typography>
            </Stack>
          </Stack>

          <Stack gap={1.25}>
            {pricingPlanCriteria.map((criterion, index) => (
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1.5,
                  [theme.breakpoints.down("xl")]: { paddingX: 3 },
                }}
                key={index}
              >
                <Check sx={{ color: theme.colors.green }} />

                <Typography
                  variant="body1"
                  fontWeight={500}
                  alignSelf={"center"}
                >
                  {criterion}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <Divider sx={{ width: "70%" }} color={theme.colors.grey400} />
          <Button onClick={handleOptionClick} isLoading={isLoading}>
            Get started
          </Button>
          <Button
            variant="secondary"
            color="music"
            onClick={onClose}
            isLoading={isLoading}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default PricingPlansDialog;
