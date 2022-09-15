import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

interface AccentButtonProps extends ButtonProps {
  readonly active?: boolean;
}

const AccentButton = styled(Button)<AccentButtonProps>`
  background: ${(props) =>
    props.active ? theme.colors.grey500 : "transparent"};
  border-radius: 7px;
  border: 2px solid ${theme.colors.grey500};
  font-size: ${theme.button.fontSize};
  line-height: ${theme.button.lineHeight};
  font-weight: ${theme.button.fontWeight};
  color: ${theme.colors.pink};
  font: ${theme.typography.button.font};
  text-transform: none;
  padding: 12px 20px;
  transition: background-color 0ms;
  &.Mui-disabled {
    color: ${theme.colors.grey100};
  }
  &:hover {
    background: ${theme.colors.grey500};
  }
`;

export default AccentButton;
