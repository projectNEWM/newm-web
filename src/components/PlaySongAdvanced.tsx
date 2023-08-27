import { FunctionComponent, useMemo } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { IconButton, Stack, SxProps } from "@mui/material";
import { useGetSongQuery, useHlsJs } from "modules/song";

interface PlaySongAdvancedProps {
  readonly id: string;
  readonly setPlayingSongId: (id: string | null) => void;
  readonly contentSx?: SxProps;
  readonly playingSongId?: string | null;
}

const PlaySongAdvanced: FunctionComponent<PlaySongAdvancedProps> = ({
  contentSx,
  id,
  playingSongId,
  setPlayingSongId,
}) => {
  const isSongPlaying = id === playingSongId;
  const { data: song, isLoading } = useGetSongQuery(id, { skip: !id });

  const hlsJsParams = useMemo(
    () => ({
      onPlaySong: () => setPlayingSongId(id),
      onStopSong: () => setPlayingSongId(null),
      onSongEnded: () => setPlayingSongId(null),
    }),
    [id, setPlayingSongId]
  );

  const { playSong, stopSong } = useHlsJs(hlsJsParams);

  if (isLoading || !song?.streamUrl) return null;

  return (
    <Stack
      sx={ {
        alignItems: "center",
        justifyContent: "center",
        ...contentSx,
      } }
    >
      <IconButton
        color="inherit"
        onClick={ () => (isSongPlaying ? stopSong(song) : playSong(song)) }
      >
        { isSongPlaying ? <StopIcon /> : <PlayArrowIcon /> }
      </IconButton>
    </Stack>
  );
};

export default PlaySongAdvanced;
