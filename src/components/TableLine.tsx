/**
 * Used to add a horizontal line into a table.
 */

import { useTheme } from "@mui/material";
import { FunctionComponent, CSSProperties } from "react";

interface TableLineProps {
  columns: number;
  style?: CSSProperties;
}

const TableLine: FunctionComponent<TableLineProps> = ({ columns, style }) => {
  const { palette: { primary, secondary } } = useTheme();

  return (
    <tr>
      <td colSpan={ columns }>
        <div
          style={ {
            height: "1px",
            width: "100%",
            background: `linear-gradient(
              to right,
              ${primary.main},
              ${secondary.main}
            )`,
            ...style,
          } }
        />
      </td>
    </tr>
  )
}

export default TableLine;
