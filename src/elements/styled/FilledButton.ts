import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

const FilledButton = styled(Button)({
  background: theme.gradients.artist,
  borderRadius: "7px",
  fontSize: "16px",
  color: "white",
  font: theme.typography.button.font,
  textTransform: "none",
});

export default FilledButton;
