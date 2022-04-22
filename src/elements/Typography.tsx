import {
  TypographyProps as MuiTypogaphyProps,
  Typography as MuiTypography,
  useTheme,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { FunctionComponent } from "react";

export interface TypographyProps extends MuiTypogaphyProps {
  color?: keyof Theme["colors"];
  fontFamily?: "Inter" | "Raleway" | "DM Serif Text";
  fontWeight?: "regular" | "medium" | "semi-bold" | "bold" | "extra-bold";
  fontStyle?: "normal" | "italic";
}

const Typography: FunctionComponent<TypographyProps> = ({
  color = "white",
  fontWeight = "semi-bold",
  fontFamily = "Inter",
  fontStyle = "normal",
  variant = "sm",
  sx,
  ...rest
}) => {
  const theme = useTheme();

  const colorHex = theme.colors[color];
  const fontWeightValue = fontWeightMap[fontWeight];

  return (
    <MuiTypography
      fontFamily={ fontFamily }
      fontWeight={ fontWeightValue }
      variant={ variant }
      sx={ {
        color: colorHex,
        fontStyle,
        ...sx,
      } }
      { ...rest }
    />
  );
};

const fontWeightMap = {
  regular: 400,
  medium: 500,
  "semi-bold": 600,
  bold: 700,
  "extra-bold": 800,
};

export default Typography;
