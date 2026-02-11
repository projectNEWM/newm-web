import type { FunctionComponent, ReactNode } from "react";

import {
  Box,
  Stack,
  type SxProps,
  type Theme,
  Typography,
  useTheme,
} from "@mui/material";

interface BannerProps {
  readonly background?: string;
  readonly description?: string | ReactNode;
  readonly fixed?: boolean;
  readonly fullWidth?: boolean;
  readonly sx?: SxProps<Theme>;
  readonly textAlign?: "center" | "left" | "right";
  readonly textColor?: string;
  readonly title: string | ReactNode;
  readonly titleSx?: SxProps<Theme>;
}

const Banner: FunctionComponent<BannerProps> = ({
  title,
  titleSx,
  description,
  background,
  textColor,
  fixed = false,
  fullWidth = false,
  textAlign = "center",
  sx,
}) => {
  const theme = useTheme();

  const bg = background ?? theme.gradients.music;
  const color = textColor ?? theme.colors.white;

  return (
    <Box
      data-testid="banner"
      sx={ {
        background: bg,
        color: color,
        paddingX: 3,
        paddingY: { md: 2, xs: 1 },
        position: fixed ? "fixed" : undefined,
        top: fixed ? 0 : undefined,
        width: fullWidth ? "100%" : undefined,
        // * Place Banner just below Snackbars (see packages/components/**/Alert.tsx)
        zIndex: fixed ? theme.zIndex.snackbar - 1 : undefined,
        ...sx,
      } }
      textAlign={ textAlign }
    >
      <Stack spacing={ description ? 0.5 : 0 }>
        <Typography sx={ { ...titleSx } } variant="h4">
          { title }
        </Typography>

        { description && (
          <Typography fontWeight={ 400 } variant="body1">
            { description }
          </Typography>
        ) }
      </Stack>
    </Box>
  );
};

export default Banner;
