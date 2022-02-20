import { Button, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

const OutlinedButton = styled(Button)(({ theme }) => ({
  borderRadius: "7px",
  color: theme.palette.primary.main,
  font: theme.typography.button.font,
}));

export default OutlinedButton;
