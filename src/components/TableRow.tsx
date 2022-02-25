/**
 * Table row with an extra empty row to act as a spacer. For use
 * with the MUI Table component.
 */

import { FunctionComponent } from "react"
import MuiTableRow, { TableRowProps } from '@mui/material/TableRow';

const TableRow: FunctionComponent<TableRowProps> = (props) => {
  return (
    <>
      <MuiTableRow {...props} />
      <tr style={ { height: "12px" } } />
    </>
  )
}

export default TableRow;
