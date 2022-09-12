import { Box, Container, IconButton, Stack } from "@mui/material";
import { FilledButton, Typography } from "elements";
import { FunctionComponent, useEffect, useState } from "react";
import theme from "theme";
import mursProfileImageLg from "assets/images/murs-profile-cut-tinified.png";
import mursProfileImageSm from "assets/images/murs-profile-cropped.png";
import mursProfileImageXs from "assets/images/murs-profile-small.png";
import PlayIcon from "assets/images/PlayIcon";
import SpotifyIcon from "assets/images/SpotifyIcon";
import { useWindowDimensions } from "common";

const audio = new Audio(
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
);

const TokenDrop: FunctionComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { width = 0 } = useWindowDimensions() || {};

  const handlePlaySong = () => {
    audio.play();
  };

  const handleStopSong = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    audio.addEventListener(
      "play",
      () => {
        setIsPlaying(true);
      },
      false
    );

    audio.addEventListener(
      "pause",
      () => {
        setIsPlaying(false);
      },
      false
    );
  }, []);

  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.black100,
        flexDirection: "column",
        flexGrow: 1,
      } }
    >
      <Box
        sx={ {
          display: ["none", "none", "flex"],
          position: "fixed",
          bottom: 0,
          right: 0,
          height: ["100%", "100%", width * 0.5, "100%"],
        } }
      >
        <img
          alt="murs profile"
          src={ mursProfileImageLg }
          style={ { height: "100%" } }
        />
      </Box>

      <Box
        sx={ {
          display: ["flex", "flex", "none"],
        } }
      >
        <img
          alt="murs profile"
          src={ mursProfileImageSm }
          style={ { width: "100%" } }
        />
      </Box>

      <Container maxWidth={ false }>
        <Box
          width={ ["100%", "100%", "60%"] }
          maxWidth="60rem"
          paddingTop={ [4, 4, 12] }
          paddingLeft={ [1, 1, 10] }
          paddingRight={ [1, 1, 0] }
        >
          <Stack spacing={ 1 } sx={ { marginBottom: 4 } }>
            <Typography variant="h1" fontSize={ 100 } lineHeight="80px">
              MURS
            </Typography>
            <Typography
              variant="h3"
              color="pink"
              sx={ theme.typography.emphasized }
            >
              Moodswingz Cryptomedia Group
            </Typography>

            <Typography variant="subtitle1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed
              nibh sit amet mi euismod pulvinar. Maecenas pulvinar lorem vel
              erat efficitur, interdum ultrices magna ullamcorper. Nam imperdiet
              nibh semper eros iaculis dictum. Donec non sapien sit amet tortor
              tincidunt varius. Etiam hendrerit, felis eleifend maximus
              ultricies, ligula eros maximus enim, non congue quam nisl id
              turpis. Ut eget fermentum massa. Proin fermentum porttitor ipsum
              sit amet interdum. Vestibulum lacinia sagittis malesuada. Fusce
              eget feugiat sapien. Proin eu sem vitae tortor sagittis ornare.
              Quisque tempus libero id accumsan sodales. Vivamus quam mi,
              molestie a lobortis maximus, bibendum nec nunc.
            </Typography>
          </Stack>

          <Stack spacing={ 2 } alignItems="flex-start">
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              maxWidth={ 450 }
            >
              <Stack spacing={ 2 } direction="row" alignItems="center">
                { isPlaying ? (
                  <IconButton
                    sx={ { padding: 3 } }
                    aria-label="pause MURS song"
                    onClick={ handleStopSong }
                  >
                    <PlayIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={ { padding: 3 } }
                    aria-label="play MURS song"
                    onClick={ handlePlaySong }
                  >
                    <PlayIcon />
                  </IconButton>
                ) }

                <img
                  src={ mursProfileImageXs }
                  style={ { width: 40, height: 40, borderRadius: "50%" } }
                  alt="murs profile"
                />

                <Box>
                  <Typography variant="h4" fontWeight={ 700 }>
                    Break up
                  </Typography>
                  <Typography variant="subtitle2">Murs</Typography>
                </Box>
              </Stack>

              <a
                href="https://open.spotify.com/track/1ZSwTbIdB0p7pNLDck5RQb?si=b1c674b4020d4e90"
                target="_blank"
                rel="noreferrer"
              >
                <SpotifyIcon />
              </a>
            </Box>

            <FilledButton>Buy</FilledButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default TokenDrop;
