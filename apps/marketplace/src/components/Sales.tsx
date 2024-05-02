import { FunctionComponent, ReactNode, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { SongCard, SongCardSkeleton } from "@newm-web/components";
import { useRouter } from "next/navigation";
import { Howl } from "howler";
import { Sale } from "../modules/sale/types";

interface SalesProps {
  readonly isLoading?: boolean;
  readonly sales: ReadonlyArray<Sale>;
  readonly title?: string | ReactNode;
}

const Sales: FunctionComponent<SalesProps> = ({
  title,
  sales = [],
  isLoading = false,
}) => {
  const router = useRouter();
  const [audio, setAudio] = useState<Howl>();
  const [audioUrl, setAudioUrl] = useState<string>();
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const handleCardClick = (id: string) => {
    router.push(`/sale/${id}`);
  };

  const handleSubtitleClick = (id: string) => {
    router.push(`artist/${id}`);
  };

  const handlePlayPauseClick = (src: string) => {
    const isCurrentSong = src === audioUrl;

    // if currently selected song, pause or play and return
    if (isCurrentSong) {
      if (audio?.playing()) {
        audio?.pause();
      } else {
        audio?.play();
      }

      return;
    }

    // if not currently selected song, stop playing
    if (audio?.playing()) {
      audio.stop();
    }

    // play new song
    const newAudio = new Howl({
      html5: true,
      onend: () => {
        setIsAudioPlaying(false);
      },
      onpause: () => {
        setIsAudioPlaying(false);
      },
      onplay: (id) => {
        setAudioUrl(src);
        setIsAudioPlaying(true);
      },
      onstop: () => {
        setIsAudioPlaying(false);
      },
      src,
    });

    newAudio.play();
    setAudio(newAudio);
  };

  if (!isLoading && !sales.length) {
    return (
      <Typography sx={ { marginTop: 8, textAlign: "center" } }>
        No songs to display at this time.
      </Typography>
    );
  }

  return (
    <Stack alignItems="center">
      { !!title && (
        <Box mb={ 3.5 }>
          <Typography
            fontSize={ ["24px", "24px", "32px"] }
            textAlign="center"
            textTransform="uppercase"
            variant="h3"
          >
            { title }
          </Typography>
        </Box>
      ) }

      <Grid justifyContent="flex-start" pb={ 1 } rowGap={ 1.5 } container>
        { isLoading
          ? new Array(8).fill(null).map((_, idx) => {
              return (
                <Grid key={ idx } md={ 3 } sm={ 4 } xs={ 6 } item>
                  <SongCardSkeleton
                    isSubtitleVisible={ true }
                    isTitleVisible={ true }
                  />
                </Grid>
              );
            })
          : sales.map(({ costAmount, id, song }) => {
              const genresString = song.genres.join(", ");

              return (
                <Grid key={ song.id } md={ 3 } sm={ 4 } xs={ 6 } item>
                  <SongCard
                    coverArtUrl={ song.coverArtUrl }
                    isPlayable={ !!song.clipUrl }
                    isPlaying={ audioUrl === song.clipUrl && isAudioPlaying }
                    key={ id }
                    price={ String(costAmount) }
                    subtitle={ genresString }
                    title={ song.title }
                    onCardClick={ () => handleCardClick(id) }
                    onPlayPauseClick={ () => handlePlayPauseClick(song.clipUrl) }
                    onSubtitleClick={ () => handleSubtitleClick(id) }
                  />
                </Grid>
              );
            }) }
      </Grid>
    </Stack>
  );
};

export default Sales;
