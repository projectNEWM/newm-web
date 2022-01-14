import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";


export const StyledTextField = styled(TextField)({
  backgroundColor: "#151515",
  border: "1px solid #2F2F2F",
  borderRadius: "9px",
  boxShadow: "inset 0px 3px 6px #000000D0",
  height: "38px",
  minWidth: "100px",
  opacity: 1,
});

export const StyledFilledButton = styled(Button)({
  background: "transparent linear-gradient(180deg, #CC33CC 0%, #333399 100%) 0% 0% no-repeat padding-box;",
  borderRadius: "7px",
  color: "white",
  font: "normal normal bold 14px/30px Raleway",
});

