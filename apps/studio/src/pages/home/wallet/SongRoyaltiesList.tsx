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
import theme from "@newm-web/theme";
import { Dispatch, SetStateAction } from "react";
import { TablePagination, Typography } from "@newm-web/elements";
import AllCaughtUp from "./AllCaughtUp";
import { TableDropdownSelect } from "../../../components";
import { Song } from "../../../modules/song";

interface SongRoyaltiesListProps {
  lastRowOnPage: number;
  page: number;
  rows: number;
  rowsPerPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  songRoyalties: ReadonlyArray<Song>;
  totalCountOfSongs: number;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },

  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const getResizedAlbumCoverImageUrl = (url: string | undefined) => {
    if (!url) {
      return "";
    } else if (url.split("/")[2] === "res.cloudinary.com") {
      // replace upload params with smaller dimensions
      return url.replace(
        /upload\/[\w,]+\//,
        "upload/w_56,h_56,c_fill,r_max,q_auto,f_auto/"
      );
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
          <Table aria-label="Song List" size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Typography fontSize={ 12 } fontWeight={ 700 }>
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
                <StyledTableRow
                  key={ row.id }
                  style={
                    (index + 1) % 2 ? { background: theme.colors.grey600 } : {}
                  }
                >
                  <StyledTableCell>
                    <Box sx={ { alignItems: "center", display: "flex" } }>
                      <img
                        alt="Album cover"
                        src={ getResizedAlbumCoverImageUrl(row.coverArtUrl) }
                        style={ {
                          borderRadius: "50%",
                          height: "40px",
                          width: "40px",
                        } }
                      />
                      <Box
                        sx={ {
                          maxWidth: { sm: "unset", xs: "200px" },
                          paddingLeft: "12px",
                          whiteSpace: "nowrap",
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
                cellStyles={ { paddingTop: "12px" } }
                colSpan={ 3 }
                handlePageChange={ handlePageChange }
                lastRowOnPage={ lastRowOnPage }
                numberOfRows={ totalCountOfSongs }
                page={ page }
                rows="songs"
                rowsPerPage={ rowsPerPage }
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
