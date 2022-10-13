import {
  Box,
  SxProps,
  TableCell,
  TableCellProps,
  TableFooter,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import theme from "theme";
import StyledPagination from "./styled/StyledPagination";

const StyledTableCell = styled(TableCell)<TableCellProps>`
  border-color: ${theme.colors.grey700};
  padding: 4px 16px;
`;

interface TablePaginationProps {
  numberOfRows: number;
  page: number;
  rowsPerPage: number;
  lastRowOnPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  colSpan: number;
  color?: string;
  rows?: string;
  cellStyles?: SxProps;
}

const TablePagination = ({
  numberOfRows,
  page,
  rowsPerPage,
  lastRowOnPage,
  handlePageChange,
  colSpan,
  color = theme.colors.grey700,
  rows = "rows",
  cellStyles,
}: TablePaginationProps) => {
  return (
    <TableFooter sx={ { backgroundColor: color } }>
      <TableRow>
        <StyledTableCell sx={ cellStyles } colSpan={ colSpan }>
          <Box
            sx={ {
              display: "flex",
              justifyContent: { xs: "center", sm: "space-between" },
              alignItems: "center",
            } }
          >
            <Typography
              variant="body1"
              sx={ {
                fontWeight: 500,
                display: { xs: "none", sm: "block" },
              } }
            >
              Showing { (page - 1) * rowsPerPage + 1 } to{ " " }
              { lastRowOnPage < numberOfRows ? lastRowOnPage : numberOfRows } of{ " " }
              { numberOfRows } { rows }
            </Typography>
            <StyledPagination
              variant="outlined"
              shape="rounded"
              page={ page }
              count={ Math.ceil(numberOfRows / rowsPerPage) }
              onChange={ handlePageChange }
            />
          </Box>
        </StyledTableCell>
      </TableRow>
    </TableFooter>
  );
};

export default TablePagination;
