import { Theme, styled } from "@mui/material/styles";
import theme from "@newm-web/theme";

export interface PillProps {
  readonly bgColor?: keyof Theme["colors"];
  readonly children: React.ReactNode;
  readonly textColor?: keyof Theme["colors"];
}

const Pill = styled("span")<PillProps>(({ bgColor, textColor }) => ({
  ...theme.typography.body1,
  backgroundColor: bgColor ? theme.colors[bgColor] : theme.colors.grey200,
  borderRadius: "2px",
  color: textColor ? theme.colors[textColor] : theme.colors.white,
  fontSize: "12px",
  fontWeight: 700,
  padding: "4px 8px",
}));

export default Pill;
