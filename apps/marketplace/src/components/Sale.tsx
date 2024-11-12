"use client";
import {
  Box,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import currency from "currency.js";
import { SongCard } from "@newm-web/components";
import * as Yup from "yup";
import { FunctionComponent, useState } from "react";
import {
  Button,
  ProfileImage,
  TextInputField,
  Tooltip,
} from "@newm-web/elements";
import { Form, Formik } from "formik";
import {
  FULL_OWNERSHIP_STREAM_TOKENS,
  formatNewmAmount,
} from "@newm-web/utils";
import { useRouter } from "next/navigation";
import { usePlayAudioUrl } from "@newm-web/audio";
import { Sale as SaleItem } from "@newm-web/types";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { useDispatch } from "react-redux";
import { PurchaseStreamTokensModal, SaleSkeleton } from "../components";
import { usePurchaseStreamTokensThunk } from "../modules/sale/thunks";
import { setIsConnectWalletModalOpen } from "../modules/ui";

interface FormValues {
  readonly streamTokens: number;
}

interface SaleProps {
  readonly isLoading: boolean;
  readonly sale?: SaleItem;
}

const Sale: FunctionComponent<SaleProps> = ({
  sale,
  isLoading: isSaleLoading,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const { wallet } = useConnectWallet();

  const [createPurchase, { isLoading: isTransactionLoading }] =
    usePurchaseStreamTokensThunk();
  const { audioUrl, audioProgress, isAudioPlaying, playPauseAudio } =
    usePlayAudioUrl();

  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  // wait until transaction has finished loading before closing modal
  const isPurchaseModalClosed = !isPurchaseModalOpen && !isTransactionLoading;

  const initialFormValues = {
    streamTokens: sale ? Math.min(1000, sale.availableBundleQuantity) : 1000,
  };

  const formValidationSchema = Yup.object({
    streamTokens: Yup.number()
      .required("This field is required")
      .integer()
      .min(1)
      .max(
        sale?.availableBundleQuantity || 0,
        "Order amount cannot exceed maximum Stream Tokens available."
      ),
  });

  /**
   * @returns what percentage of the total tokens
   * the current purchase amount is.
   */
  const getPercentageOfTotalStreamTokens = (purchaseAmount: number) => {
    if (!sale) {
      throw new Error("no sale present");
    }

    const percentage = (purchaseAmount / FULL_OWNERSHIP_STREAM_TOKENS) * 100;
    return parseFloat(percentage.toFixed(6));
  };

  /**
   * @returns total cost of purchase in NEWM and USD.
   */
  const getTotalPurchaseCost = (purchaseAmount: number) => {
    if (!sale) {
      throw new Error("no sale present");
    }

    const newmAmount = purchaseAmount * sale.costAmountNewm;
    const usdAmount = purchaseAmount * sale.costAmountUsd;

    return {
      newmAmount: formatNewmAmount(newmAmount),
      usdAmount: currency(usdAmount).format(),
    };
  };

  /**
   * Navigates to the artist page when clicked.
   */
  const handleArtistClick = (artistId: string) => {
    router.push(`/artist/${artistId}`);
  };

  /**
   * Initiates the process to create and sign a stream token
   * purchase transaction.
   */
  const handlePurchaseStreamTokens = (values: FormValues) => {
    if (!sale) {
      throw new Error("no sale present");
    }

    createPurchase({
      bundleQuantity: values.streamTokens,
      saleId: sale.id,
    });

    handleClosePurchaseModal();
  };

  const handleOpenPurchaseModal = () => {
    if (!wallet) {
      dispatch(setIsConnectWalletModalOpen(true));
      return;
    }

    setIsPurchaseModalOpen(true);
  };

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
  };

  if (isSaleLoading) {
    return <SaleSkeleton />;
  }

  if (!sale) return null;

  return (
    <Stack
      alignItems={ ["center", "center", "start"] }
      direction={ ["column", "column", "row"] }
    >
      <Box mb={ [2, 2, 0] } mr={ [0, 0, 5] } width={ [240, 240, 400] }>
        <SongCard
          audioProgress={ audioProgress }
          coverArtUrl={ sale.song.coverArtUrl }
          imageDimensions={ 480 }
          isLoading={ isSaleLoading }
          isPlayable={ !!sale.song.clipUrl }
          isPlaying={ audioUrl === sale.song.clipUrl && isAudioPlaying }
          priceInNewm={ sale.costAmountNewm }
          priceInUsd={ sale.costAmountUsd }
          priceVariant="pill"
          onPlayPauseClick={ () => playPauseAudio(sale.song.clipUrl) }
        />
      </Box>
      <Stack gap={ [4, 4, 2.5] } pt={ [0, 0, 1.5] } width={ ["100%", 440, 440] }>
        <Stack gap={ 0.5 } textAlign={ ["center", "center", "left"] }>
          <Typography variant="h3">{ sale.song.title }</Typography>
          <Typography color={ theme.colors.grey300 } variant="subtitle2">
            { sale.song.isExplicit ? "Explicit" : null }
          </Typography>
        </Stack>

        <Typography variant="subtitle1">{ sale.song.description }</Typography>
        { sale.song.collaborators && (
          <Stack
            columnGap={ 5 }
            flexDirection="row"
            flexWrap="wrap"
            justifyContent={ ["center", "center", "start"] }
            rowGap={ 2.5 }
          >
            { sale.song.collaborators.map((collaborator) => (
              <Stack
                key={ collaborator.id }
                role="button"
                sx={ {
                  cursor: "pointer",
                  flexDirection: "row",
                  gap: 1,
                  width: "max-content",
                } }
                tabIndex={ 0 }
                onClick={ () => handleArtistClick(collaborator.id) }
                onKeyDown={ () => handleArtistClick(collaborator.id) }
              >
                { collaborator.pictureUrl ? (
                  <ProfileImage
                    height={ 40 }
                    src={ collaborator.pictureUrl }
                    width={ 40 }
                  />
                ) : (
                  <AccountCircleIcon
                    sx={ {
                      color: theme.colors.grey200,
                      fontSize: "46px",
                      marginLeft: "-2px",
                    } }
                  />
                ) }

                <Stack sx={ { justifyContent: "center" } }>
                  <Typography fontWeight={ 500 } variant="h4">
                    { collaborator.name }
                  </Typography>
                  <Typography variant="subtitle1">
                    { collaborator.role }
                  </Typography>
                </Stack>
              </Stack>
            )) }
          </Stack>
        ) }

        <Formik
          initialValues={ initialFormValues }
          validationSchema={ formValidationSchema }
          onSubmit={ handlePurchaseStreamTokens }
        >
          { ({ values, isValid, handleSubmit }) => {
            const totalCost = getTotalPurchaseCost(values.streamTokens);
            const percentageOfTotalRoyalties = getPercentageOfTotalStreamTokens(
              values.streamTokens
            );

            return (
              <Form>
                <PurchaseStreamTokensModal
                  isLoading={ isTransactionLoading }
                  isOpen={ !isPurchaseModalClosed }
                  numPurchasedTokens={ values.streamTokens }
                  percentageOfTotalRoyalties={ percentageOfTotalRoyalties }
                  songTitle={ sale.song.title }
                  tokenAgreementUrl={ sale.song.tokenAgreementUrl }
                  totalPurchaseValueNewm={
                    values.streamTokens * sale.costAmountNewm
                  }
                  totalPurchaseValueUsd={
                    values.streamTokens * sale.costAmountUsd
                  }
                  onClose={ handleClosePurchaseModal }
                  onSubmit={ handleSubmit }
                />

                <Stack gap={ 2.5 } mb={ 4 } mt={ 0.5 }>
                  <Stack>
                    <Box alignSelf="flex-end" p={ 0.5 }>
                      <Tooltip
                        title={
                          <Typography>
                            The number of Stream Tokens correlates with the
                            percentage of streaming royalties you can acquire.
                            For example, 1 Stream Token equates to{ " " }
                            { `${getPercentageOfTotalStreamTokens(1)}` }% of the
                            track&apos;s total streaming royalties. For
                            information on what constitutes a streaming royalty,
                            please refer to the{ " " }
                            <span style={ { color: theme.colors.music } }>
                              <Link
                                href={ sale.song.tokenAgreementUrl }
                                rel="noopener noreferrer"
                                sx={ {
                                  width: "fit-content",
                                } }
                                target="_blank"
                                variant="h4"
                              >
                                stream token contract
                              </Link>
                            </span>
                            .
                          </Typography>
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
                              placeholder="0"
                              type="number"
                            />
                          </Box>
                          <Typography
                            alignSelf="center"
                            flexShrink={ "0" }
                            pl={ 1.5 }
                            variant="subtitle2"
                          >
                            = { percentageOfTotalRoyalties }% of total royalties
                          </Typography>
                        </Stack>
                        <Typography
                          color={ theme.colors.grey300 }
                          pt={ 0.5 }
                          variant="subtitle2"
                        >
                          Maximum stream tokens ={ " " }
                          { sale.availableBundleQuantity.toLocaleString() }
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
                    <Button
                      disabled={ !isValid || !sale.availableBundleQuantity }
                      width="full"
                      onClick={ handleOpenPurchaseModal }
                    >
                      <Typography
                        fontWeight={ theme.typography.fontWeightBold }
                        variant="body1"
                      >
                        Buy { values.streamTokens.toLocaleString() } Stream Tokens
                        • { `${totalCost.newmAmount} (≈ ${totalCost.usdAmount})` }
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
  );
};

export default Sale;
