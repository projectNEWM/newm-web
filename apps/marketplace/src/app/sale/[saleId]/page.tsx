"use client";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import currency from "currency.js";
import { SongCard } from "@newm-web/components";
import * as Yup from "yup";
import { FunctionComponent } from "react";
import {
  Button,
  ProfileImage,
  TextInputField,
  Tooltip,
} from "@newm-web/elements";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { formatNewmAmount, usePlayAudioUrl } from "@newm-web/utils";
import { useGetSaleQuery } from "../../../modules/sale";
import MoreSongs from "../../../components/MoreSongs";
import { ItemSkeleton, SimilarSongs } from "../../../components";

interface SingleSongProps {
  readonly params: {
    readonly saleId: string;
  };
}

const SingleSong: FunctionComponent<SingleSongProps> = ({ params }) => {
  const theme = useTheme();
  const router = useRouter();

  const { audioProgress, isAudioPlaying, playPauseAudio } = usePlayAudioUrl();
  const { isLoading, data: sale } = useGetSaleQuery(params.saleId);

  const initialFormValues = {
    streamTokens: 1000,
  };

  const formValidationSchema = Yup.object({
    streamTokens: Yup.number()
      .required("This field is required")
      .integer()
      .min(1)
      .max(sale?.availableBundleQuantity || 0),
  });

  /**
   * @returns what percentage of the total tokens
   * the current purchase amount is.
   */
  const getPercentageOfTotalStreamTokens = (purchaseAmount: number) => {
    if (!sale) return;

    const percentage = (purchaseAmount / sale.totalBundleQuantity) * 100;
    return parseFloat(percentage.toFixed(6));
  };

  /**
   * @returns total cost of purchase in NEWM and USD.
   */
  const getTotalPurchaseCost = (purchaseAmount: number) => {
    if (!sale) {
      throw new Error("no sale present");
    }

    const newmAmount = purchaseAmount * sale.costAmount;
    const usdAmount = purchaseAmount * sale.costAmountUsd;

    return {
      newmAmount: formatNewmAmount(newmAmount),
      usdAmount: currency(usdAmount).format(),
    };
  };

  /**
   * Navigates to the artist page when clicked.
   */
  const handleArtistClick = () => {
    if (!sale) {
      throw new Error("no sale present");
    }

    router.push(`/artist/${sale.song.artistId}`);
  };

  if (isLoading) {
    return <ItemSkeleton />;
  }

  return (
    <Container>
      <Container maxWidth="md" sx={ { flexGrow: 1, mt: [0, 0, 5] } }>
        <Stack
          alignItems={ ["center", "center", "start"] }
          direction={ ["column", "column", "row"] }
        >
          <Box mb={ [2, 2, 0] } mr={ [0, 0, 5] } width={ [240, 240, 400] }>
            <SongCard
              audioProgress={ audioProgress }
              coverArtUrl={ sale?.song.coverArtUrl }
              imageDimensions={ 480 }
              isLoading={ isLoading }
              isPlayable={ !!sale?.song.clipUrl }
              isPlaying={ isAudioPlaying }
              priceInNewm={ sale?.costAmount }
              priceInUsd={ sale?.costAmountUsd }
              onPlayPauseClick={ () => playPauseAudio(sale?.song.clipUrl) }
            />
          </Box>
          <Stack gap={ [4, 4, 2.5] } pt={ [0, 0, 1.5] } width={ ["100%", 440, 440] }>
            <Stack gap={ 0.5 } textAlign={ ["center", "center", "left"] }>
              <Typography variant="h3">{ sale?.song.title }</Typography>
              <Typography color={ theme.colors.grey300 } variant="subtitle2">
                { sale?.song.isExplicit ? "Explicit" : null }
              </Typography>
            </Stack>

            <Typography variant="subtitle1">
              { sale?.song.description }
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              gap={ 1.5 }
              justifyContent={ ["center", "center", "start"] }
              role="button"
              sx={ { cursor: "pointer" } }
              tabIndex={ 0 }
              onClick={ handleArtistClick }
              onKeyDown={ handleArtistClick }
            >
              <ProfileImage
                height={ 40 }
                src={ sale?.song.artistPictureUrl }
                width={ 40 }
              />
              <Typography variant="h4">{ sale?.song.artistName }</Typography>
            </Stack>

            <Formik
              initialValues={ initialFormValues }
              validationSchema={ formValidationSchema }
              onSubmit={ () => {
                return;
              } }
            >
              { ({ values, isValid }) => {
                const totalCost = getTotalPurchaseCost(values.streamTokens);

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
                              "total royalties, and costs '3.0 Ɲ'."
                            }
                          >
                            <IconButton sx={ { padding: 0 } }>
                              <HelpIcon sx={ { color: theme.colors.grey100 } } />
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
                                <TextInputField
                                  name="streamTokens"
                                  type="number"
                                />
                              </Box>
                              <Typography
                                alignSelf="center"
                                flexShrink={ "0" }
                                pl={ 1.5 }
                                variant="subtitle2"
                              >
                                ={ " " }
                                { getPercentageOfTotalStreamTokens(
                                  values.streamTokens
                                ) }
                                % of total royalties
                              </Typography>
                            </Stack>
                            <Typography
                              color={ theme.colors.grey300 }
                              pt={ 0.5 }
                              variant="subtitle2"
                            >
                              Maximum stream tokens ={ " " }
                              { sale?.availableBundleQuantity.toLocaleString() }
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
                        <Button disabled={ !isValid } type="submit" width="full">
                          <Typography
                            fontWeight={ theme.typography.fontWeightBold }
                            variant="body1"
                          >
                            Buy { values.streamTokens.toLocaleString() } Stream
                            Tokens •{ " " }
                            { `${totalCost?.newmAmount} (≈ ${totalCost?.usdAmount})` }
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

      <MoreSongs />

      <SimilarSongs />
    </Container>
  );
};

export default SingleSong;
