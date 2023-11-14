import { Box, Stack } from "@mui/material";
import { Typography } from "elements";
import { Modal } from "components";
import { JSX, useState } from "react";
import LeafFill from "assets/images/LeafFillIcon";
import theme from "theme";
import PricingPlanOption from "./PricingPlanOption";
import pricingPlanData from "./pricingPlanData.json";

const ICON_SIZE = 20;

const PRICING_PLAN_ICON: Record<string, JSX.Element> = {
  collaborator: <LeafFill sx={ { fontSize: ICON_SIZE } } />,
  artist: <LeafFill sx={ { fontSize: ICON_SIZE } } />,
  artistPlus: <LeafFill sx={ { fontSize: ICON_SIZE } } />,
};

const PricingPlansModal = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal isOpen={ open } onClose={ handleClose }>
      <Box
        sx={ {
          alignItems: "center",
          backgroundColor: theme.colors.black,
          height: "100%",
          width: "100%",

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
                key={ pricingPlan.id }
                planIcon={ {
                  size: ICON_SIZE,
                  icon: PRICING_PLAN_ICON[pricingPlan.icon],
                } }
                { ...pricingPlan }
              />
            );
          }) }
        </Stack>
      </Box>
    </Modal>
  );
};

export default PricingPlansModal;
