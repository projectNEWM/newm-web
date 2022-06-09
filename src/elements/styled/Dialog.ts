import {
  Dialog as MuiDialog,
  DialogProps as MuiDiaogProps,
  styled,
} from "@mui/material";
import theme from "theme";

export type DialogProps = MuiDiaogProps;

const Dialog = styled(MuiDialog)`
  background-color: rgba(0, 0, 0, 0.8);

  & .MuiPaper-root {
    border-radius: 8px;
    background-color: ${theme.colors.grey500};
  }
`;

export default Dialog;
