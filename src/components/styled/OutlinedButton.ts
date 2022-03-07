import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const OutlinedButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#151515",
  borderRadius: "7px",
  color: theme.palette.primary.main,
  font: theme.typography.button.font,
}));

export default OutlinedButton;
