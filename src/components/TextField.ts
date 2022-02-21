import { TextField as MuiTextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const TextField = styled(MuiTextField)(({ theme }) => ({
  backgroundColor: theme.inputField.background,
  border: theme.inputField.border,
  borderRadius: "9px",
  boxShadow: "inset 0px 3px 6px #000000D0",
  height: "38px",
  minWidth: "100px",
  opacity: 1,
}));

export default TextField;
