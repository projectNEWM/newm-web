import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

const TextArea = styled(TextField)({
  backgroundColor: theme.inputField.background,
  border: theme.inputField.border,
  borderRadius: "9px",
  boxShadow: "inset 0px 3px 6px #000000D0",
  minWidth: "100px",
  opacity: 1
});

export default TextArea;
