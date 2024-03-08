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
import { TableCell, TableHeadCell } from "@newm-web/elements";
import { resizeCloudinaryImage, useHlsJs } from "@newm-web/utils";
import theme from "@newm-web/theme";
import { PlayerState, Song } from "@newm-web/types";

import { useAppDispatch } from "../../common";
import { PlaySongAdvanced } from "../../components";
import {
  Invite,
  convertMillisecondsToSongFormat,
  songApi,
  useFetchSongStreamThunk,
  useGetCollaborationsQuery,
  useGetSongsQuery,
} from "../../modules/song";

interface InvitesTableProps {
  disabled?: boolean;
  invites: Invite[];
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

  const handleDecline = async (collaborationId: string) => {
    dispatch(
      songApi.endpoints.replyToCollaboration.initiate({
        accepted: false,
        collaborationId,
      })
    );
  };

  const handleAccept = (collaborationId: string) => {
    dispatch(
      songApi.endpoints.replyToCollaboration.initiate({
        accepted: true,
        collaborationId,
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
      sx={ {
        backgroundColor: theme.colors.black,
        borderRadius: "8px",
        maxHeight: "65vh",
      } }
    >
      <Table aria-label="Song list" size="small">
        <TableHead
          sx={ {
            backgroundColor: theme.colors.black,
            position: "sticky",
            top: "0",
            zIndex: 5,
          } }
        >
          <TableRow>
            <TableHeadCell>SONG NAME</TableHeadCell>
            <TableHeadCell>UPLOADED BY</TableHeadCell>
            <TableHeadCell>YOUR ROLE</TableHeadCell>
            <TableHeadCell>LENGTH</TableHeadCell>
            <TableHeadCell>SPLIT</TableHeadCell>
            <TableHeadCell sx={ { textAlign: "end" } }>ACTION</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { invites.map(
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
                <TableRow key={ collaborationId }>
                  <TableCell>
                    <Stack
                      sx={ {
                        alignItems: "center",
                        columnGap: 1.5,
                        flexDirection: "row",
                        whiteSpace: "nowrap",
                      } }
                    >
                      <PlaySongAdvanced
                        isPlaying={ songId === playerState.currentPlayingSongId }
                        song={ song }
                        onPlayPause={ handleSongPlayPause }
                      />
                      { coverArtUrl ? (
                        <img
                          alt="Song cover"
                          src={ resizeCloudinaryImage(coverArtUrl, {
                            height: 50,
                            width: 50,
                          }) }
                          style={ {
                            borderRadius: "4px",
                            height: "40px",
                            width: "40px",
                          } }
                        />
                      ) : (
                        <Stack sx={ { height: "40px", width: "40px" } }></Stack>
                      ) }
                      { title }
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={ {
                        alignItems: "center",
                        columnGap: 1.5,
                        flexDirection: "row",
                        whiteSpace: "nowrap",
                      } }
                    >
                      { pictureUrl ? (
                        <img
                          alt="Profile"
                          src={ pictureUrl }
                          style={ {
                            borderRadius: "50%",
                            height: "40px",
                            width: "40px",
                          } }
                        />
                      ) : (
                        <Stack sx={ { height: "40px", width: "40px" } }></Stack>
                      ) }
                      { firstName && lastName
                        ? `${firstName} ${lastName}`
                        : null }
                    </Stack>
                  </TableCell>
                  <TableCell>{ role }</TableCell>
                  <TableCell>
                    { duration
                      ? convertMillisecondsToSongFormat(duration)
                      : "--:--" }
                  </TableCell>
                  <TableCell>{ `${royaltyRate}%` }</TableCell>
                  <TableCell>
                    { status === "Waiting" ? (
                      <Stack
                        columnGap={ 2 }
                        flexDirection="row"
                        justifyContent="end"
                      >
                        <IconButton
                          aria-label={ `Decline ${title} song collaboration` }
                          disabled={ disabled }
                          sx={ {
                            "&.Mui-disabled": {
                              opacity: 0.5,
                            },
                            "&:hover, &.Mui-disabled": {
                              backgroundColor: theme.colors.red,
                              opacity: 0.9,
                            },
                            backgroundColor: theme.colors.red,
                            borderRadius: "8px",
                          } }
                          onClick={ () => handleDecline(collaborationId) }
                        >
                          <CloseIcon sx={ { color: theme.colors.white } } />
                        </IconButton>
                        <IconButton
                          aria-label={ `Accept ${title} song collaboration` }
                          disabled={ disabled }
                          sx={ {
                            "&.Mui-disabled": {
                              opacity: 0.5,
                            },
                            "&:hover, &.Mui-disabled": {
                              backgroundColor: theme.colors.green,
                              opacity: 0.9,
                            },
                            backgroundColor: theme.colors.green,
                            borderRadius: "8px",
                          } }
                          onClick={ () => handleAccept(collaborationId) }
                        >
                          <CheckIcon sx={ { color: theme.colors.white } } />
                        </IconButton>
                      </Stack>
                    ) : (
                      status
                    ) }
                  </TableCell>
                </TableRow>
              );
            }
          ) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvitesTable;
