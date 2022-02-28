/**
 * Table row with an extra empty row to act as a spacer.
 */

 import { TableRowProps } from "@mui/material/TableRow";
import { FunctionComponent } from "react";
import StyledTableRow from "./styled/TableRow";

const TableRow: FunctionComponent<TableRowProps> = (props) => {
  return (
    <>
      <StyledTableRow { ...props } />
      <tr style={ { height: "12px" } } />
    </>
  );
};

export default TableRow;
