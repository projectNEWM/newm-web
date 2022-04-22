import { styled } from "@mui/material/styles";
import Typography from "../Typography";

const GradientTypography = styled(Typography)(
  ({ theme }) => `
  color: transparent;
  background-color: ${theme.colors.red};
  background: ${theme.gradients.artist};
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent";
  text-shadow: 0px 0px transparent;
  padding: 0 0.5rem; // prevent some fonts getting cut off horizontally
`
);

export default GradientTypography;
