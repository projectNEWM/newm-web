import { TypographyProps } from "@mui/material";
import { Theme, styled } from "@mui/material/styles";
import theme from "theme";
import Typography from "../Typography";

interface GradientTypographyProps extends TypographyProps {
  readonly gradient?: keyof Theme["gradients"];
  readonly backupColor?: keyof Theme["colors"];
}

const GradientTypography = styled(Typography)<GradientTypographyProps>`
  color: transparent;
  background-color: ${(props) =>
    props.backupColor ? theme.colors[props.backupColor] : theme.colors.red};
  background: ${(props) =>
    props.gradient ? theme.gradients[props.gradient] : theme.gradients.artist};
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0 0 transparent;
  padding: 0 0.5rem; // prevent some fonts getting cut off horizontally
`;

export default GradientTypography;
