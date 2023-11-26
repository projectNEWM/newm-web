import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import { Box, IconButton, Table, TableBody, TableContainer, TableRow, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import theme from "@newm.io/theme";
import { Button, Tooltip } from "@newm.io/studio/elements";
import {
  NEWM_SUPPORT_EMAIL,
  PlayerState,
  getResizedAlbumCoverImageUrl,
  isMoreThanThresholdSecondsLater,
  useWindowDimensions,
} from "@newm.io/studio/common";
import {
  MintingStatus as MintingStatusType,
  Song,
  SortOrder,
  convertMillisecondsToSongFormat,
  useFetchSongStreamThunk,
  useGetSongsQuery,
  useHlsJs,
} from "@newm.io/studio/modules/song";
import { SongStreamPlaybackIcon, TableCell, TablePagination, TableSkeleton } from "@newm.io/studio/components";
import { useNavigate } from "react-router-dom";
import { MintingStatus } from "./MintingStatus";
import NoSongsYet from "./NoSongsYet";
import TableHead from "./Table/TableHead";

interface SongListProps {
  rowHeight?: number;
  totalCountOfSongs: number;
  query: string;
}

const POLLING_INTERVALS = {
  MISSING_STREAM_URL: 5000,
  PROCESS_INCOMPLETE: 60000,
};

const FINAL_STEP_MINTING_PROCESS = [MintingStatusType.Declined, MintingStatusType.Minted];

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
  const [playerState, setPlayerState] = useState<PlayerState>({
    isReadyToPlay: false,
  });
  const [page, setPage] = useState(1);
  const [fetchStreamData, fetchStreamDataResp] = useFetchSongStreamThunk();

  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage;
  const totalPagesCount = Math.ceil(totalCountOfSongs / rowsPerPage);
  const remainingSongsOnLastPage = totalCountOfSongs % rowsPerPage;

  // Determines how many songs to request for the last page
  if (page === totalPagesCount) {
    songsToRequest = remainingSongsOnLastPage > 0 ? remainingSongsOnLastPage : rowsPerPage;
  }

  const [currentPollingInterval, setPollingInterval] = useState<number | undefined>();

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
      sortOrder: SortOrder.Desc,
    },
    {
      pollingInterval: currentPollingInterval,
    }
  );

  // Checks if any of the songs are missing a streamUrl
  useEffect(() => {
    const isStreamUrlMissing = songData.some((song) => !song.streamUrl);
    const isMintingProcessIncomplete = songData.some(
      (song) => !FINAL_STEP_MINTING_PROCESS.includes(song.mintingStatus)
    );

    if (isStreamUrlMissing) {
      setPollingInterval(POLLING_INTERVALS.MISSING_STREAM_URL);
    } else if (isMintingProcessIncomplete) {
      setPollingInterval(POLLING_INTERVALS.PROCESS_INCOMPLETE);
    }
  }, [songData]);

  const hlsJsParams = useMemo(
    () => ({
      onPlaySong: ({ id }: Song) => {
        setPlayerState((prevState) => ({
          ...prevState,
          isReadyToPlay: false,
          currentPlayingSongId: id,
        }));
      },
      onStopSong: () => {
        setPlayerState((prevState) => ({
          ...prevState,
          isReadyToPlay: false,
          currentPlayingSongId: undefined,
        }));
      },
      onSongEnded: () => {
        setPlayerState((prevState) => ({
          ...prevState,
          isReadyToPlay: false,
          currentPlayingSongId: undefined,
        }));
      },
    }),
    []
  );

  const { playSong, stopSong } = useHlsJs(hlsJsParams);

  /**
   * Plays and/or stops the song depending on if it's currently playing or not.
   */
  const handleSongPlayPause = (song: Song) => {
    const isSongPlaying = playerState.currentPlayingSongId;
    const isNewSong = song.id !== playerState.currentPlayingSongId;

    if (isSongPlaying) stopSong(song);
    if (isNewSong) {
      setPlayerState((prevState) => ({
        ...prevState,
        loadingSongId: song.id,
      }));
      fetchStreamData(song);
    }
  };

  // handles the stream metadata response when loading a song
  useEffect(() => {
    if (fetchStreamDataResp.isLoading) {
      return;
    }

    if (fetchStreamDataResp.data && playerState.loadingSongId === fetchStreamDataResp.data.song.id) {
      setPlayerState((prevState) => ({
        ...prevState,
        song: fetchStreamDataResp.data?.song,
        isReadyToPlay: true,
      }));
    }
  }, [playerState.loadingSongId, fetchStreamDataResp.isLoading, fetchStreamDataResp.data, playSong]);

  // when a songs stream information is ready - play the song
  useEffect(() => {
    if (playerState.isReadyToPlay && playerState.song) {
      playSong(playerState.song);
    }
  }, [playerState.song, playerState.loadingSongId, playerState.isReadyToPlay, playSong]);

  /**
   * Play song and ensure the event doesn't bubble up to the row
   * onClick handler, causing the song to be played twice.
   */
  const handlePressPlayButton = (song: Song) => (event: MouseEvent) => {
    handleSongPlayPause(song);
    event.stopPropagation();
  };

  const handleRowClick = (
    event: MouseEvent<HTMLButtonElement | HTMLTableRowElement>,
    { songId, hasStartedMintingProcess }: { songId: string; hasStartedMintingProcess: boolean }
  ) => {
    event.stopPropagation();
    navigate(`${hasStartedMintingProcess ? "view-details" : "edit-song"}/${songId}`);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    // Changing the page while playing song will stop the song
    stopSong();
  };

  const handleEmailSupport = (event: MouseEvent, songId: string) => {
    event.stopPropagation();

    const mailtoLink =
      `mailto:${NEWM_SUPPORT_EMAIL}` +
      "?subject=Support Request" +
      "&body=" +
      encodeURIComponent(`The following Song ID failed to encode: ${songId}`);

    window.location.href = mailtoLink;
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  // Keep song in a playing state till the song has been filtered out
  useEffect(() => {
    const isSongFound = !!songData?.find((song) => {
      return song.id === playerState.currentPlayingSongId;
    });

    if (!isSongFound) {
      stopSong();
    }
  }, [playerState.currentPlayingSongId, songData, stopSong]);

  // sets the # of rows per page depending on viewport height
  useEffect(() => {
    if (viewportHeight) {
      const rowsWithCurrentHeight = Math.abs(
        Math.floor((viewportHeight - headerHeight - footerHeight - bottomPadding) / rowHeight)
      );

      setRowsPerPage(rowsWithCurrentHeight ? rowsWithCurrentHeight : 1);
      setPage(1);
    }
  }, [viewportHeight]);

  if (isLoading) {
    return <TableSkeleton cols={ viewportWidth && viewportWidth > theme.breakpoints.values.sm ? 3 : 2 } />;
  }

  if (isSuccess && songData?.length === 0 && !query) {
    return <NoSongsYet />;
  }

  return songData?.length ? (
    <TableContainer>
      <Table size="small" aria-label="Song List">
        <TableHead />
        <TableBody>
          { songData.map((song) => {
            const hasStartedMintingProcess = song.mintingStatus !== MintingStatusType.Undistributed;

            const isSongStale = isMoreThanThresholdSecondsLater(song.createdAt, 1200) && !song.streamUrl;

            return (
              <TableRow
                onClick={
                  isSongStale
                    ? undefined
                    : (event) =>
                        handleRowClick(event, {
                          songId: song.id,
                          hasStartedMintingProcess,
                        })
                }
                key={ song.id }
                sx={
                  isSongStale
                    ? undefined
                    : {
                        cursor: "pointer",
                        WebkitTapHighlightColor: "transparent",
                        "&:hover, &:focus": {
                          background: theme.colors.activeBackground,
                        },
                      }
                }
              >
                <TableCell>
                  <Box sx={ { display: "flex", alignItems: "center" } }>
                    { isSongStale ? (
                      <Tooltip
                        title={
                          "The file couldn't be uploaded. Please try again, " +
                          `or reach out to ${NEWM_SUPPORT_EMAIL} for further assistance.`
                        }
                      >
                        <CloseIcon
                          sx={ {
                            marginRight: [2, 4],
                            marginLeft: [0, 1],
                            height: "24px",
                            width: "40px",
                          } }
                          color="error"
                        />
                      </Tooltip>
                    ) : (
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
                          isSongPlaying={ song.id === playerState.currentPlayingSongId }
                          isSongUploaded={ !!song.streamUrl }
                        />
                      </IconButton>
                    ) }
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
                <TableCell sx={ { display: { xs: "none", lg: "table-cell" } } }>{ song.genres.join(", ") }</TableCell>
                <TableCell
                  sx={ {
                    textAlign: "end",
                    display: { xs: "none", md: "table-cell" },
                  } }
                >
                  { song.duration ? convertMillisecondsToSongFormat(song.duration) : "--:--" }
                </TableCell>
                <TableCell
                  sx={ {
                    paddingLeft: [0, 1],
                    paddingRight: [1, 3],
                    width: "0",
                    textAlign: "end",
                  } }
                >
                  { isSongStale ? (
                    <Button variant="secondary" color="music" onClick={ (event) => handleEmailSupport(event, song.id) }>
                      Support
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      width="icon"
                      onClick={ (event) =>
                        handleRowClick(event, {
                          songId: song.id,
                          hasStartedMintingProcess,
                        })
                      }
                    >
                      { hasStartedMintingProcess ? (
                        <VisibilityIcon sx={ { color: theme.colors.music } } />
                      ) : (
                        <EditIcon sx={ { color: theme.colors.music } } />
                      ) }
                    </Button>
                  ) }
                </TableCell>
              </TableRow>
            );
          }) }
        </TableBody>

        { totalCountOfSongs > songData.length && (
          <TablePagination
            numberOfRows={ totalCountOfSongs }
            page={ page }
            rowsPerPage={ rowsPerPage }
            lastRowOnPage={ lastRowOnPage }
            handlePageChange={ handlePageChange }
            colSpan={ 5 }
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
