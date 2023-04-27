import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "theme";
import { Button, TableSkeleton } from "elements";
import { useWindowDimensions } from "common";
import { Song, useGetSongsQuery, useHlsJs } from "modules/song";
import { SongStreamPlaybackIcon, TablePagination } from "components";
import { useNavigate } from "react-router-dom";
import EditPencilIcon from "assets/images/EditPencilIcon";
import { MintingStatus } from "./MintingStatus";
import NoSongsYet from "./NoSongsYet";
import TableHead from "./Table/TableHead";

interface SongListProps {
  rowHeight?: number;
  totalCountOfSongs: number;
  query: string;
}

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

export default function SongList({ totalCountOfSongs, query }: SongListProps) {
  const navigate = useNavigate();
  const headerHeight = 245;
  const footerHeight = 40;
  const bottomPadding = 30;
  const rowHeight = 65;
  const viewportWidth = useWindowDimensions()?.width;
  const viewportHeight = useWindowDimensions()?.height;
  const [rowsPerPage, setRowsPerPage] = useState(1);
  let songsToRequest = rowsPerPage;
  const [currentPlayingSongId, setCurrentPlayingSongId] = useState<string>();
  const [page, setPage] = useState(1);

  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage;
  const totalPagesCount = Math.ceil(totalCountOfSongs / rowsPerPage);
  const remainingSongsOnLastPage = totalCountOfSongs % rowsPerPage;

  // Determines how many songs to request for the last page
  if (page === totalPagesCount) {
    songsToRequest =
      remainingSongsOnLastPage > 0 ? remainingSongsOnLastPage : rowsPerPage;
  }

  const {
    data: songData = [],
    isLoading,
    isSuccess,
  } = useGetSongsQuery({
    ownerIds: ["me"],
    offset: page - 1,
    limit: songsToRequest,
    phrase: query,
  });

  const hlsJsParams = useMemo(
    () => ({
      onPlaySong: ({ id }: Song) => setCurrentPlayingSongId(id),
      onStopSong: () => setCurrentPlayingSongId(undefined),
      onSongEnded: () => setCurrentPlayingSongId(undefined),
    }),
    []
  );

  const { playSong, stopSong } = useHlsJs(hlsJsParams);

  /**
   * Plays and/or stops the song depending on if it's currently playing or not.
   */
  const handleSongPlayPause = (song: Song) => {
    const isSongPlaying = !!currentPlayingSongId;
    const isNewSong = song.id !== currentPlayingSongId;

    if (isSongPlaying) stopSong(song);
    if (isNewSong) playSong(song);
  };

  /**
   * Play song and ensure the event doesn't bubble up to the row
   * onClick handler, causing the song to be played twice.
   */
  const handlePressPlayButton = (song: Song) => (event: MouseEvent) => {
    handleSongPlayPause(song);
    event.stopPropagation();
  };

  const getResizedAlbumCoverImageUrl = (url: string | undefined) => {
    if (!url) {
      return "";
    } else if (url.split("/")[2] == "res.cloudinary.com") {
      const stringToReplace = url.includes("upload/c_fit,w_5000,h_5000")
        ? "upload/c_fit,w_5000,h_5000"
        : "upload/";

      return url.replace(
        stringToReplace,
        "upload/w_40,h_40,c_fill,q_auto,f_auto/"
      );
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

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    // Changing the page while playing song will stop the song
    stopSong();
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  // Keep song in a playing state till the song has been filtered out
  useEffect(() => {
    const isSongFound = !!songData?.find((song) => {
      return song.id === currentPlayingSongId;
    });

    if (!isSongFound) {
      stopSong();
    }
  }, [songData, currentPlayingSongId, stopSong]);

  // sets the # of rows per page depending on viewport height
  useEffect(() => {
    if (viewportHeight) {
      const rowsWithCurrentHeight = Math.abs(
        Math.floor(
          (viewportHeight - headerHeight - footerHeight - bottomPadding) /
            rowHeight
        )
      );

      setRowsPerPage(rowsWithCurrentHeight ? rowsWithCurrentHeight : 1);
      setPage(1);
    }
  }, [viewportHeight]);

  if (isLoading) {
    return (
      <TableSkeleton
        cols={
          viewportWidth && viewportWidth > theme.breakpoints.values.sm ? 3 : 2
        }
      />
    );
  }

  if (isSuccess && songData?.length === 0 && !query) {
    return <NoSongsYet />;
  }

  return songData?.length ? (
    <TableContainer>
      <Table size="small" aria-label="Song List">
        <TableHead />
        <TableBody>
          { songData.map((song) => (
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
                    onClick={ handlePressPlayButton(song) }
                    sx={ { paddingRight: [2, 4], paddingLeft: [0, 1] } }
                  >
                    <SongStreamPlaybackIcon
                      isSongPlaying={ song.id === currentPlayingSongId }
                      isSongUploaded={ !!song.streamUrl }
                    />
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
                { song.genres.join(", ") }
              </StyledTableCell>
              <StyledTableCell
                sx={ {
                  textAlign: "end",
                  display: { xs: "none", md: "table-cell" },
                } }
              >
                { song.duration
                  ? formatSongDurationToSongLength(song.duration)
                  : "--:--" }
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
        </TableBody>
        { totalCountOfSongs > songData.length && (
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
  ) : (
    <Typography>No songs matched your search.</Typography>
  );
}
