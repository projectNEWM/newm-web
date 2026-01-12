import { TableHead as MUITableHead, TableRow } from "@mui/material";
import { TableHeadCell } from "@newm-web/elements";

const TableHead = () => {
  return (
    <MUITableHead>
      <TableRow>
        <TableHeadCell>SONG NAME</TableHeadCell>
        <TableHeadCell sx={ { display: { sm: "table-cell", xs: "none" } } }>
          MINTING
        </TableHeadCell>
        <TableHeadCell sx={ { display: { lg: "table-cell", xs: "none" } } }>
          GENRE
        </TableHeadCell>
        <TableHeadCell
          sx={ {
            display: { md: "table-cell", xs: "none" },
            textAlign: "end",
          } }
        >
          LENGTH
        </TableHeadCell>
      </TableRow>
    </MUITableHead>
  );
};

export default TableHead;
