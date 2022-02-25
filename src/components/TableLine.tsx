/**
 * Used to add a horizontal line into a table.
 */

import { useTheme } from "@mui/material";
import { FunctionComponent } from "react";

interface TableLineProps {
  columns: number;
}

const TableLine: FunctionComponent<TableLineProps> = ({ columns }) => {
  const { palette: { primary, secondary } } = useTheme();

  return (
    <tr>
      <td colSpan={ columns }>
        <div
          style={ {
            background: `linear-gradient(
              to right,
              ${primary.main},
              ${secondary.main}
            )`,
            height: "1px",
            marginBottom: "16px",
            width: "100%",
          } }
        />
      </td>
    </tr>
  )
}

export default TableLine;
