import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/material";
import { SongCard } from "@newm-web/components";
/**
 * TODO: Implement useGetSongsQuery and playback functionality,
 * see studio/src/pages/home/owners/Songs.tsx
 */

const Songs: FunctionComponent = () => {
  return (
    <Stack alignItems="center" mt={ 10 }>
      { tempSongData.length ? (
        <>
          <Typography variant="h3">JUST RELEASED</Typography>
          <Stack
            columnGap={ 2 }
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            mt={ 5 }
            rowGap={ 3 }
          >
            { tempSongData.map((song) => {
              const genresString = song.genres.join(", ");

              return (
                <SongCard
                  coverArtUrl={ song.coverArtUrl }
                  isPlayable={ !!song.streamUrl }
                  key={ song.id }
                  songId={ song.id }
                  subtitle={ genresString }
                  title={ song.title }
                />
              );
            }) }
          </Stack>
        </>
      ) : (
        <Typography sx={ { marginTop: 8, textAlign: "center" } }>
          No songs to display at this time.
        </Typography>
      ) }
    </Stack>
  );
};

export default Songs;

const tempSongData = [
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1706033133/efpgmcjwk8glctlwfzm8.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df58",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1706033133/efpgmcjwk8glctlwfzm8.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df581",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1706033133/efpgmcjwk8glctlwfzm8.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df582",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1699544008/xrcmyar9m09mk3l9mo1o.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df583",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1699580048/aw7w0kielduse0z4vavi.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df584",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1701892098/rka1mlzzad6ohrcfqef3.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df585",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1702264297/ql6f3j5tettsbc3moea3.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df586",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
  {
    coverArtUrl:
      "https://res.cloudinary.com/newm/image/upload/c_limit,w_4000,h_4000/v1702264297/ql6f3j5tettsbc3moea3.png",
    genres: ["Punk"],
    id: "3cfb2d02-a320-4385-96d1-1498d8a1df587",
    streamUrl:
      "https://media.garage.newm.io/3cfb2d02-a320-4385-96d1-1498d8a1df58/audio/HLS/audio_output.m3u8",
    title: "Vibrate Punk",
  },
];