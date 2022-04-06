import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const OutlinedButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  borderRadius: "7px",
  fontSize: "16px",
  lineHeight: "18px",
  color: theme.palette.primary.main,
  font: theme.typography.button.font,
  textTransform: "none",
  padding: "12px 16px",
}));

export default OutlinedButton;
