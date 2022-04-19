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
`
);

export default GradientTypography;
