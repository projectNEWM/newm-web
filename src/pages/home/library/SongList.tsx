import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "theme";
import { Button, TableSkeleton } from "elements";
import {
  convertMillisecondsToSongFormat,
  getResizedAlbumCoverImageUrl,
  useWindowDimensions,
} from "common";
import { Song, useGetSongsQuery, useHlsJs } from "modules/song";
import { SongStreamPlaybackIcon, TableCell, TablePagination } from "components";
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

  const [isStreamUrlMissing, setIsStreamUrlMissing] = useState(true);

  const {
    data: songData = [],
    isLoading,
    isSuccess,
  } = useGetSongsQuery(
    {
      ownerIds: ["me"],
      offset: (page - 1) * rowsPerPage,
      limit: songsToRequest,
      phrase: query,
    },
    {
      // Refetch songs every minute if the streamUrl is missing for any song
      pollingInterval: isStreamUrlMissing ? 5000 : undefined,
    }
  );

  // Checks if any of the songs are missing a streamUrl
  useEffect(() => {
    const isAnySongStreamUrlMissing = songData.some((song) => !song.streamUrl);

    setIsStreamUrlMissing(isAnySongStreamUrlMissing);
  }, [songData]);

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
                "&:hover, &:focus": {
                  background: theme.colors.activeBackground,
                },
              } }
            >
              <TableCell>
                <Box sx={ { display: "flex", alignItems: "center" } }>
                  <IconButton
                    onClick={ handlePressPlayButton(song) }
                    sx={ {
                      marginRight: [2, 4],
                      marginLeft: [0, 1],
                      height: "40px",
                      width: "40px",
                    } }
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
              </TableCell>
              <TableCell sx={ { display: { xs: "none", sm: "table-cell" } } }>
                <Box
                  sx={ {
                    display: "flex",
                    alignItems: "center",
                  } }
                >
                  <MintingStatus mintingStatus={ song.mintingStatus } />
                </Box>
              </TableCell>
              <TableCell sx={ { display: { xs: "none", lg: "table-cell" } } }>
                { song.genres.join(", ") }
              </TableCell>
              <TableCell
                sx={ {
                  textAlign: "end",
                  display: { xs: "none", md: "table-cell" },
                } }
              >
                { song.duration
                  ? convertMillisecondsToSongFormat(song.duration)
                  : "--:--" }
              </TableCell>
              <TableCell
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
              </TableCell>
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
