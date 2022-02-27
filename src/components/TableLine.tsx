/**
 * Used to add a horizontal line into a table.
 */

import { FunctionComponent } from "react";
import HorizontalLine from "./styled/HorizontalLine";

interface TableLineProps {
  columns: number;
}

const TableLine: FunctionComponent<TableLineProps> = ({ columns }) => {
  return (
    <tr>
      <td colSpan={ columns }>
        <HorizontalLine />
      </td>
    </tr>
  )
}

export default TableLine;
