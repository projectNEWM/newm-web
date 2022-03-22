import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

const FilledButton = styled(Button)({
  // eslint-disable-next-line max-len
  backgroundImage: `transparent linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  backgroundRepeat: "no repeat",
  backgroundSizing: "padding-box",
  backgroundPosition: "0% 0%",
  borderRadius: "7px",
  fontSize: "16px",
  color: "white",
  font: theme.typography.button.font,
});

export default FilledButton;
