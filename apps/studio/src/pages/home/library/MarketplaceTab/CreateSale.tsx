import { useParams } from "react-router-dom";
import currency from "currency.js";
import * as Yup from "yup";
import { AlertTitle, Stack, Typography } from "@mui/material";
import { Form, Formik, FormikValues } from "formik";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import {
  Alert,
  Button,
  HorizontalLine,
  TextInputField,
} from "@newm-web/elements";
import theme from "@newm-web/theme";
import { useEffect } from "react";
import {
  calculateOwnershipPerecentage,
  formatNewmAmount,
  formatPercentageAdaptive,
} from "@newm-web/utils";
import { SALE_DEFAULT_BUNDLE_AMOUNT } from "../../../../common";
import { SongRouteParams } from "../types";
import { useGetUserWalletSongsThunk } from "../../../../modules/song";
import { useStartSaleThunk } from "../../../../modules/sale";

export const CreateSale = () => {
  const { songId } = useParams<"songId">() as SongRouteParams;
  const [
    getUserWalletSongs,
    { data: walletSongsResponse, isLoading: isGetWalletSongsLoading },
  ] = useGetUserWalletSongsThunk();
  const [startSale, { isLoading: isStartSaleLoading }] = useStartSaleThunk();
  const { wallet } = useConnectWallet();
  const currentSong = walletSongsResponse?.data?.songs[0];

  const handleCreateSale = async (values: FormikValues) => {
    if (
      !currentSong ||
      !currentSong.song.nftPolicyId ||
      !currentSong.song.nftName
    )
      return;

    await startSale({
      bundleAmount: SALE_DEFAULT_BUNDLE_AMOUNT,
      bundleAssetName: currentSong.song.nftName,
      bundlePolicyId: currentSong.song.nftPolicyId,
      costAmount: values.totalSaleValue,
      songId,
      totalBundleQuantity: values.tokensToSell,
    });
  };

  useEffect(() => {
    getUserWalletSongs({
      ids: [songId],
      limit: 1,
    });
  }, [getUserWalletSongs, songId, wallet]);

  const streamTokensInWallet = currentSong?.token_amount || 0;
  const streamTokensPercentage = formatPercentageAdaptive(
    calculateOwnershipPerecentage(streamTokensInWallet)
  );
  const formattedStreamTokensInWallet = currency(streamTokensInWallet, {
    precision: 0,
    symbol: "",
  }).format();
  const isOnlyOneTokenAvailable = streamTokensInWallet === 1;

  const validationSchema = Yup.object({
    tokensToSell: Yup.number()
      .required("This field is required")
      .integer("You must sell a whole number of stream tokens")
      .min(1, "You must sell at least 1 stream token")
      .max(
        streamTokensInWallet,
        `You only have ${formattedStreamTokensInWallet} stream tokens available to sell.`
      ),
    totalSaleValue: Yup.number().required("This field is required").min(0.01),
  });

  return (
    <>
      <Alert>
        <AlertTitle color={ theme.colors.blue } sx={ { fontWeight: 600 } }>
          { `You currently have ${formattedStreamTokensInWallet} stream token${
            isOnlyOneTokenAvailable ? "" : "s"
          } for this track available to sell.` }
        </AlertTitle>
        <Typography
          color={ theme.colors.blue }
          fontWeight={ 500 }
          variant="subtitle1"
        >
          { `This accounts for ${streamTokensPercentage}% of this track's total minted stream tokens.` }
        </Typography>
      </Alert>

      <Formik
        initialValues={ {
          tokensToSell: undefined,
          totalSaleValue: undefined,
        } }
        validationSchema={ validationSchema }
        onSubmit={ handleCreateSale }
      >
        { ({
          isSubmitting,
          values: { tokensToSell = 0, totalSaleValue = 0 },
        }) => (
          <Form
            style={ {
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "40px",
            } }
          >
            <Stack columnGap={ 2.5 } flexDirection="row" rowGap={ 3.5 }>
              <TextInputField
                isOptional={ false }
                label="STREAM TOKENS TO SELL"
                name="tokensToSell"
                placeholder="0"
                tooltipText="Some cool text"
                type="number"
              />
              <TextInputField
                helperText={
                  !!totalSaleValue && !!tokensToSell
                    ? `Price per stream token: ${formatNewmAmount(
                        totalSaleValue / tokensToSell,
                        true
                      )}`
                    : ""
                }
                isOptional={ false }
                label="TOTAL SALE VALUE"
                name="totalSaleValue"
                placeholder="0"
                tooltipText="Some cool text"
                type="number"
              />
            </Stack>
            <HorizontalLine />
            <Button
              disabled={
                isSubmitting || isStartSaleLoading || isGetWalletSongsLoading
              }
              type="submit"
              width="compact"
            >
              Create stream token sale
            </Button>
          </Form>
        ) }
      </Formik>
    </>
  );
};
