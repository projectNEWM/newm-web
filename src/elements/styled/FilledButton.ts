import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

interface FilledButtonProps extends ButtonProps {
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: number;
}

const FilledButton = styled(Button)<FilledButtonProps>(
  ({
    backgroundColor = theme.gradients.artist,
    fontSize = theme.button.fontSize,
    fontWeight = theme.button.fontWeight,
    disabled,
  }) => ({
    background: backgroundColor,
    borderRadius: "7px",
    fontSize: fontSize,
    fontWeight: fontWeight,
    lineHeight: theme.button.lineHeight,
    color: "white",
    font: theme.typography.button.font,
    textTransform: "none",
    padding: "12px 16px",
    opacity: disabled ? 0.5 : 1,
    "&:hover": {
      background: backgroundColor,
    },
  })
);

export default FilledButton;
