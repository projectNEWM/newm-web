import { Box, IconButton, Stack } from "@mui/material";
import { Dialog, Typography } from "elements";
import { JSX } from "react";
import LeafFill from "assets/images/LeafFillIcon";
import theme from "theme";
import SeedlingFillIcon from "assets/images/SeedlingFillIcon";
import StarFillIcon from "assets/images/StarFillIcon";
import CloseIcon from "@mui/icons-material/Close";
import PricingPlanOption from "./PricingPlanOption";
import pricingPlanData from "./pricingPlanData.json";

const ICON_SIZE = "20px";

const PRICING_PLAN_ICON: Record<string, JSX.Element> = {
  collaborator: <LeafFill sx={ { fontSize: ICON_SIZE } } />,
  artist: <SeedlingFillIcon sx={ { fontSize: ICON_SIZE } } />,
  artistPlus: <StarFillIcon sx={ { fontSize: ICON_SIZE } } />,
};

interface PricingPlansDialogProps {
  readonly handleClose: () => void;
  readonly open: boolean;
}

const PricingPlansDialog = ({ handleClose, open }: PricingPlansDialogProps) => {
  return (
    <Dialog onClose={ handleClose } open={ open } fullScreen sx={ { m: 5 } }>
      <IconButton
        aria-label="close"
        onClick={ handleClose }
        sx={ {
          position: "absolute",
          right: "30px",
          top: "30px",
          color: theme.colors.grey200,
          p: 0,
        } }
      >
        <CloseIcon sx={ { fontSize: "40px" } } />
      </IconButton>
      <Box
        sx={ {
          alignItems: "center",
          backgroundColor: theme.colors.black,
          height: "100%",
          width: "100%",
          padding: 7.5,

          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "column",
        } }
      >
        <Stack sx={ { mb: 12 } }>
          <Typography
            variant="subtitle1"
            fontWeight={ 500 }
            color="music"
            align="center"
            mb={ 1.5 }
          >
            Pricing
          </Typography>
          <Typography variant="h3">WHAT SUITS YOU BEST?</Typography>
        </Stack>
        <Stack
          sx={ {
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
            gap: 4,
          } }
        >
          { pricingPlanData.pricingPlanOptions.map((pricingPlan) => {
            return (
              <PricingPlanOption
                handleOptionClick={ handleClose }
                key={ pricingPlan.id }
                planIcon={ {
                  iconPxSize: ICON_SIZE,
                  iconElement: PRICING_PLAN_ICON[pricingPlan.icon],
                } }
                { ...pricingPlan }
              />
            );
          }) }
        </Stack>
      </Box>
    </Dialog>
  );
};

export default PricingPlansDialog;
