import { Box, IconButton, Stack, useTheme } from "@mui/material";
import QuestionIcon from "assets/images/QuestionIcon";
import { FilledButton, HorizontalLine, Tooltip, Typography } from "elements";
import { FunctionComponent, useMemo, useState } from "react";
import artistAssets from "assets/images/artist-assets";
import PlayIcon from "assets/images/PlayIcon";
import SpotifyIcon from "assets/images/SpotifyIcon";
import { useNavigate } from "react-router-dom";
import StopIcon from "assets/images/StopIcon";
import { DisplayText, SectionHeading } from "components";
import { Howl } from "howler";
import song from "assets/audio/song.mp3";
import { projectDetails } from "buildParams";
import { useGetSaleAmount } from "modules/sale";

const Landing: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const bundleSize = (
    useGetSaleAmount(projectDetails.projectId) || projectDetails.bundleAmount
  ).toLocaleString();

  const [isPlaying, setIsPlaying] = useState(false);

  const audio = useMemo(
    () =>
      new Howl({
        src: song,
        onplay: () => setIsPlaying(true),
        onstop: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
      }),
    []
  );

  const handleNavigate = () => {
    audio.stop();
    navigate("payment");
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box mb={ 3.5 } sx={ { maxWidth: [9999, 9999, 620] } }>
        <Typography variant="subtitle1" sx={ { whiteSpace: "pre-wrap" } }>
          { projectDetails.description }
        </Typography>
      </Box>

      <Stack
        spacing={ 2.5 }
        alignItems="flex-start"
        width="100%"
        maxWidth={ [9999, 9999, 475] }
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
              borderRadius: "6px",
              overflow: "hidden",
              p: 1.25,
              pr: 2,
            } }
          >
            <Stack spacing={ 2 } direction="row" alignItems="center">
              <Box
                display="flex"
                height={ 2 }
                width={ 2 }
                margin={ 2 }
                justifyContent="center"
                alignItems="center"
              >
                { isPlaying ? (
                  <IconButton
                    aria-label="stop song"
                    onClick={ () => audio.stop() }
                  >
                    <StopIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="play song"
                    onClick={ () => audio.play() }
                  >
                    <PlayIcon />
                  </IconButton>
                ) }
              </Box>

              <img
                src={ artistAssets.albumArtXs }
                style={ { width: 40, height: 40, borderRadius: "50%" } }
                alt="artist profile"
              />

              <Box>
                <Typography variant="h4" fontWeight={ 700 }>
                  { projectDetails.songName }
                </Typography>
                <Typography variant="subtitle2">
                  { projectDetails.artistName }
                </Typography>
              </Box>
            </Stack>

            <a
              href={ projectDetails.spotifyLink }
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
              <Box mb={ 0.25 } sx={ { position: "relative" } }>
                <DisplayText style={ { color: theme.colors.grey100 } }>
                  { bundleSize } stream tokens
                  <Tooltip title="A description to explain the price breakdown">
                    <IconButton
                      sx={ {
                        py: 0,
                        position: "absolute",
                        right: "-2.5rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                      } }
                    >
                      <QuestionIcon />
                    </IconButton>
                  </Tooltip>
                </DisplayText>
              </Box>

              <Typography variant="subtitle1">of the song NFT</Typography>
            </Box>
          </Stack>
        </Box>

        <HorizontalLine />

        <Stack mt={ 4 } spacing={ 1.5 } sx={ { width: "100%" } }>
          <FilledButton onClick={ handleNavigate } fullWidth={ true }>
            Purchase
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
