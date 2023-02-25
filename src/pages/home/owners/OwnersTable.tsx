import * as React from "react";
import { styled } from "@mui/material/styles";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "theme";
import { Dispatch, SetStateAction } from "react";
import { Owner, useWindowDimensions } from "common";
import StatusBadge from "components/owners/StatusBadge";
import { TablePagination } from "components";
import StyledPagination from "components/styled/StyledPagination";

const StyledHeaderCell = styled(TableCell)({
  paddingTop: "16px",
  paddingBottom: "16px",
  borderBottom: `1px solid ${theme.colors.grey500}`,

  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "17px",
  color: theme.colors.grey100,
});

const StyledTableCell = styled(TableCell)({
  paddingTop: "10px",
  paddingBottom: "10px",
  borderTop: `1px solid ${theme.colors.grey500}`,
  borderBottom: `1px solid ${theme.colors.grey500}`,

  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: theme.colors.white,
});

const rowsPerPage = 25;
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
  const footerHeight = 40;
  const bottomPadding = 30;
  const windowHeight = useWindowDimensions()?.height;
  const tableHeight = windowHeight
    ? windowHeight - headerHeight - footerHeight - bottomPadding
    : 200;
  // Used to avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 1 ? Math.max(0, page * rowsPerPage - ownersData.length) : 0;
  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const getResizedAlbumCoverImageUrl = (url: string | undefined) => {
    if (!url) {
      return "";
    } else if (url.split("/")[2] == "res.cloudinary.com") {
      return url.replace(
        "upload/",
        "upload/w_56,h_56,c_fill,r_max,q_auto,f_auto/"
      );
    } else {
      return url;
    }
  };

  if (ownersData) {
    return (
      <div style={ { width: "100%" } }>
        <TableContainer sx={ { height: tableHeight } }>
          <Table
            size="small"
            aria-label="Owners pagination table"
            sx={ { height: "max-content" } }
          >
            <TableHead>
              <TableRow>
                <StyledHeaderCell
                  sx={ { display: { xs: "none", sm: "table-cell" } } }
                >
                  COLLABORATORS
                </StyledHeaderCell>
                <StyledHeaderCell
                  sx={ { display: { xs: "none", sm: "table-cell" } } }
                >
                  OWNER OF
                </StyledHeaderCell>
                <StyledHeaderCell
                  sx={ {
                    textAlign: "end",
                    display: { xs: "none", sm: "table-cell" },
                  } }
                >
                  EMAIL
                </StyledHeaderCell>
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
                        sx={ { display: "flex", alignItems: "center" } }
                        overflow="auto"
                        whiteSpace="nowrap"
                      >
                        { row.status ? (
                          <Box
                            sx={ {
                              marginRight: "14px",
                              display: { xs: "none", sm: "flex" },
                            } }
                          >
                            <StatusBadge status={ row.status } />
                          </Box>
                        ) : null }
                        <img
                          style={ {
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            marginRight: "12px",
                          } }
                          src={ getResizedAlbumCoverImageUrl(row.ownerPhoto) }
                          alt="Album cover"
                        />
                        { row.name }
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell
                      sx={ {
                        overflow: "auto",
                        whiteSpace: "nowrap",
                        maxWidth: ["154px", "unset"],
                      } }
                    >
                      { row.num_songs }
                    </StyledTableCell>
                    <StyledTableCell
                      sx={ {
                        textAlign: "end",
                        display: { xs: "none", sm: "table-cell" },
                      } }
                    >
                      { row.email }
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
      </div>
    );
  } else {
    return null;
  }
}
