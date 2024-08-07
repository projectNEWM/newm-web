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
  Typography,
} from "@mui/material";
import theme from "@newm-web/theme";
import { resizeCloudinaryImage } from "@newm-web/utils";
import { Song } from "@newm-web/types";
import { Dispatch, SetStateAction } from "react";
import { TablePagination } from "@newm-web/elements";
import LegacyAllCaughtUp from "./LegacyAllCaughtUp";
import LegacyTableDropdownSelect from "./LegacyTableDropdownSelect";

interface LegacySongRoyaltiesListProps {
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

export default function LegacySongRoyaltiesList({
  songRoyalties,
  rows,
  page,
  rowsPerPage,
  lastRowOnPage,
  setPage,
  totalCountOfSongs,
}: LegacySongRoyaltiesListProps) {
  const TABLE_WIDTH = 700;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
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
                  <LegacyTableDropdownSelect />
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
                        src={ resizeCloudinaryImage(row.coverArtUrl) }
                        style={ {
                          borderRadius: "50%",
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
            <LegacyAllCaughtUp />
          </Box>
        ) : null }
      </Box>
    );
  } else {
    return <div></div>;
  }
}
