import { FunctionComponent } from "react";
import { Box, Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

interface BackgroundProps {
  readonly backgroundColor?: string;
}

type OutlinedButtonProps = ButtonProps & BackgroundProps;

const OutlinedButtonGradient = styled("div")(
  ({ theme }) => `
  background: ${theme.gradients.artist};
  padding: 2px;
  border-radius: 7px;
`
);

const OutlinedButtonMain = styled(Button)`
  background-color: 'transparent';
  padding: 12px 16px;
`;

const GradientText = styled("span")`
  font-size: ${theme.button.fontSize};
  line-height: ${theme.button.lineHeight};
  font-weight: ${theme.button.fontWeight};
  white-space: nowrap;
  font: ${theme.typography.button.font};
  text-transform: none;
  color: transparent;
  background: ${theme.colors.red};
  background: ${theme.gradients.artist};
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0 0 transparent;
`;

const OutlinedButton: FunctionComponent<OutlinedButtonProps> = ({
  children,
  backgroundColor = theme.colors.black,
  ...props
}) => (
  <OutlinedButtonGradient>
    <Box sx={ { backgroundColor, borderRadius: "7px" } }>
      <OutlinedButtonMain { ...props }>
        <GradientText>{ children }</GradientText>
      </OutlinedButtonMain>
    </Box>
  </OutlinedButtonGradient>
);

export default OutlinedButton;
