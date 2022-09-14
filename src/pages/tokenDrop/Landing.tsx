import { Box, IconButton, Stack, useTheme } from "@mui/material";
import { FilledButton, HorizontalLine, Typography } from "elements";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import mursProfileImageXs from "assets/images/murs-profile-small.png";
import PlayIcon from "assets/images/PlayIcon";
import SpotifyIcon from "assets/images/SpotifyIcon";
import { useNavigate } from "react-router-dom";
import StopIcon from "assets/images/StopIcon";
import { DisplayText, SectionHeading } from "components";
import secretSong from "assets/audio/secret_song.mp3";

const Landing: FunctionComponent = () => {
  const audio = useMemo(() => new Audio(secretSong), []);

  const theme = useTheme();

  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useNavigate();

  const handlePlaySong = () => {
    audio.play();
  };

  const handleStopSong = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  const handleNavigate = () => {
    handleStopSong();
    navigate("payment");
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

    audio.addEventListener(
      "ended",
      () => {
        setIsPlaying(false);
      },
      false
    );
  }, [audio]);

  return (
    <Box display="flex" flexDirection="column">
      <Box mb={ 4 }>
        <Typography variant="subtitle1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nibh
          sit amet mi euismod pulvinar. Maecenas pulvinar lorem vel erat
          efficitur, interdum ultrices magna ullamcorper. Nam imperdiet nibh
          semper eros iaculis dictum. Donec non sapien sit amet tortor tincidunt
          varius. Etiam hendrerit, felis eleifend maximus ultricies, ligula eros
          maximus enim, non congue quam nisl id turpis. Ut eget fermentum massa.
          Proin fermentum porttitor ipsum sit amet interdum. Vestibulum lacinia
          sagittis malesuada. Fusce eget feugiat sapien. Proin eu sem vitae
          tortor sagittis ornare. Quisque tempus libero id accumsan sodales.
          Vivamus quam mi, molestie a lobortis maximus, bibendum nec nunc.
        </Typography>
      </Box>

      <Stack
        spacing={ 3 }
        alignItems="flex-start"
        width="100%"
        maxWidth={ [9999, 9999, 450] }
      >
        <Box width="100%">
          <SectionHeading>AVAILABLE SONG</SectionHeading>

          <Box
            sx={ {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              backgroundColor: theme.colors.grey600,
              mt: 1,
              pr: 2,
            } }
          >
            <Stack spacing={ 2 } direction="row" alignItems="center">
              <Box
                display="flex"
                height={ 2 }
                width={ 2 }
                margin={ 3 }
                justifyContent="center"
                alignItems="center"
              >
                { isPlaying ? (
                  <IconButton
                    aria-label="pause MURS song"
                    onClick={ handleStopSong }
                  >
                    <StopIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="play MURS song"
                    onClick={ handlePlaySong }
                  >
                    <PlayIcon />
                  </IconButton>
                ) }
              </Box>

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
        </Box>

        <HorizontalLine />

        <Box width="100%">
          <Box mb={ 1 }>
            <SectionHeading>WHAT YOU CAN BUY</SectionHeading>
          </Box>

          <Stack direction="row" spacing={ 1.5 } justifyContent="flex-start">
            <Box flexDirection="column">
              <Box mb={ 0.25 }>
                <DisplayText>1 Bundle</DisplayText>
              </Box>

              <Typography variant="subtitle1">42 ADA</Typography>
            </Box>

            <DisplayText style={ { color: theme.colors.grey100 } }>=</DisplayText>

            <Box flexDirection="column">
              <Box mb={ 0.25 }>
                <DisplayText style={ { color: theme.colors.grey100 } }>
                  0.008%
                </DisplayText>
              </Box>

              <Typography variant="subtitle1">of future royalties</Typography>
            </Box>
          </Stack>
        </Box>

        <HorizontalLine />

        <Stack mt={ 4 } spacing={ 1.5 } sx={ { width: "100%" } }>
          <FilledButton
            backgroundColor={ theme.colors.pink }
            onClick={ handleNavigate }
            fullWidth={ true }
          >
            Buy
          </FilledButton>

          <Typography variant="subtitle2">
            There is a limited amount of bundles being sold. You can only buy
            one per hour in order to give a chance for other users to buy it as
            well.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Landing;
