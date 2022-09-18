import { Box, IconButton, Stack, useTheme } from "@mui/material";
import { FilledButton, HorizontalLine, Typography } from "elements";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import mursProfileImageXs from "assets/images/murs-profile-small.png";
import PlayIcon from "assets/images/PlayIcon";
import SpotifyIcon from "assets/images/SpotifyIcon";
import { useNavigate } from "react-router-dom";
import StopIcon from "assets/images/StopIcon";
import { DisplayText, SectionHeading } from "components";

const songUrl =
  "https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=" +
  "Never+Gonna+Give+You+Up-+Original&filename=" +
  "mz/Mzg1ODMxNTIzMzg1ODM3_JzthsfvUY24.MP3";

const Landing: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useMemo(() => new Audio(songUrl), []);

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
    const handleIsPlaying = () => setIsPlaying(true);
    const handleIsStopped = () => setIsPlaying(false);

    audio.addEventListener("play", handleIsPlaying, false);
    audio.addEventListener("pause", handleIsStopped, false);
    audio.addEventListener("ended", handleIsStopped, false);

    return () => {
      audio.removeEventListener("play", handleIsPlaying, false);
      audio.removeEventListener("pause", handleIsStopped, false);
      audio.removeEventListener("ended", handleIsStopped, false);
    };
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
        spacing={ 2.5 }
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
                alt="MURS profile"
              />

              <Box>
                <Typography variant="h4" fontWeight={ 700 }>
                  Break up
                </Typography>
                <Typography variant="subtitle2">MURS</Typography>
              </Box>
            </Stack>

            <a
              href="https://open.spotify.com/track/1ZSwTbIdB0p7pNLDck5RQb?si=b1c674b4020d4e90"
              target="_blank"
              rel="noopener noreferrer"
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
            In the spirit of fairness, you can only purchase one bundle per
            session. This gives everyone an equal opportunity to participate in
            this limited offering.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Landing;
