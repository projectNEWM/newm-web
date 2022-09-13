/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Typography } from "elements";
import { SongRoyalties, useWindowDimensions } from "common";
import { TableDropdownSelect, TablePagination } from "components";
import AllCaughtUp from "./AllCaughtUp";

interface SongRoyaltiesListProps {
  songRoyalties: SongRoyalties[] | null | undefined;
  rowHeight?: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)({
  borderColor: theme.colors.black100,
  height: "48px",
});

export default function SongRoyaltiesList({
  songRoyalties,
  rowHeight = 48,
  page,
  setPage,
}: SongRoyaltiesListProps) {
  const windowHeight = useWindowDimensions()?.height;
  const tableRef = useRef<any>();
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const tableYPos = tableRef && tableRef.current?.getBoundingClientRect().y;
  const footerHeight = 70;
  const tableWidth = "700px";
  // Used to avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = songRoyalties
    ? page > 1
      ? Math.max(0, page * rowsPerPage - songRoyalties.length)
      : 0
    : 0;
  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage;

  // sets the # of rows per page depending on viewport height
  useEffect(() => {
    setRowsPerPage(
      windowHeight
        ? Math.floor((windowHeight - tableYPos - footerHeight) / 48) // 48 = height of each row
        : 8
    );
  }, [windowHeight, tableYPos]);

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

  if (songRoyalties) {
    return (
      <Box sx={ { maxWidth: tableWidth } }>
        <TableContainer
          sx={ {
            maxWidth: tableWidth,
            paddingRight: { xs: 0, md: 5.5 },
          } }
        >
          <Table size="small" aria-label="Song List">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Typography fontWeight={ 700 } fontSize={ 12 }>
                    SONG
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right" sx={ { pr: 0 } }>
                  <TableDropdownSelect />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody ref={ tableRef }>
              { songRoyalties
                .slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
                .map((row, index) => (
                  <StyledTableRow
                    key={ row.id }
                    style={
                      (index + 1) % 2
                        ? { background: theme.colors.grey600 }
                        : {}
                    }
                  >
                    <StyledTableCell>
                      <Box sx={ { display: "flex", alignItems: "center" } }>
                        <img
                          style={ {
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                          } }
                          src={ getResizedAlbumCoverImageUrl(row.songCoverArt) }
                          alt="Album cover"
                        />
                        <Box
                          sx={ {
                            paddingLeft: "12px",
                            overflow: "scroll",
                            whiteSpace: "nowrap",
                            maxWidth: { xs: "200px", sm: "unset" },
                          } }
                        >
                          <Typography fontSize={ 12 } fontWeight={ 500 }>
                            { row.songName }
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography fontSize={ 12 } fontWeight={ 700 }>
                        ${ row.royaltiesAccrued }
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                )) }
              { emptyRows > 0 && (
                <TableRow style={ { height: rowHeight * emptyRows } }>
                  <StyledTableCell colSpan={ 3 } />
                </TableRow>
              ) }
            </TableBody>
            { songRoyalties.length > rowsPerPage ? (
              <TablePagination
                numberOfRows={ songRoyalties.length }
                page={ page }
                rowsPerPage={ rowsPerPage }
                lastRowOnPage={ lastRowOnPage }
                handlePageChange={ handlePageChange }
                colSpan={ 3 }
                rows="songs"
                cellStyles={ { paddingTop: "12px" } }
              />
            ) : null }
          </Table>
        </TableContainer>

        { songRoyalties.length < rowsPerPage ? (
          <Box sx={ { width: tableWidth, pt: 1 } }>
            <AllCaughtUp />
          </Box>
        ) : null }
      </Box>
    );
  } else {
    return <div></div>;
  }
}
