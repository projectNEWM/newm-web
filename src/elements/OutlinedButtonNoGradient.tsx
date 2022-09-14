import { Button, ButtonProps } from "@mui/material";

export const OutlinedButtonNoGradient = ({
  sx,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <Button
      sx={ {
        borderRadius: "4px",
        border: "2px solid #FFFFFF",
        textTransform: "none",
        ...sx,
      } }
      variant="outlined"
      color="inherit"
      { ...rest }
    >
      { children }
    </Button>
  );
};

export default OutlinedButtonNoGradient;
