import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const OutlinedButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  borderRadius: "7px",
  borderWidth: "1px",
  borderColor: theme.colors.red,
  borderStyle: "solid",
  fontSize: "16px",
  lineHeight: "18px",
  color: theme.colors.red,
  font: theme.typography.button.font,
  textTransform: "none",
  padding: "12px 16px",
  whiteSpace: "nowrap",
}));

export default OutlinedButton;
