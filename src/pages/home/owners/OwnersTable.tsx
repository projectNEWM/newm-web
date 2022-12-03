import * as React from "react";
import { styled } from "@mui/material/styles";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "theme";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Typography } from "elements";
import { Owner, useWindowDimensions } from "common";
import PendingBadge from "assets/images/PendingBadge";
import { TablePagination } from "components";
interface OwnersTableProps {
  ownersData: Owner[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function OwnersTable({
  ownersData,
  page,
  setPage,
}: OwnersTableProps) {
  const rowHeight = 60;
  const headerHeight = 245;
  const footerHeight = 65;
  const bottomPadding = 30;
  const [rowsPerPage, setRowsPerPage] = useState(0);
  // Used to avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 1 ? Math.max(0, page * rowsPerPage - ownersData.length) : 0;
  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage;
  const StyledTableCell = styled(TableCell)<TableCellProps>`
    border-color: ${theme.colors.grey500};
    color: ${theme.colors.grey100};
    height: ${rowHeight}px;
  `;
  const StyledTableCellHeader = styled(TableCell)<TableCellProps>`
    border-color: ${theme.colors.grey500};
    color: ${theme.colors.grey100};
    font-weight: ${theme.typography.fontWeightBold};
  `;

  // determines how many rows to display per page
  const windowHeight = useWindowDimensions()?.height;
  useEffect(() => {
    setRowsPerPage(
      windowHeight
        ? Math.floor(
            (windowHeight - headerHeight - footerHeight - bottomPadding) /
              rowHeight
          )
        : 5
    );
  }, [windowHeight]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };
  if (ownersData) {
    return (
      <TableContainer>
        <Table size="small" aria-label="Owners pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCellHeader>
                <Typography>COLLABORATORS</Typography>
              </StyledTableCellHeader>
              <StyledTableCellHeader>
                <Typography>COLLABORATIONS</Typography>
              </StyledTableCellHeader>
              <StyledTableCellHeader
                sx={ {
                  display: { xs: "none", sm: "inline" },
                } }
              >
                <Typography>INFO TBD</Typography>
              </StyledTableCellHeader>
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
                    sx={ {
                      color: theme.colors.white,
                      maxWidth: ["150px", "unset"],
                    } }
                  >
                    <Box
                      sx={ { display: "flex" } }
                      overflow="scroll"
                      whiteSpace="nowrap"
                    >
                      <Box>{ row.name }</Box>
                      { row.registered ? (
                        <Box
                          sx={ {
                            marginLeft: "16px",
                            display: { xs: "none", sm: "flex" },
                          } }
                        >
                          <PendingBadge />
                        </Box>
                      ) : null }
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={ {
                      overflow: "scroll",
                      whiteSpace: "nowrap",
                      maxWidth: ["154px", "unset"],
                    } }
                  >
                    { row.song }
                  </StyledTableCell>
                  <StyledTableCell
                    sx={ { display: { xs: "none", sm: "table-cell" } } }
                  >
                    { row.info_tbd }%
                  </StyledTableCell>
                </TableRow>
              )) }
            { emptyRows > 0 && (
              <TableRow style={ { height: rowHeight * emptyRows } }>
                <StyledTableCell
                  sx={ { backgroundColor: theme.colors.grey700 } }
                  colSpan={ 3 }
                />
              </TableRow>
            ) }
          </TableBody>
          { ownersData.length > rowsPerPage ? (
            <TablePagination
              numberOfRows={ ownersData.length }
              page={ page }
              rowsPerPage={ rowsPerPage }
              lastRowOnPage={ lastRowOnPage }
              handlePageChange={ handlePageChange }
              colSpan={ 3 }
              rows="collaborators"
              cellStyles={ { paddingTop: "12px" } }
            />
          ) : null }
        </Table>
      </TableContainer>
    );
  } else {
    return null;
  }
}
