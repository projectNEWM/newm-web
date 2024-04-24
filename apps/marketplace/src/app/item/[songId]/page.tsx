"use client";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { SongCard } from "@newm-web/components";
import { FunctionComponent, useEffect, useState } from "react";
import { resizeCloudinaryImage } from "@newm-web/utils";
import {
  Button,
  ProfileImage,
  TextInputField,
  Tooltip,
} from "@newm-web/elements";
import { Form, Formik } from "formik";
import { mockSongs } from "../../../temp/data";
import { ItemSkeleton } from "../../../components";

interface SingleSongProps {
  readonly params: {
    readonly songId: string;
  };
}

const SingleSong: FunctionComponent<SingleSongProps> = ({ params }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const songData = mockSongs.find((song) => song.id === params.songId);

  // TEMP: simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <ItemSkeleton />;
  }

  return (
    <Container maxWidth="md" sx={ { flexGrow: 1, mt: [0, 0, 5] } }>
      <Stack
        alignItems={ ["center", "center", "start"] }
        direction={ ["column", "column", "row"] }
      >
        <Box mb={ [2, 2, 0] } mr={ [0, 0, 5] } width={ [240, 240, 400] }>
          <SongCard
            coverArtUrl={ songData?.coverArtUrl }
            imageDimensions={ 480 }
            isPlayable={ true }
            price={ mockSongs[0].price }
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onCardClick={ () => {} }
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onPriceClick={ () => {} }
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSubtitleClick={ () => {} }
          />
        </Box>
        <Stack
          gap={ [4, 4, 2.5] }
          pt={ [0, 0, 1.5] }
          textAlign={ ["center", "center", "left"] }
          width={ ["100%", 440, 440] }
        >
          <Stack gap={ 0.5 }>
            <Typography variant="h3">{ songData?.title }</Typography>
            <Typography color={ theme.colors.grey300 } variant="subtitle2">
              { songData?.isExplicit ? "Explicit" : null }
            </Typography>
          </Stack>
          <Typography textAlign="left" variant="subtitle1">
            { songData?.description }
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            gap={ 1.5 }
            justifyContent={ ["center", "center", "start"] }
          >
            <ProfileImage
              height={ 40 }
              src={ resizeCloudinaryImage(songData?.artist.profileImageUrl, {
                height: 56,
                width: 56,
              }) }
              width={ 40 }
            />
            <Typography variant="h4">
              { songData?.artist.firstName } { songData?.artist.lastName }
            </Typography>
          </Stack>

          <Formik
            initialValues={ { streamTokens: 1 } }
            onSubmit={ () => {
              return;
            } }
          >
            { () => {
              return (
                <Form>
                  <Stack gap={ 2.5 } mb={ 4 } mt={ 0.5 }>
                    <Stack>
                      <Box alignSelf="flex-end" p={ 0.5 }>
                        <Tooltip
                          title={
                            "The number of Stream Tokens correlates directly " +
                            "with the percentage of Streaming royalties you " +
                            "can acquire and the total price of the bundle. " +
                            "For example 1 token is worth = 0.0000001% of " +
                            "total royalties, and costs ‘Ɲ3.0‘."
                          }
                        >
                          <IconButton sx={ { padding: 0 } }>
                            <InfoIcon sx={ { color: theme.colors.grey100 } } />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      <Box
                        borderRadius={ 2 }
                        px={ 3 }
                        py={ 2.5 }
                        sx={ { backgroundColor: theme.colors.grey600 } }
                      >
                        <Stack>
                          <Typography
                            fontWeight={ theme.typography.fontWeightBold }
                            variant="subtitle2"
                          >
                            STREAM TOKENS
                          </Typography>
                          <Stack direction={ "row" }>
                            <Box maxWidth={ "150px" }>
                              <TextInputField name="streamTokens"></TextInputField>
                            </Box>
                            <Typography
                              alignSelf="center"
                              flexShrink={ "0" }
                              pl={ 1.5 }
                              variant="subtitle2"
                            >
                              = 0.0000001% of total royalties
                            </Typography>
                          </Stack>
                          <Typography
                            color={ theme.colors.grey300 }
                            pt={ 0.5 }
                            variant="subtitle2"
                          >
                            Maximum stream tokens = 80000
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    <Box
                      borderRadius={ 2 }
                      px={ 3 }
                      py={ 2.5 }
                      sx={ {
                        backgroundColor: theme.colors.grey600,
                      } }
                    >
                      <Button type="submit" width="full">
                        <Typography
                          fontWeight={ theme.typography.fontWeightBold }
                          variant="body1"
                        >
                          Buy 1 Stream Token • { "4.73N (~ $7.30)" }
                        </Typography>
                      </Button>
                    </Box>
                  </Stack>
                </Form>
              );
            } }
          </Formik>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SingleSong;
