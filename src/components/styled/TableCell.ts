/**
 * Styled table cell component.
 */

import { styled } from "@mui/material";
import MuiTableCell from "@mui/material/TableCell";

const borderRadius = "28px";

const TableCell = styled(MuiTableCell)`
  border: none;
  padding: 0px 12px;
  &:first-of-type {
    border-top-left-radius: ${borderRadius};
    border-bottom-left-radius: ${borderRadius};
  }
  &:last-of-type {
    border-top-right-radius: ${borderRadius};
    border-bottom-right-radius: ${borderRadius};
  }
`;

export default TableCell;
