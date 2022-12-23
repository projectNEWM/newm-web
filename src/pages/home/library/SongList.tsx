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
import { Button, Typography } from "elements";
import { useWindowDimensions } from "common";
import { Song } from "modules/song";
import { TablePagination } from "components";
import { useNavigate } from "react-router-dom";
import EditPencilIcon from "assets/images/EditPencilIcon";
import { Pause, PlayArrow } from "@mui/icons-material";
import { MintingStatus } from "./MintingStatus";

interface SongListProps {
  songData: Song[] | null | undefined;
  rowHeight?: number;
  currentPlayingSong: Song | null;
  setCurrentPlayingSong: Dispatch<SetStateAction<Song | null>>;
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
  currentPlayingSong,
  setCurrentPlayingSong,
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

  // navigation for song edit page
  const navigate = useNavigate();

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
    setCurrentPlayingSong(null);
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

  /**
   * Song duration (milliseconds) provided from the getSong API,
   * formatted into a song time string of minutes and seconds.
   */
  const formatSongDurationToSongTime = (songDuration: number): string => {
    const date = new Date(songDuration);

    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedSongTime = minutes + ":" + seconds;

    return formattedSongTime;
  };

  const handleSongPlayPause = (song: Song) => {
    song.id === currentPlayingSong?.id
      ? setCurrentPlayingSong(null)
      : setCurrentPlayingSong({ ...song });
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
                  GENRE
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography
                  variant="body2"
                  fontWeight={ theme.typography.fontWeightSemiBold }
                  color="grey100"
                  textAlign="center"
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
                  onClick={ () => handleSongPlayPause(song) }
                  key={ song.id }
                  sx={ {
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                  } }
                >
                  <StyledTableCell>
                    <Box sx={ { display: "flex", alignItems: "center" } }>
                      <IconButton
                        onClick={ () => handleSongPlayPause(song) }
                        sx={ { paddingRight: 4, paddingLeft: 0 } }
                      >
                        { song.id === currentPlayingSong?.id ? (
                          <Pause
                            fontSize="large"
                            sx={ { color: theme.colors.white } }
                          />
                        ) : (
                          <PlayArrow
                            fontSize="large"
                            sx={ { color: theme.colors.white } }
                          />
                        ) }
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
                    <Box sx={ { display: "flex", alignItems: "center" } }>
                      <MintingStatus mintingStatus={ song.mintingStatus } />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={ { display: { xs: "none", md: "table-cell" } } }
                  >
                    <Typography color="grey100" variant="body2">
                      { song.genre }
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography
                      textAlign="center"
                      variant="body2"
                      color="grey100"
                    >
                      { song.duration
                        ? formatSongDurationToSongTime(song.duration)
                        : "-" }
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      variant="secondary"
                      width="icon"
                      onClick={ (e) => {
                        e.stopPropagation();
                        return navigate("edit-song", { state: { ...song } });
                      } }
                    >
                      <EditPencilIcon />
                    </Button>
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
