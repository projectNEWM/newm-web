import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

const FilledButton = styled(Button)<ButtonProps>`
  background: ${theme.gradients.artist};
  border-radius: 7px;
  font-size: ${theme.button.fontSize};
  line-height: ${theme.button.lineHeight};
  color: white;
  font: ${theme.typography.button.font};
  text-transform: none;
  padding: 12px 16px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export default FilledButton;
