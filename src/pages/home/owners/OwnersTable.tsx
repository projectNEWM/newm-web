import * as React from "react";
import { styled } from "@mui/material/styles";

import {
  Box,
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
import { StyledPagination } from "components";
import PendingBadge from "assets/images/PendingBadge";
import { Owner } from "./mockOwnersData";
interface OwnersTableProps {
  ownersData: Owner[];
}
const StyledTableContainer = styled(TableContainer)<TableContainerProps>`
  border-color: ${theme.colors.grey500};
`;
const StyledTableCell = styled(TableCell)<TableCellProps>`
  border-color: ${theme.colors.grey500};
  color: ${theme.colors.grey100};
  height: 60px;
`;

export default function OwnersTable({ ownersData }: OwnersTableProps) {
  const rowHeight = 60;
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  // Used to avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 1 ? Math.max(0, page * rowsPerPage - ownersData.length) : 0;
  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage;

  // determines how many rows to display per page
  const windowHeight = useWindowDimensions()?.height;
  useEffect(() => {
    setRowsPerPage(
      windowHeight
        //viewport height - header height - Footer height - bottom padding / row height 
        ? Math.floor((windowHeight - 245 - 65 - 30) / rowHeight)
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
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography fontWeight={ 700 }>OWNER</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography fontWeight={ 700 }>SONG</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography fontWeight={ 700 }>INFO TBD</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={ { backgroundColor: theme.colors.grey600 } }>
          { ownersData
            .slice(
              (page - 1) * rowsPerPage,
              (page - 1) * rowsPerPage + rowsPerPage
            )
            .map((row) => (
              <TableRow key={ row.id }>
                <StyledTableCell
                  sx={ { color: theme.colors.white } }
                  component="th"
                  scope="row"
                >
                  <Box sx={ { display: "flex", width: "100%" } }>
                    { row.name }
                    { !row.registered ? (
                      <PendingBadge style={ { marginLeft: "15px" } } />
                    ) : null }
                  </Box>
                </StyledTableCell>
                <StyledTableCell>{ row.song }</StyledTableCell>
                <StyledTableCell>{ row.info_tbd }%</StyledTableCell>
              </TableRow>
            )) }
          { emptyRows > 0 && (
            <TableRow style={ { height: rowHeight * emptyRows } }>
              <StyledTableCell
                sx={ { backgroundColor: theme.colors.black100 } }
                colSpan={ 6 }
              />
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
                <Typography variant="body1" sx={ { fontWeight: 500 } }>
                  Showing { (page - 1) * rowsPerPage + 1 } to { lastRowOnPage } of{ " " }
                  { ownersData.length } owners
                </Typography>
                <StyledPagination
                  variant="outlined"
                  shape="rounded"
                  page={ page }
                  count={ Math.ceil(ownersData.length / rowsPerPage) }
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
