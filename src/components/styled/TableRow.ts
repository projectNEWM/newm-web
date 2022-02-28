/**
 * Styled table cell component.
 */

import { styled } from "@mui/material";
import MuiTableRow from "@mui/material/TableRow";

const TableRow = styled(MuiTableRow)`
  background: rgba(10, 10, 10, 0.7) 0% 0% no-repeat padding-box;
  &:hover {
    background: rgba(10, 10, 10, 1) 0% 0% no-repeat padding-box;
  };
`;

export default TableRow;
