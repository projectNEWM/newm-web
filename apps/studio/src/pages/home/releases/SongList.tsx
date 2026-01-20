import React, { MouseEvent, useEffect, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Link,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "@newm-web/theme";
import {
  ActionMenu,
  type ActionMenuItem,
  ActionMenuTrigger,
} from "@newm-web/components";
import {
  Button,
  TableCell,
  TablePagination,
  TableSkeleton,
  Tooltip,
} from "@newm-web/elements";
import {
  isMoreThanThresholdSecondsLater,
  resizeCloudinaryImage,
  useHlsJs,
  useWindowDimensions,
} from "@newm-web/utils";
import {
  MintingStatus as MintingStatusType,
  Song,
  SortOrder,
} from "@newm-web/types";
import { useNavigate } from "react-router-dom";
import { useFlags } from "launchdarkly-react-client-sdk";
import { ErrorOccurredMintingStatuses, MintingStatus } from "./MintingStatus";
import DeleteSongModal from "./DeleteSongModal";
import ReleaseDeletionHelp from "./ReleaseDeletionHelp";
import NoSongsYet from "./NoSongsYet";
import TableHead from "./Table/TableHead";
import { SongStreamPlaybackIcon } from "../../../components";
import {
  convertMillisecondsToSongFormat,
  getIsSongDeletable,
  useDeleteSongThunk,
  useFetchSongStreamThunk,
  useGetSongsQuery,
} from "../../../modules/song";
import {
  NEWM_SUPPORT_EMAIL,
  NEWM_SUPPORT_LINK,
  PlayerState,
  isSongEditable as isSongEditableUtil,
} from "../../../common";

interface SongListProps {
  query: string;
  rowHeight?: number;
  totalCountOfSongs: number;
}

const POLLING_INTERVALS = {
  MISSING_STREAM_URL: 5000,
  PROCESS_INCOMPLETE: 60000,
};

const FINAL_STEP_MINTING_PROCESS = [
  MintingStatusType.Declined,
  MintingStatusType.Minted,
];

export default function SongList({ totalCountOfSongs, query }: SongListProps) {
  const { webStudioAlbumPhaseOne } = useFlags();

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
  const [deleteSong] = useDeleteSongThunk();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuSong, setMenuSong] = useState<Song | null>(null);
  const [pendingDeleteSong, setPendingDeleteSong] = useState<Song | null>(null);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);

  const lastRowOnPage = (page - 1) * rowsPerPage + rowsPerPage;
  const totalPagesCount = Math.ceil(totalCountOfSongs / rowsPerPage);
  const remainingSongsOnLastPage = totalCountOfSongs % rowsPerPage;

  // Determines how many songs to request for the last page
  if (page === totalPagesCount) {
    songsToRequest =
      remainingSongsOnLastPage > 0 ? remainingSongsOnLastPage : rowsPerPage;
  }

  const [currentPollingInterval, setPollingInterval] = useState<
    number | undefined
  >();

  const {
    data: songData = [],
    isLoading,
    isSuccess,
  } = useGetSongsQuery(
    {
      limit: songsToRequest,
      offset: (page - 1) * rowsPerPage,
      ownerIds: ["me"],
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
          currentPlayingSongId: id,
          isReadyToPlay: false,
        }));
      },
      onSongEnded: () => {
        setPlayerState((prevState) => ({
          ...prevState,
          currentPlayingSongId: undefined,
          isReadyToPlay: false,
        }));
      },
      onStopSong: () => {
        setPlayerState((prevState) => ({
          ...prevState,
          currentPlayingSongId: undefined,
          isReadyToPlay: false,
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

    if (
      fetchStreamDataResp.data &&
      playerState.loadingSongId === fetchStreamDataResp.data.song.id
    ) {
      setPlayerState((prevState) => ({
        ...prevState,
        isReadyToPlay: true,
        song: fetchStreamDataResp.data?.song,
      }));
    }
  }, [
    playerState.loadingSongId,
    fetchStreamDataResp.isLoading,
    fetchStreamDataResp.data,
    playSong,
  ]);

  // when a songs stream information is ready - play the song
  useEffect(() => {
    if (playerState.isReadyToPlay && playerState.song) {
      playSong(playerState.song);
    }
  }, [
    playerState.song,
    playerState.loadingSongId,
    playerState.isReadyToPlay,
    playSong,
  ]);

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
    { songId, isSongEditable }: { isSongEditable: boolean; songId: string }
  ) => {
    event.stopPropagation();
    navigate(`${isSongEditable ? "edit-song" : "view-details"}/${songId}`);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    // Changing the page while playing song will stop the song
    stopSong();
  };

  const handleMenuOpen =
    (song: Song) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setMenuAnchorEl(event.currentTarget);
      setMenuSong(song);
    };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuSong(null);
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDeleteSong) return;

    if (pendingDeleteSong.id === playerState.currentPlayingSongId) {
      stopSong();
    }

    await deleteSong({
      redirectToReleases: Boolean(webStudioAlbumPhaseOne),
      request: {
        archived: true,
        songId: pendingDeleteSong.id,
      },
    });

    setIsDeleteModalActive(false);
    setMenuAnchorEl(null);
    setMenuSong(null);
    setPendingDeleteSong(null);
  };

  const getTooltipContent = (mintingStatus: MintingStatusType) => {
    const isErrorMintingStatus =
      ErrorOccurredMintingStatuses.includes(mintingStatus);

    let content: JSX.Element | string = "";

    if (isErrorMintingStatus) {
      content = (
        <span>
          An error has occurred. Please reach out to{ " " }
          <Link href={ `mailto:${NEWM_SUPPORT_EMAIL}` }>
            { NEWM_SUPPORT_EMAIL }
          </Link>{ " " }
          for assistance distributing your release.
        </span>
      );
    } else if (mintingStatus === MintingStatusType.Declined) {
      content =
        "One or more issues occurred resulting in your " +
        "distribution being declined. Please check your " +
        "email for information on how to correct and resubmit your release.";
    }

    return content;
  };

  const isMenuOpen = Boolean(menuAnchorEl);
  const menuSongIsEditable = menuSong
    ? isSongEditableUtil(menuSong.mintingStatus)
    : false;
  const isMenuSongDeletable = menuSong
    ? getIsSongDeletable(menuSong.mintingStatus)
    : false;
  const isMenuSongStale =
    !!menuSong &&
    isMoreThanThresholdSecondsLater(menuSong.createdAt, 1200) &&
    !menuSong.streamUrl;

  const actionMenuItems = useMemo<ReadonlyArray<ActionMenuItem>>(() => {
    if (!menuSong) return [];

    const items: ActionMenuItem[] = [
      {
        icon: menuSongIsEditable ? (
          <EditIcon fontSize="small" />
        ) : (
          <VisibilityIcon fontSize="small" />
        ),
        id: "view-edit",
        label: "View / Edit",
        onClick: () => {
          if (menuSongIsEditable) {
            navigate(`/home/releases/edit-song/${menuSong.id}`);
          } else {
            navigate(`/home/releases/view-details/${menuSong.id}`);
          }
        },
      },
      {
        color: "danger",
        disabled: !isMenuSongDeletable,
        icon: <DeleteIcon fontSize="small" />,
        id: "delete",
        label: "Delete",
        onClick: () => {
          setPendingDeleteSong(menuSong);
          setIsDeleteModalActive(true);
        },
        tooltip: !isMenuSongDeletable ? <ReleaseDeletionHelp /> : undefined,
        tooltipPlacement: "right",
      },
    ];

    return items;
  }, [isMenuSongDeletable, menuSong, menuSongIsEditable, navigate]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    setMenuAnchorEl(null);
    setMenuSong(null);
  }, [page, query, songData]);

  // Keep song in a playing state till the song has been filtered out
  useEffect(() => {
    const isSongFound = !!songData?.find((song) => {
      return song.id === playerState.currentPlayingSongId;
    });

    if (!isSongFound && !isLoading) {
      stopSong();
    }
  }, [playerState.currentPlayingSongId, songData, stopSong, isLoading]);

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
      <Table aria-label="Song List" size="small">
        <TableHead />
        <TableBody>
          { songData.map((song) => {
            const isSongEditable = isSongEditableUtil(song.mintingStatus);

            const isSongStale =
              isMoreThanThresholdSecondsLater(song.createdAt, 1200) &&
              !song.streamUrl;

            return (
              <TableRow
                key={ song.id }
                sx={
                  isSongStale
                    ? undefined
                    : {
                        "&:hover, &:focus": {
                          background: theme.colors.activeBackground,
                        },
                        WebkitTapHighlightColor: "transparent",
                        cursor: "pointer",
                      }
                }
                onClick={
                  isSongStale
                    ? undefined
                    : (event) =>
                        handleRowClick(event, {
                          isSongEditable,
                          songId: song.id,
                        })
                }
              >
                <TableCell>
                  <Box sx={ { alignItems: "center", display: "flex" } }>
                    { isSongStale ? (
                      <Tooltip
                        title={
                          "The file couldn't be uploaded. Please try again, " +
                          `or reach out to ${NEWM_SUPPORT_EMAIL} for further assistance.`
                        }
                      >
                        <CloseIcon
                          color="error"
                          sx={ {
                            height: "24px",
                            marginLeft: [0, 1],
                            marginRight: [2, 4],
                            width: "40px",
                          } }
                        />
                      </Tooltip>
                    ) : (
                      <IconButton
                        sx={ {
                          height: "40px",
                          marginLeft: [0, 1],
                          marginRight: [2, 4],
                          width: "40px",
                        } }
                        onClick={ handlePressPlayButton(song) }
                      >
                        <SongStreamPlaybackIcon
                          isSongPlaying={
                            song.id === playerState.currentPlayingSongId
                          }
                          isSongUploaded={ !!song.streamUrl }
                        />
                      </IconButton>
                    ) }
                    <img
                      alt="Album cover"
                      src={ resizeCloudinaryImage(song.coverArtUrl) }
                      style={ {
                        borderRadius: "4px",
                        height: "40px",
                        width: "40px",
                      } }
                    />
                    <Box
                      sx={ {
                        fontWeight: "500",
                        maxWidth: { sm: "none", xs: "110px" },
                        overflow: "auto",
                        paddingLeft: "12px",
                        whiteSpace: "nowrap",
                      } }
                    >
                      { song.title }
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={ { display: { sm: "table-cell", xs: "none" } } }>
                  <Tooltip title={ getTooltipContent(song.mintingStatus) }>
                    <Box
                      sx={ {
                        alignItems: "center",
                        display: "flex",
                      } }
                    >
                      <MintingStatus mintingStatus={ song.mintingStatus } />
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell sx={ { display: { lg: "table-cell", xs: "none" } } }>
                  { song.genres.join(", ") }
                </TableCell>

                <TableCell sx={ { display: { lg: "table-cell", xs: "none" } } }>
                  { /* // ! Phase 1 → NO. OF TRACKS = 1; single-track until /v1/releases supports 'trackCount' */ }
                  1
                </TableCell>

                <TableCell
                  sx={ {
                    display: { md: "table-cell", xs: "none" },
                    textAlign: "end",
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
                    textAlign: "end",
                    width: "0",
                  } }
                >
                  { isMenuSongStale ? (
                    <Tooltip
                      placement="right"
                      title="There was an issue processing your release's audio. Please contact support for assistance."
                    >
                      <Link
                        href={ NEWM_SUPPORT_LINK }
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Button
                          aria-label="Contact support"
                          color="music"
                          variant="secondary"
                          onClick={ (event) => event.stopPropagation() }
                        >
                          Support
                        </Button>
                      </Link>
                    </Tooltip>
                  ) : (
                    <ActionMenuTrigger onClick={ handleMenuOpen(song) } />
                  ) }
                </TableCell>
              </TableRow>
            );
          }) }
        </TableBody>

        { totalCountOfSongs > songData.length && (
          <TablePagination
            cellStyles={ { paddingTop: "12px" } }
            colSpan={ 6 }
            handlePageChange={ handlePageChange }
            lastRowOnPage={ lastRowOnPage }
            numberOfRows={ totalCountOfSongs }
            page={ page }
            rows="songs"
            rowsPerPage={ rowsPerPage }
          />
        ) }
      </Table>

      <ActionMenu
        anchorEl={ menuAnchorEl }
        anchorOrigin={ { horizontal: "left", vertical: "bottom" } }
        items={ actionMenuItems }
        menuPaperSx={ { marginLeft: 5 } }
        open={ isMenuOpen }
        transformOrigin={ { horizontal: "right", vertical: "top" } }
        onClose={ handleMenuClose }
      />

      { isDeleteModalActive && (
        <DeleteSongModal
          primaryAction={ handleDeleteConfirm }
          secondaryAction={ () => {
            setIsDeleteModalActive(false);
            setPendingDeleteSong(null);
          } }
        />
      ) }
    </TableContainer>
  ) : (
    <Typography>No songs matched your search.</Typography>
  );
}
