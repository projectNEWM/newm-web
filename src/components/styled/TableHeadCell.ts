import { styled } from "@mui/material";
import MuiTableCell from "@mui/material/TableCell";

import theme from "theme";

const Tab = styled(MuiTableCell)({
  border: "none",
  padding: theme.spacing(1, 2),
});

export default Tab;
