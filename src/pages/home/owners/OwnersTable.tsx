import * as React from "react";
import { styled } from "@mui/material/styles";

import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableContainerProps,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "theme";
import { useEffect, useState } from "react";
import { Typography } from "elements";
import { useWindowDimensions } from "common";
import mockOwnersData from "./mockOwnersData";

interface OwnersTableProps {
  filter: string;
}

export default function OwnersTable({ filter }: OwnersTableProps) {
  // Mock data for now
  const [rows, setRows] = useState(mockOwnersData);

  const windowHeight = useWindowDimensions()?.height;
  const rowHeight = 60;
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  // Used to avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 1 ? Math.max(0, page * rowsPerPage - rows.length) : 0;
  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage - emptyRows;

  // determines how many rows to display per page
  useEffect(() => {
    setRowsPerPage(
      windowHeight
        ? Math.floor((windowHeight - 245 - rowHeight - 60 - 30) / rowHeight)
        : 5
    );
  }, [windowHeight]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };
  return (
    <StyledTableContainer>
      <Table sx={ { minWidth: 500 } } aria-label="Owners pagination table">
        <TableHead sx={ { lineHeight: "16.94px" } }>
          <TableRow>
            <StyledTableCell>OWNER</StyledTableCell>
            <StyledTableCell>SONG</StyledTableCell>
            <StyledTableCell>INFO TBD</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={ { backgroundColor: theme.colors.grey600 } }>
          { rows
            .filter(
              (owner) =>
                owner.name.match(new RegExp(filter, "i")) ||
                owner.song.match(new RegExp(filter, "i"))
            )
            .slice(
              (page - 1) * rowsPerPage,
              (page - 1) * rowsPerPage + rowsPerPage
            )
            .map((row) => (
              <TableRow key={ row.name }>
                <StyledTableCell
                  sx={ { color: theme.colors.white } }
                  component="th"
                  scope="row"
                >
                  { row.name }
                </StyledTableCell>
                <StyledTableCell>{ row.song }</StyledTableCell>
                <StyledTableCell>{ row.info }%</StyledTableCell>
              </TableRow>
            )) }
          { emptyRows > 0 && (
            <TableRow style={ { height: rowHeight * emptyRows } }>
              <StyledTableCell colSpan={ 6 } />
            </TableRow>
          ) }
        </TableBody>
        <TableFooter
          sx={ {
            backgroundColor: theme.colors.grey600,
          } }
        >
          <TableRow>
            <StyledTableCell colSpan={ 3 }>
              <Box
                sx={ {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                } }
              >
                <Typography variant="body2">
                  Showing { (page - 1) * rowsPerPage + 1 } to { lastRowOnPage } of{ " " }
                  { rows.length } owners
                </Typography>
                <Pagination
                  sx={ {
                    ".MuiButtonBase-root, MuiPaginationItem-root, .MuiPaginationItem-sizeMedium, .MuiPaginationItem-outlined, .MuiPaginationItem-rounded, .MuiPaginationItem-outlinedSecondary, .MuiPaginationItem-page, .css-1rdlhs2-MuiButtonBase-root-MuiPaginationItem-root":
                      { backgroundColor: "#121214" },
                  } }
                  variant="outlined"
                  shape="rounded"
                  color="secondary"
                  page={ page }
                  count={ Math.ceil(rows.length / rowsPerPage) }
                  onChange={ handlePageChange }
                />
              </Box>
            </StyledTableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </StyledTableContainer>
  );
}

const StyledTableContainer = styled(TableContainer)<TableContainerProps>`
  border-color: ${theme.colors.grey500};
`;
const StyledTableCell = styled(TableCell)<TableCellProps>`
  border-color: ${theme.colors.grey500};
  color: ${theme.colors.grey100};
  height: 60px;
`;

// 260
// rows
