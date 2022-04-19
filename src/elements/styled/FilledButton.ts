import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

const FilledButton = styled(Button)<ButtonProps>`
  background: ${theme.gradients.artist};
  border-radius: 7px;
  fontsize: 16px;
  lineheight: 18px;
  color: white;
  font: ${theme.typography.button.font};
  texttransform: none;
  padding: 12px 16px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export default FilledButton;
