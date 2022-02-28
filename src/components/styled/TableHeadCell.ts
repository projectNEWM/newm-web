/**
 * A table header cell with adjusted padding and no bottom border.
 */

import { styled } from "@mui/material";
import MuiTableCell from "@mui/material/TableCell";

import theme from "theme";

const TableHeadCell = styled(MuiTableCell)({
  border: "none",
  padding: theme.spacing(1, 2),
});

export default TableHeadCell;
