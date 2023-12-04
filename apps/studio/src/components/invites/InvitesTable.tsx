import { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  PlayerState,
  getResizedAlbumCoverImageUrl,
  useAppDispatch,
} from "../../common";
import { PlaySongAdvanced } from "../../components";
import { TableCell, TableHeadCell } from "@newm-web/elements";
import theme from "@newm-web/theme";
import {
  Invite,
  Song,
  convertMillisecondsToSongFormat,
  songApi,
  useFetchSongStreamThunk,
  useGetCollaborationsQuery,
  useGetSongsQuery,
  useHlsJs,
} from "../../modules/song";

interface InvitesTableProps {
  invites: Invite[];
  disabled?: boolean;
}

const InvitesTable: FunctionComponent<InvitesTableProps> = ({
  invites,
  disabled,
}) => {
  const dispatch = useAppDispatch();
  const [playerState, setPlayerState] = useState<PlayerState>({
    isReadyToPlay: false,
  });
  const [fetchStreamData, fetchStreamDataResp] = useFetchSongStreamThunk();
  const collaborationIds = invites.map(
    ({ collaborationId }) => collaborationId
  );

  const { data: collaborations = [] } = useGetCollaborationsQuery({
    ids: collaborationIds,
    inbound: true,
  });

  const songIds = collaborations.map(({ songId }) => songId);

  const { data: songData = [] } = useGetSongsQuery(
    {
      ids: songIds,
    },
    { skip: !songIds.length }
  );

  /**
   * An object mapping collaboration IDs to song IDs.
   *
   * @example
   * [{ id: 'collab1', songId: 'song1' }, { id: 'collab2', songId: 'song2' }]
   * the result object will be:
   * { collab1: 'song1', collab2: 'song2' }
   *
   */
  const songIdsByCollaborationId: Record<string, string> =
    collaborations.reduce((acc: { [key: string]: string }, collaboration) => {
      acc[collaboration.id] = collaboration.songId;
      return acc;
    }, {});

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

  const handleDecline = async (collaborationId: string) => {
    dispatch(
      songApi.endpoints.replyToCollaboration.initiate({
        collaborationId,
        accepted: false,
      })
    );
  };

  const handleAccept = (collaborationId: string) => {
    dispatch(
      songApi.endpoints.replyToCollaboration.initiate({
        collaborationId,
        accepted: true,
      })
    );
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
        song: fetchStreamDataResp.data?.song,
        isReadyToPlay: true,
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

  // Keep song in a playing state till the song has been filtered out
  useEffect(() => {
    const isSongFound = !!songData?.find((song) => {
      return song.id === playerState.currentPlayingSongId;
    });

    if (!isSongFound) {
      stopSong();
    }
  }, [playerState.currentPlayingSongId, songData, stopSong]);

  return (
    <TableContainer
      sx={{
        maxHeight: "65vh",
        backgroundColor: theme.colors.black,
        borderRadius: "8px",
      }}
    >
      <Table size="small" aria-label="Song list">
        <TableHead
          sx={{
            position: "sticky",
            top: "0",
            backgroundColor: theme.colors.black,
            zIndex: 5,
          }}
        >
          <TableRow>
            <TableHeadCell>SONG NAME</TableHeadCell>
            <TableHeadCell>UPLOADED BY</TableHeadCell>
            <TableHeadCell>YOUR ROLE</TableHeadCell>
            <TableHeadCell>LENGTH</TableHeadCell>
            <TableHeadCell>SPLIT</TableHeadCell>
            <TableHeadCell sx={{ textAlign: "end" }}>ACTION</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invites.map(
            ({
              collaborationId,
              coverArtUrl,
              duration,
              firstName,
              lastName,
              pictureUrl,
              role,
              royaltyRate,
              status,
              title,
            }) => {
              const songId = songIdsByCollaborationId[collaborationId];
              const song = songData.find((song) => song.id === songId);

              return (
                <TableRow key={collaborationId}>
                  <TableCell>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 1.5,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <PlaySongAdvanced
                        song={song}
                        isPlaying={songId === playerState.currentPlayingSongId}
                        onPlayPause={handleSongPlayPause}
                      />
                      {coverArtUrl ? (
                        <img
                          style={{
                            borderRadius: "4px",
                            height: "40px",
                            width: "40px",
                          }}
                          src={getResizedAlbumCoverImageUrl(coverArtUrl, {
                            width: 50,
                            height: 50,
                          })}
                          alt="Song cover"
                        />
                      ) : (
                        <Stack sx={{ height: "40px", width: "40px" }}></Stack>
                      )}
                      {title}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 1.5,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {pictureUrl ? (
                        <img
                          style={{
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                          }}
                          src={pictureUrl}
                          alt="Profile"
                        />
                      ) : (
                        <Stack sx={{ height: "40px", width: "40px" }}></Stack>
                      )}
                      {firstName && lastName
                        ? `${firstName} ${lastName}`
                        : null}
                    </Stack>
                  </TableCell>
                  <TableCell>{role}</TableCell>
                  <TableCell>
                    {duration
                      ? convertMillisecondsToSongFormat(duration)
                      : "--:--"}
                  </TableCell>
                  <TableCell>{`${royaltyRate}%`}</TableCell>
                  <TableCell>
                    {status === "Waiting" ? (
                      <Stack
                        flexDirection="row"
                        columnGap={2}
                        justifyContent="end"
                      >
                        <IconButton
                          aria-label={`Decline ${title} song collaboration`}
                          disabled={disabled}
                          onClick={() => handleDecline(collaborationId)}
                          sx={{
                            backgroundColor: theme.colors.red,
                            borderRadius: "8px",
                            "&:hover, &.Mui-disabled": {
                              backgroundColor: theme.colors.red,
                              opacity: 0.9,
                            },
                            "&.Mui-disabled": {
                              opacity: 0.5,
                            },
                          }}
                        >
                          <CloseIcon sx={{ color: theme.colors.white }} />
                        </IconButton>
                        <IconButton
                          aria-label={`Accept ${title} song collaboration`}
                          disabled={disabled}
                          onClick={() => handleAccept(collaborationId)}
                          sx={{
                            backgroundColor: theme.colors.green,
                            borderRadius: "8px",
                            "&:hover, &.Mui-disabled": {
                              backgroundColor: theme.colors.green,
                              opacity: 0.9,
                            },
                            "&.Mui-disabled": {
                              opacity: 0.5,
                            },
                          }}
                        >
                          <CheckIcon sx={{ color: theme.colors.white }} />
                        </IconButton>
                      </Stack>
                    ) : (
                      status
                    )}
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvitesTable;
