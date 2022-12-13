import * as React from "react";
import { styled } from "@mui/material/styles";

import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "theme";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Typography } from "elements";
import { useWindowDimensions } from "common";
import PlayButton from "assets/images/PlayButton";
import { Song } from "modules/song";
import { TablePagination } from "components";
import { Link } from "react-router-dom";
import CloseCircleLine from "assets/images/CloseCircleLine";

interface SongListProps {
  songData: Song[] | null | undefined;
  rowHeight?: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const StyledTableCell = styled(TableCell)({
  paddingTop: "20px",
  paddingBottom: "20px",
  paddingLeft: "0px",
  borderTop: `1px solid ${theme.colors.grey600}`,
  borderBottom: `1px solid ${theme.colors.grey600}`,
});

export default function SongList({
  songData,
  rowHeight = 65,
  page,
  setPage,
}: SongListProps) {
  const headerHeight = 245;
  const footerHeight = 40;
  const bottomPadding = 30;
  const [rowsPerPage, setRowsPerPage] = useState(0);
  // Used to avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = songData
    ? page > 1
      ? Math.max(0, page * rowsPerPage - songData.length)
      : 0
    : 0;
  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage;

  // determines how many rows to display per page
  const windowHeight = useWindowDimensions()?.height;

  // sets the # of rows per page depending on viewport height
  useEffect(() => {
    setRowsPerPage(
      windowHeight
        ? Math.floor(
            (windowHeight - headerHeight - footerHeight - bottomPadding) /
              rowHeight
          )
        : 5
    );
  }, [windowHeight, rowHeight]);

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
      return url.replace("upload/", "upload/w_56,h_56,c_fill,q_auto,f_auto/");
    } else {
      return url;
    }
  };

  if (songData) {
    return (
      <TableContainer>
        <Table size="small" aria-label="Song List">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography
                  variant="body2"
                  fontWeight={ theme.typography.fontWeightSemiBold }
                  color="grey100"
                >
                  SONG
                </Typography>
              </StyledTableCell>
              <StyledTableCell
                sx={ { display: { xs: "none", md: "table-cell" } } }
              >
                <Typography
                  variant="body2"
                  fontWeight={ theme.typography.fontWeightSemiBold }
                  color="grey100"
                >
                  MINTING
                </Typography>
              </StyledTableCell>
              <StyledTableCell
                sx={ { display: { xs: "none", md: "table-cell" } } }
              >
                <Typography
                  variant="body2"
                  fontWeight={ theme.typography.fontWeightSemiBold }
                  color="grey100"
                >
                  MARKETPLACE
                </Typography>
              </StyledTableCell>
              <StyledTableCell
                sx={ { display: { xs: "none", md: "table-cell" } } }
              >
                <Typography
                  variant="body2"
                  fontWeight={ theme.typography.fontWeightSemiBold }
                  color="grey100"
                >
                  GENRE
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography
                  variant="body2"
                  fontWeight={ theme.typography.fontWeightSemiBold }
                  color="grey100"
                >
                  TIME
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { songData
              .slice(
                (page - 1) * rowsPerPage,
                (page - 1) * rowsPerPage + rowsPerPage
              )
              .map((song) => (
                <TableRow
                  key={ song.id }
                  sx={ {
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                  } }
                >
                  <StyledTableCell>
                    <Box sx={ { display: "flex", alignItems: "center" } }>
                      <IconButton sx={ { paddingRight: 4, paddingLeft: 0 } }>
                        <PlayButton />
                      </IconButton>
                      <img
                        style={ {
                          borderRadius: "4px",
                          width: "56px",
                          height: "56px",
                        } }
                        src={ getResizedAlbumCoverImageUrl(song.coverArtUrl) }
                        alt="Album cover"
                      />
                      <Box
                        sx={ {
                          paddingLeft: "12px",
                          overflow: "auto",
                          whiteSpace: "nowrap",
                          maxWidth: { xs: "148px", md: "auto" },
                        } }
                      >
                        { song.title }
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={ { display: { xs: "none", md: "table-cell" } } }
                  >
                    { song.mintingStatus ? (
                      song.mintingStatus
                    ) : (
                      <Box sx={ { display: "flex", alignItems: "center" } }>
                        <CloseCircleLine />
                        <Typography
                          sx={ { paddingLeft: 1 } }
                          color="grey100"
                          variant="body2"
                        >
                          Not Earning
                        </Typography>
                      </Box>
                    ) }
                  </StyledTableCell>
                  <StyledTableCell
                    sx={ { display: { xs: "none", md: "table-cell" } } }
                  >
                    { song.marketplaceStatus ? (
                      song.marketplaceStatus
                    ) : (
                      <Box sx={ { display: "flex", alignItems: "center" } }>
                        <CloseCircleLine />
                        <Typography
                          sx={ { paddingLeft: 1 } }
                          color="grey100"
                          variant="body2"
                        >
                          Not Selling
                        </Typography>
                      </Box>
                    ) }
                  </StyledTableCell>
                  <StyledTableCell
                    sx={ { display: { xs: "none", md: "table-cell" } } }
                  >
                    <Typography color="grey100" variant="body2">
                      { song.genre }
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    { song.duration ? (
                      song.duration
                    ) : (
                      <Typography variant="body2" color="grey100">
                        { new Date().getMinutes() }:{ new Date().getSeconds() }
                      </Typography>
                    ) }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link to="edit-song" state={ { ...song } }>
                      Edit
                    </Link>
                  </StyledTableCell>
                </TableRow>
              )) }
            { emptyRows > 0 && (
              <TableRow style={ { height: rowHeight * emptyRows } }>
                <StyledTableCell colSpan={ 3 } />
              </TableRow>
            ) }
          </TableBody>
          { songData.length > rowsPerPage ? (
            <TablePagination
              numberOfRows={ songData.length }
              page={ page }
              rowsPerPage={ rowsPerPage }
              lastRowOnPage={ lastRowOnPage }
              handlePageChange={ handlePageChange }
              colSpan={ 3 }
              rows="songs"
              cellStyles={ { paddingTop: "12px" } }
            />
          ) : (
            ""
          ) }
        </Table>
      </TableContainer>
    );
  } else {
    return <div></div>;
  }
}
