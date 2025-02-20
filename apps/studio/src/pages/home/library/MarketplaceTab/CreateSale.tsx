import { useEffect, useState } from "react";
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
  PriceInputField,
  TextInputField,
} from "@newm-web/elements";
import theme from "@newm-web/theme";
import {
  Currency,
  calculateOwnershipPerecentage,
  formatNewmAmount,
  formatPercentageAdaptive,
  formatUsdAmount,
  useWindowDimensions,
} from "@newm-web/utils";
import StartSaleModal from "./StartSaleModal";
import { SALE_DEFAULT_BUNDLE_AMOUNT } from "../../../../common";
import { SongRouteParams } from "../types";
import { useGetUserWalletSongsThunk } from "../../../../modules/song";
import { useStartSaleThunk } from "../../../../modules/sale";
import { useGetProfileQuery } from "../../../../modules/session";

export const CreateSale = () => {
  const [isSaleSummaryModalOpen, setIsSaleSummaryModalOpen] = useState(false);
  const windowWidth = useWindowDimensions()?.width;
  const { songId } = useParams<"songId">() as SongRouteParams;
  const [
    getUserWalletSongs,
    { data: walletSongsResponse, isLoading: isGetWalletSongsLoading },
  ] = useGetUserWalletSongsThunk();
  const { data: profileData } = useGetProfileQuery();
  const [startSale, { isLoading: isStartSaleLoading }] = useStartSaleThunk();
  const { wallet } = useConnectWallet();
  const currentSong = walletSongsResponse?.data?.songs[0];

  const initialValues = {
    saleCurrency: Currency.USD.name,
    tokensToSell: undefined,
    totalSaleValue: undefined,
  };

  const handleCreateSale = async (values: FormikValues) => {
    if (
      !currentSong ||
      !currentSong.song.nftPolicyId ||
      !currentSong.song.nftName
    ) {
      return;
    }

    await startSale({
      bundleAmount: SALE_DEFAULT_BUNDLE_AMOUNT,
      bundleAssetName: currentSong.song.nftName,
      bundlePolicyId: currentSong.song.nftPolicyId,
      costAmount: values.totalSaleValue / values.tokensToSell,
      email: profileData?.email,
      saleCurrency: values.saleCurrency,
      songId,
      totalBundleQuantity: values.tokensToSell,
    });

    setIsSaleSummaryModalOpen(false);
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
      .typeError("")
      .integer("You must sell a whole number of stream tokens")
      .min(1, "You must sell at least 1 stream token")
      .max(
        streamTokensInWallet,
        `You only have ${formattedStreamTokensInWallet} stream tokens 
        available to sell.`
      ),
    totalSaleValue: Yup.number()
      .required("This field is required")
      .typeError("")
      .when("saleCurrency", {
        is: (val: string) => val === Currency.USD.name,
        otherwise: (s) => s.min(1, "Value must be at least Ɲ1"),
        then: (s) => s.min(0.01, "Value must be at least $0.01"),
      }),
  });

  const getDynamicDecimalPrecision = (num: number): number | undefined => {
    if (num >= 0.001 || num === 0 || !Number.isFinite(num)) {
      return undefined;
    }
    const splitDecimalPortion = num.toFixed(10).split(".")[1];
    const firstNonZeroIndex = splitDecimalPortion.search(/[1-9]/);
    return firstNonZeroIndex && firstNonZeroIndex !== -1
      ? firstNonZeroIndex + 1
      : undefined;
  };

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
        initialValues={ initialValues }
        validateOnMount={ true }
        validationSchema={ validationSchema }
        onSubmit={ handleCreateSale }
      >
        { ({
          values: { tokensToSell = 0, totalSaleValue = 0, saleCurrency },
          isValid,
          submitForm,
          setTouched,
        }) => {
          // tokensToSell is "" when the field is empty, converted to 0
          const perTokenPrice =
            Number(tokensToSell) !== 0 ? totalSaleValue / tokensToSell : 0;
          const percentageOfUserStreamTokens =
            (tokensToSell / streamTokensInWallet) * 100;
          const formattedPercentageOfUserStreamTokens = `${percentageOfUserStreamTokens.toFixed(
            Math.max(2, 7 - tokensToSell.toString().length)
          )}%`;

          const decimalPlaces = getDynamicDecimalPrecision(perTokenPrice);
          const formattedPerTokenPrice =
            saleCurrency === Currency.USD.name
              ? formatUsdAmount(perTokenPrice, { precision: decimalPlaces })
              : formatNewmAmount(perTokenPrice, { precision: decimalPlaces });

          return (
            <Form
              style={ {
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "40px",
              } }
            >
              <Stack
                columnGap={ 2.5 }
                flexDirection={ ["column", "column", "row"] }
                rowGap={ 3.5 }
              >
                <TextInputField
                  helperText={ `Percentage of my total stream tokens: ${
                    percentageOfUserStreamTokens
                      ? formattedPercentageOfUserStreamTokens
                      : ""
                  }` }
                  isOptional={ false }
                  label="STREAM TOKENS TO SELL"
                  name="tokensToSell"
                  placeholder="0"
                  tooltipText="The total number of the track's stream tokens to be included in the sale."
                  type="number"
                />

                <PriceInputField
                  currencyFieldName="saleCurrency"
                  helperText={ `Price per stream token: ${
                    perTokenPrice ? formattedPerTokenPrice : ""
                  }` }
                  isOptional={ false }
                  label="TOTAL SALE VALUE"
                  placeholder="0"
                  priceFieldName="totalSaleValue"
                  tooltipText="The total amount to be earned once the sale is fulfilled."
                />
              </Stack>

              <HorizontalLine />

              <Button
                disabled={ isGetWalletSongsLoading }
                type="button"
                width={
                  windowWidth && windowWidth > theme.breakpoints.values.md
                    ? "compact"
                    : "default"
                }
                onClick={ () => {
                  if (isValid) {
                    setIsSaleSummaryModalOpen(true);
                  } else {
                    setTouched({
                      tokensToSell: true,
                      totalSaleValue: true,
                    });
                  }
                } }
              >
                Create stream token sale
              </Button>

              <StartSaleModal
                handleClose={ () => setIsSaleSummaryModalOpen(false) }
                handleStartSale={ submitForm }
                isLoading={ isStartSaleLoading }
                isOpen={ isSaleSummaryModalOpen }
                saleCurrency={ saleCurrency }
                tokensToSell={ tokensToSell }
                totalSaleValue={ totalSaleValue }
                totalTokensOwnedByUser={ streamTokensInWallet }
              />
            </Form>
          );
        } }
      </Formik>
    </>
  );
};
