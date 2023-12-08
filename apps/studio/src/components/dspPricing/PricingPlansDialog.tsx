import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Dialog } from "@newm-web/elements";
import { JSX } from "react";
import theme from "@newm-web/theme";
import CloseIcon from "@mui/icons-material/Close";
import { pricingPlanData } from "../../assets";
import PricingPlanOption from "./PricingPlanOption";
import { LeafFillIcon, SeedlingFillIcon, StarFillIcon } from "@newm-web/assets";
import { useGetMintSongEstimateQuery } from "../../modules/song";
import { useUpdateProfileThunk } from "../../modules/session";
import { PricingPlanDetails } from "../../common";
import { formatPriceToDecimal } from "@newm-web/utils";

const ICON_SIZE = "20px";

const PRICING_PLAN_ICON: Record<string, JSX.Element> = {
  collaborator: (
    <LeafFillIcon sx={{ color: theme.colors.music, fontSize: ICON_SIZE }} />
  ),
  artist: (
    <SeedlingFillIcon sx={{ color: theme.colors.music, fontSize: ICON_SIZE }} />
  ),
  artistPlus: (
    <StarFillIcon sx={{ color: theme.colors.music, fontSize: ICON_SIZE }} />
  ),
};

interface PricingPlansDialogProps {
  readonly onClose: () => void;
  readonly open: boolean;
}

const PricingPlansDialog = ({ onClose, open }: PricingPlansDialogProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileThunk();

  const handleClose = () => {
    onClose();
  };

  const handleOptionClick = (optionClicked: string) => {
    if (optionClicked === "artist") {
      updateProfile({ dspPlanSubscribed: true }).then(() => {
        onClose();
      });
    } else {
      onClose();
    }
  };

  const { data: { dspPriceAda, dspPriceUsd } = {} } =
    useGetMintSongEstimateQuery({
      collaborators: 1,
    });

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullScreen
      sx={{
        margin: [0, 5],
      }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          color: theme.colors.grey200,
          p: 0,
          position: "absolute",
          right: "30px",
          top: "30px",
        }}
      >
        <CloseIcon sx={{ fontSize: "40px" }} />
      </IconButton>
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: theme.colors.black,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          padding: 7.5,
        }}
      >
        <Stack sx={{ mb: 12, textAlign: "center" }}>
          <Typography
            align="center"
            color="music"
            fontWeight={500}
            mb={1.5}
            variant="subtitle1"
          >
            Pricing
          </Typography>
          <Typography variant="h3">WHAT SUITS YOU BEST?</Typography>
        </Stack>
        <Stack
          sx={{
            alignContent: "center",
            display: "flex",
            flexDirection: "row",
            gap: 4,
            [theme.breakpoints.down("xl")]: {
              flexDirection: "column",
              gap: 10,
            },
            justifyContent: "center",
          }}
        >
          {pricingPlanData.pricingPlanOptions.map(
            (pricingPlan: PricingPlanDetails) => {
              return (
                <PricingPlanOption
                  {...pricingPlan}
                  adaPricingEstimate={
                    dspPriceAda && pricingPlan.id === "artist"
                      ? `(~${formatPriceToDecimal(dspPriceAda)}₳/RELEASE)`
                      : undefined
                  }
                  onOptionClick={() => handleOptionClick(pricingPlan.id)}
                  key={pricingPlan.id}
                  planIcon={{
                    iconPxSize: ICON_SIZE,
                    iconElement: PRICING_PLAN_ICON[pricingPlan.id],
                  }}
                  pricing={
                    dspPriceUsd && pricingPlan.id === "artist"
                      ? `$${formatPriceToDecimal(dspPriceUsd)}/RELEASE` || "N/A"
                      : pricingPlan.pricing
                  }
                  hasOptionBeenSelected={isLoading}
                />
              );
            }
          )}
        </Stack>
      </Box>
    </Dialog>
  );
};

export default PricingPlansDialog;
