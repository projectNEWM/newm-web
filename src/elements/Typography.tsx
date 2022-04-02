import {
  TypographyProps as MuiTypogaphyProps,
  Typography as MuiTypography,
  useTheme,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { FunctionComponent } from "react";

interface TypographyProps extends MuiTypogaphyProps {
  color?: keyof Theme["colors"];
  fontFamily?: "Inter" | "Montserrat";
  fontWeight?: "regular" | "medium" | "bold" | "extraBold";
}

const Typography: FunctionComponent<TypographyProps> = ({
  color = "white",
  fontWeight = "medium",
  fontFamily = "Inter",
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
      sx={ {
        color: colorHex,
        ...sx,
      } }
      { ...rest }
    />
  );
};

const fontWeightMap = {
  regular: 400,
  medium: 500,
  bold: 700,
  extraBold: 800,
};

export default Typography;
