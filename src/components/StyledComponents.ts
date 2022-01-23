import { Button, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { flexbox } from "@mui/system";
import { theme } from "./../theme/theme";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.inputField.background,
  border: theme.inputField.border,
  borderRadius: "9px",
  boxShadow: "inset 0px 3px 6px #000000D0",
  height: "38px",
  minWidth: "100px",
  opacity: 1,
}));

export const StyledTextArea = styled(TextField)({
  backgroundColor: theme.inputField.background,
  border: theme.inputField.border,
  borderRadius: "9px",
  boxShadow: "inset 0px 3px 6px #000000D0",
  minWidth: "100px",
  opacity: 1,
});

export const StyledFilledButton = styled(Button)({
  background: "transparent linear-gradient(180deg, #CC33CC 0%, #333399 100%) 0% 0% no-repeat padding-box;",
  borderRadius: "7px",
  color: "white",
  font: theme.typography.button.font,
});

export const StyledOutlinedButton = styled(Button)(({ theme }) => ({
  borderRadius: "7px",
  color: theme.palette.primary.main,
  font: theme.typography.button.font,
}));

export const StyledPaperInput = styled(Paper)({
  backgroundColor: theme.inputField.background,
  border: theme.inputField.border,
  borderRadius: "9px",
  boxShadow: "inset 0px 3px 6px #000000D0",
  minWidth: "100px",
  opacity: 1,
  color: theme.palette.text.secondary,
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
