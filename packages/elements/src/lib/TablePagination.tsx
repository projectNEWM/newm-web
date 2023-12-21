import {
  Box,
  PaginationItem,
  SxProps,
  TableCell,
  TableCellProps,
  TableFooter,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import React from "react";
import theme from "@newm-web/theme";
import Pagination from "./styled/Pagination";

const StyledTableCell = styled(TableCell)<TableCellProps>`
  border-color: ${theme.colors.black};
  padding: 4px 16px;
`;

interface TablePaginationProps {
  cellStyles?: SxProps;
  colSpan: number;
  color?: string;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  lastRowOnPage: number;
  numberOfRows: number;
  page: number;
  rows?: string;
  rowsPerPage: number;
}

const TablePagination = ({
  numberOfRows,
  page,
  rowsPerPage,
  lastRowOnPage,
  handlePageChange,
  colSpan,
  color = theme.colors.black,
  rows = "rows",
  cellStyles,
}: TablePaginationProps) => {
  return (
    <TableFooter sx={ { backgroundColor: color } }>
      <TableRow>
        <StyledTableCell colSpan={ colSpan } sx={ cellStyles }>
          <Box
            sx={ {
              alignItems: "center",
              display: "flex",
              justifyContent: { sm: "space-between", xs: "center" },
              mt: 0.5,
            } }
          >
            <Typography
              sx={ {
                display: { sm: "block", xs: "none" },
                fontWeight: 500,
              } }
              variant="body1"
            >
              Showing { (page - 1) * rowsPerPage + 1 } to{ " " }
              { lastRowOnPage < numberOfRows ? lastRowOnPage : numberOfRows } of{ " " }
              { numberOfRows } { rows }
            </Typography>
            <Pagination
              count={ Math.ceil(numberOfRows / rowsPerPage) }
              page={ page }
              renderItem={ (item) => (
                <PaginationItem
                  slots={ { next: ArrowRightIcon, previous: ArrowLeftIcon } }
                  { ...item }
                />
              ) }
              shape="rounded"
              variant="outlined"
              onChange={ handlePageChange }
            />
          </Box>
        </StyledTableCell>
      </TableRow>
    </TableFooter>
  );
};

export default TablePagination;
