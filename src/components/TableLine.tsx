/**
 * Used to add a horizontal line into a table.
 */

import { FunctionComponent } from "react";
import StyledAnimatedGradientLine from "./styled/AnimatedGradientLine";

interface TableLineProps {
  columns: number;
}

const TableLine: FunctionComponent<TableLineProps> = ({ columns }) => {
  return (
    <tr>
      <td colSpan={ columns } style={ { paddingBottom: "16px" } }>
        <StyledAnimatedGradientLine height="2px" animationSpeed="20s" />
      </td>
    </tr>
  );
};

export default TableLine;
