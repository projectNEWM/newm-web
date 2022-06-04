import {
  TypographyProps as MuiTypogaphyProps,
  Typography as MuiTypography,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { FunctionComponent } from "react";

export interface TypographyProps extends MuiTypogaphyProps {
  color?: keyof Theme["colors"];
  fontWeight?: "regular" | "medium" | "semi-bold" | "bold" | "extra-bold";
}

/**
 * Typography component that allows for easily overridding
 * color and font-weight styles.
 */
const Typography: FunctionComponent<TypographyProps> = ({
  color,
  fontWeight,
  children,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <MuiTypography
      fontWeight={ fontWeight ? fontWeightMap[fontWeight] : undefined }
      color={ color ? theme.colors[color] : undefined }
      { ...rest }
    >
      { children }
    </MuiTypography>
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
