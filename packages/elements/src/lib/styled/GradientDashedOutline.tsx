import { Box } from "@mui/material";
import { Theme, styled } from "@mui/material/styles";
import theme from "@newm-web/theme";

type GradientKey = keyof Theme["gradients"];

interface GradientDashedOutlineProps {
  gradient?: GradientKey;
}

/**
 * * Dashed outline with a configurable theme gradient border.
 *
 * * Uses a grey700 dashed border + layered backgrounds to create a
 * * "gradient dashed border" effect. Prefer this for CTA tiles (e.g. "Create new")
 * * where a gradient border is desired without introducing SVG.
 */
const GradientDashedOutline = styled(Box, {
  shouldForwardProp: (prop) => prop !== "gradient",
})<GradientDashedOutlineProps>(({ gradient = "newm" }) => ({
  "&:hover": {
    backgroundImage: `linear-gradient(${theme.colors.grey600}, ${theme.colors.grey600}), ${theme.gradients[gradient]}`,
  },
  backgroundClip: "padding-box, border-box",

  backgroundImage: `linear-gradient(${theme.colors.grey700}, ${theme.colors.grey700}), ${theme.gradients[gradient]}`,
  backgroundOrigin: "padding-box, border-box",
  border: `2px dashed ${theme.colors.grey700}`,
  borderRadius: 5,

  borderWidth: "2.5px",
}));

export default GradientDashedOutline;
