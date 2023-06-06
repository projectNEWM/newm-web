import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { IconButton, Stack } from "@mui/material";
import { PlayArrow, Stop } from "@mui/icons-material";
import {
  Song,
  useGetSongCountQuery,
  useGetSongsQuery,
  useHlsJs,
} from "modules/song";
import { Typography } from "elements";
import theme from "theme";
import { getResizedAlbumCoverImageUrl, useWindowDimensions } from "common";
import placeholderBackground from "assets/images/bg-img.png";

const Songs: FunctionComponent = () => {
  const { userId = "" } = useParams();
  const limit = 25;
  const [offset, setOffset] = useState(0);
  const [songs, setSongs] = useState<Song[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [currentPlayingSongId, setCurrentPlayingSongId] = useState<string>();

  const windowWidth = useWindowDimensions()?.width;
  const { data: { count: totalCountOfSongs = 0 } = {} } = useGetSongCountQuery({
    ownerIds: [userId],
  });

  const isWidthAboveMd =
    windowWidth && windowWidth > theme.breakpoints.values.md;

  // TODO: Filter out unminted songs
  const { data: songData = [], isLoading } = useGetSongsQuery({
    ownerIds: [userId],
    offset,
    limit,
  });

  const [ref, inView] = useInView({
    threshold: 0,
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
   * Handles infinite scrolling: modifies offset to trigger a fetch for more songs.
   * If there are no more songs to fetch, sets hasMore to false.
   */
  useEffect(() => {
    if (inView && !isLoading && songs.length < totalCountOfSongs) {
      setSongs((prevSongs) => [...prevSongs, ...songData]);
      setOffset((prevOffset) => prevOffset + limit);
    } else if (songs.length >= totalCountOfSongs) {
      setHasMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, songData, totalCountOfSongs, isLoading]);

  return (
    <Stack
      columnGap={ 2 }
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      mt={ 7.5 }
      rowGap={ 3 }
    >
      { songs.map((song) => {
        const genresString = song.genres.join(", ");

        return (
          <Stack
            key={ song.id }
            sx={ { maxWidth: ["150px", "150px", "260px"], rowGap: 0.5 } }
          >
            <Stack display="grid" justifyItems="center" alignItems="center">
              <img
                alt="Song cover art"
                height={ isWidthAboveMd ? "260px" : "150px" }
                width={ isWidthAboveMd ? "260px" : "150px" }
                src={
                  song.coverArtUrl
                    ? getResizedAlbumCoverImageUrl(song.coverArtUrl, {
                        width: 200,
                        height: 200,
                      })
                    : placeholderBackground
                }
                style={ {
                  borderRadius: "4px",
                  objectFit: "cover",
                  gridArea: "1 / 1 / 2 / 2",
                } }
              />
              { song?.streamUrl && (
                <IconButton
                  onClick={ () => handleSongPlayPause(song) }
                  sx={ {
                    color: theme.colors.white,
                    gridArea: "1 / 1 / 2 / 2",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                  } }
                >
                  { song.id === currentPlayingSongId ? (
                    <Stop sx={ { fontSize: isWidthAboveMd ? "60px" : "40px" } } />
                  ) : (
                    <PlayArrow
                      sx={ { fontSize: isWidthAboveMd ? "60px" : "40px" } }
                    />
                  ) }
                </IconButton>
              ) }
            </Stack>
            <Typography variant="h4" fontWeight={ 700 } mt={ 0.5 }>
              { song.title }
            </Typography>
            <Typography variant="subtitle1" fontWeight={ 500 }>
              { genresString }
            </Typography>
          </Stack>
        );
      }) }
      <Stack ref={ ref } flex="1 0 100%" textAlign="center">
        { hasMore ? <Typography>Loading more songs...</Typography> : null }
      </Stack>
    </Stack>
  );
};

export default Songs;
