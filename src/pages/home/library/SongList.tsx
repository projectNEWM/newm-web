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
import { useEffect, useState } from "react";
import { Button } from "elements";
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
  currentPlayingSongId: string | null;
  onSongPlayPause: (song: Song) => void;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const StyledHeaderCell = styled(TableCell)({
  paddingTop: "16px",
  paddingBottom: "16px",
  paddingLeft: "24px",
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

export default function SongList({
  songData,
  rowHeight = 65,
  currentPlayingSongId,
  onSongPlayPause,
  page,
  onPageChange,
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

  const getResizedAlbumCoverImageUrl = (url: string | undefined) => {
    if (!url) {
      return "";
    } else if (url.split("/")[2] == "res.cloudinary.com") {
      return url.replace("upload/", "upload/w_40,h_40,c_fill,q_auto,f_auto/");
    } else {
      return url;
    }
  };

  /**
   * Song duration (milliseconds) provided from the getSong API,
   * formatted into a song time string of minutes and seconds.
   */
  const formatSongDurationToSongLength = (songDuration: number): string => {
    const songLength = new Date(songDuration);

    const minutes = songLength.getMinutes();
    const seconds = songLength.getSeconds();

    const formattedSongLength = minutes + ":" + seconds;

    return formattedSongLength;
  };

  if (songData) {
    return (
      <TableContainer>
        <Table size="small" aria-label="Song List">
          <TableHead>
            <TableRow>
              <StyledHeaderCell>SONG NAME</StyledHeaderCell>
              <StyledHeaderCell
                sx={ { display: { xs: "none", sm: "table-cell" } } }
              >
                MINTING
              </StyledHeaderCell>
              <StyledHeaderCell
                sx={ { display: { xs: "none", lg: "table-cell" } } }
              >
                GENRE
              </StyledHeaderCell>
              <StyledHeaderCell
                sx={ {
                  textAlign: "end",
                  display: { xs: "none", md: "table-cell" },
                } }
              >
                LENGTH
              </StyledHeaderCell>
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
                  onClick={ () => onSongPlayPause(song) }
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
                        onClick={ () => onSongPlayPause(song) }
                        sx={ { paddingRight: [2, 4], paddingLeft: [0, 1] } }
                      >
                        { song.id === currentPlayingSongId ? (
                          <Pause
                            fontSize="medium"
                            sx={ { color: theme.colors.white } }
                          />
                        ) : (
                          <PlayArrow
                            fontSize="medium"
                            sx={ { color: theme.colors.white } }
                          />
                        ) }
                      </IconButton>
                      <img
                        style={ {
                          borderRadius: "4px",
                          width: "40px",
                          height: "40px",
                        } }
                        src={ getResizedAlbumCoverImageUrl(song.coverArtUrl) }
                        alt="Album cover"
                      />
                      <Box
                        sx={ {
                          fontWeight: "500",
                          paddingLeft: "12px",
                          overflow: "auto",
                          whiteSpace: "nowrap",
                          maxWidth: { xs: "110px", sm: "none" },
                        } }
                      >
                        { song.title }
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={ { display: { xs: "none", sm: "table-cell" } } }
                  >
                    <Box
                      sx={ {
                        display: "flex",
                        alignItems: "center",
                      } }
                    >
                      <MintingStatus mintingStatus={ song.mintingStatus } />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={ { display: { xs: "none", lg: "table-cell" } } }
                  >
                    { song.genre }
                  </StyledTableCell>
                  <StyledTableCell
                    sx={ {
                      textAlign: "end",
                      display: { xs: "none", md: "table-cell" },
                    } }
                  >
                    { song.duration
                      ? formatSongDurationToSongLength(song.duration)
                      : "-" }
                  </StyledTableCell>
                  <StyledTableCell
                    sx={ {
                      paddingLeft: [0, 1],
                      paddingRight: [1, 3],
                      width: "0",
                    } }
                  >
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
              handlePageChange={ onPageChange }
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
