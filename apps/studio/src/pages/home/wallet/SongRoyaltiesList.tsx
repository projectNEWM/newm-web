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
import { getResizedAlbumCoverImageUrl } from "@newm-web/utils";
import { Song } from "@newm-web/types";
import { Dispatch, SetStateAction } from "react";
import { TablePagination, Typography } from "@newm-web/elements";
import currency from "currency.js";
import { selectUi, setWalletPortfolioTableFilter } from "../../../modules/ui";
import {
  TableDropdownMenuParameters,
  TableDropdownSelect,
} from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../common";

export interface SongRoyalties {
  royaltyAmount: number;
  royaltyCreatedAt?: number;
  song: Song;
}

interface SongRoyaltiesListProps {
  lastRowOnPage: number;
  page: number;
  rows: number;
  rowsPerPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  songRoyalties: Array<SongRoyalties>;
  totalCountOfSongs: number;
}

const royaltyPeriodFilters: ReadonlyArray<TableDropdownMenuParameters> = [
  { label: "Royalty Earnings: All Time", value: "All" },
  { label: "Royalty Earnings: Past Week", value: "Week" },
  { label: "Royalty Earnings: Past Month", value: "Month" },
  { label: "Royalty Earnings: Past Year", value: "Year" },
];

// create record with the number of days for royalty period filter option
const royaltyPeriodFilterDays: Record<string, number> = {
  All: 0,
  Week: 604800000,
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  Month: 2592000000,
  Year: 31536000000,
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },

  "&:nth-of-type(odd)": {
    backgroundColor: theme.colors.grey600,
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
  const { walletPortfolioTableFilter } = useAppSelector(selectUi);
  const dispatch = useAppDispatch();

  const TABLE_WIDTH = 700;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const handleRoyaltyPeriodChange = (tableFilter: string) => {
    dispatch(setWalletPortfolioTableFilter(tableFilter));
  };

  const isWithinFilterPeriod = (royaltiesCreatedDate: number | undefined) => {
    const filterPeriod = royaltyPeriodFilterDays[walletPortfolioTableFilter];
    if (walletPortfolioTableFilter === "All") {
      return true;
    } else if (royaltiesCreatedDate) {
      return royaltiesCreatedDate >= Date.now() - filterPeriod;
    } else {
      return false;
    }
  };

  if (songRoyalties.length) {
    return (
      <Box sx={ { maxWidth: TABLE_WIDTH } }>
        <TableContainer
          sx={ {
            maxWidth: TABLE_WIDTH,
          } }
        >
          { /* TODO: Add filtering on dates */ }
          <Table aria-label="Song List" size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Typography fontSize={ 12 } fontWeight={ 700 }>
                    SONG
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right" sx={ { pr: 0 } }>
                  <TableDropdownSelect
                    menuItems={ royaltyPeriodFilters }
                    selectedValue={ walletPortfolioTableFilter }
                    onChange={ handleRoyaltyPeriodChange }
                  />
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              { songRoyalties.map(
                (songRoyalty) =>
                  isWithinFilterPeriod(songRoyalty.royaltyCreatedAt) && (
                    <StyledTableRow key={ songRoyalty.song.id }>
                      <StyledTableCell>
                        <Box sx={ { alignItems: "center", display: "flex" } }>
                          <img
                            alt="Album cover"
                            src={ getResizedAlbumCoverImageUrl(
                              songRoyalty.song.coverArtUrl
                            ) }
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
                            <Typography fontWeight={ 500 }>
                              { songRoyalty.song.title }
                            </Typography>
                          </Box>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Typography fontSize={ 12 } fontWeight={ 700 }>
                          { currency(songRoyalty.royaltyAmount, {
                            pattern: "#!",
                            symbol: "Ɲ",
                          }).format() }
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
              ) }
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
      </Box>
    );
  } else {
    return <div></div>;
  }
}
