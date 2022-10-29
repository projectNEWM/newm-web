import { Button, SxProps } from "@mui/material";
import theme from "theme";

interface OutlinedButtonNoGradientProps {
  sx?: SxProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}
export const OutlinedButtonNoGradient = ({
  sx = { minHeight: "35px", alignSelf: "center" },
  children,
}: OutlinedButtonNoGradientProps) => {
  return (
    <Button
      sx={ {
        borderRadius: "4px",
        border: `2px solid ${theme.colors.white}`,
        textTransform: "none",
        ...sx,
      } }
      variant="outlined"
      color="inherit"
    >
      { children }
    </Button>
  );
};

export default OutlinedButtonNoGradient;
