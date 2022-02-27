import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

const FilledButton = styled(Button)({
  background:
    "transparent linear-gradient(180deg, #CC33CC 0%, #333399 100%) 0% 0% no-repeat padding-box;",
  borderRadius: "7px",
  color: "white",
  font: theme.typography.button.font
});

export default FilledButton;
