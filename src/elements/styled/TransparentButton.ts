import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

interface TransparentButtonProps extends ButtonProps {
  readonly active?: boolean;
}

const activeBackground = "rgba(255, 255, 255, 0.1)";

const TransparentButton = styled(Button)<TransparentButtonProps>`
  background: ${(props) => (props.active ? activeBackground : "transparent")};
  border-radius: 7px;
  font-size: ${theme.button.fontSize};
  line-height: ${theme.button.lineHeight};
  font-weight: ${theme.button.fontWeight};
  color: white;
  font: ${theme.typography.button.font};
  text-transform: none;
  padding: 12px 20px;
  opacity: ${(props) => (props.disabled || !props.active ? 0.5 : 1)};
  transition: background-color 0ms;
  &:hover {
    opacity: 1;
    background: ${activeBackground};
  }
`;

export default TransparentButton;
