import { Box } from "@mui/material";
import theme from "@newm-web/theme";
import { Sale } from "./Sale";

export const MarketplaceTab = () => {
  return (
    <Box
      maxWidth={ [theme.inputField.maxWidth, theme.inputField.maxWidth, "700px"] }
    >
      <Sale />
    </Box>
  );
};
