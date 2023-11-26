/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import theme from "@newm.io/theme";
import { Dispatch, SetStateAction } from "react";
import { Typography } from "@newm.io/studio/elements";
import { TableDropdownSelect, TablePagination } from "@newm.io/studio/components";
import { Song } from "@newm.io/studio/modules/song";
import AllCaughtUp from "./AllCaughtUp";

interface SongRoyaltiesListProps {
  songRoyalties: ReadonlyArray<Song>;
  rows: number;
  page: number;
  rowsPerPage: number;
  lastRowOnPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalCountOfSongs: number;
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
  borderColor: theme.colors.grey700,
  height: "48px",
});

export default function SongRoyaltiesList({
  songRoyalties,
  rows,
  page,
  rowsPerPage,
  lastRowOnPage,
  setPage,
  totalCountOfSongs,
}: SongRoyaltiesListProps) {
  const TABLE_WIDTH = 700;

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const getResizedAlbumCoverImageUrl = (url: string | undefined) => {
    if (!url) {
      return "";
    } else if (url.split("/")[2] == "res.cloudinary.com") {
      // replace upload params with smaller dimensions
      return url.replace(/upload\/[\w,]+\//, "upload/w_56,h_56,c_fill,r_max,q_auto,f_auto/");
    } else {
      return url;
    }
  };

  if (songRoyalties) {
    return (
      <Box sx={ { maxWidth: TABLE_WIDTH } }>
        <TableContainer
          sx={ {
            maxWidth: TABLE_WIDTH,
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

            <TableBody>
              { songRoyalties.map((row, index) => (
                <StyledTableRow key={ row.id } style={ (index + 1) % 2 ? { background: theme.colors.grey600 } : {} }>
                  <StyledTableCell>
                    <Box sx={ { display: "flex", alignItems: "center" } }>
                      <img
                        style={ {
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                        } }
                        src={ getResizedAlbumCoverImageUrl(row.coverArtUrl) }
                        alt="Album cover"
                      />
                      <Box
                        sx={ {
                          paddingLeft: "12px",
                          whiteSpace: "nowrap",
                          maxWidth: { xs: "200px", sm: "unset" },
                        } }
                      >
                        <Typography fontWeight={ 500 }>{ row.title }</Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography fontSize={ 12 } fontWeight={ 700 }>
                      --.--
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              )) }
            </TableBody>

            { totalCountOfSongs > rows && (
              <TablePagination
                numberOfRows={ totalCountOfSongs }
                page={ page }
                rowsPerPage={ rowsPerPage }
                lastRowOnPage={ lastRowOnPage }
                handlePageChange={ handlePageChange }
                colSpan={ 3 }
                rows="songs"
                cellStyles={ { paddingTop: "12px" } }
              />
            ) }
          </Table>
        </TableContainer>

        { songRoyalties.length === 0 ? (
          <Box sx={ { pt: 1 } }>
            <AllCaughtUp />
          </Box>
        ) : null }
      </Box>
    );
  } else {
    return <div></div>;
  }
}
