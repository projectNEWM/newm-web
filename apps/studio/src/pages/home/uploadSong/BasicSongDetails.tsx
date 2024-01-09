import { Box, Stack, useTheme } from "@mui/material";
import {
  Alert,
  Button,
  DropdownMultiSelectField,
  DropdownSelectField,
  ErrorMessage,
  HorizontalLine,
  SolidOutline,
  SwitchInputField,
  TextAreaField,
  TextInputField,
  Typography,
  UploadImageField,
  UploadSongField,
} from "@newm-web/elements";
import {
  scrollToError,
  useEffectAfterMount,
  useExtractProperty,
  useWindowDimensions,
} from "@newm-web/utils";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { useFormikContext } from "formik";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../common";
import { PlaySong, PricingPlansDialog } from "../../../components";
import SelectCoCeators from "../../../components/minting/SelectCoCreators";
import {
  useGetGenresQuery,
  useGetLanguagesQuery,
  useGetMoodsQuery,
} from "../../../modules/content";
import {
  emptyProfile,
  useGetProfileQuery,
  VerificationStatus,
} from "../../../modules/session";
import {
  Creditor,
  Featured,
  Owner,
  UploadSongRequest,
} from "../../../modules/song";
import {
  setIsConnectWalletModalOpen,
  setIsIdenfyModalOpen,
} from "../../../modules/ui";
import { SongRouteParams } from "../library/types";

interface BasicDonDetailsProps {
  readonly isInEditMode?: boolean;
}

const BasicSongDetails: FunctionComponent<BasicDonDetailsProps> = ({
  isInEditMode,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();

  const audioRef = useRef<HTMLDivElement>(null);
  const coCreatorsRef = useRef<HTMLDivElement>(null);
  const coverArtUrlRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const songDetailsRef = useRef<HTMLDivElement>(null);

  const {
    data: {
      verificationStatus,
      dspPlanSubscribed: isArtistPricePlanSelected,
    } = emptyProfile,
  } = useGetProfileQuery();
  const { data: genres = [] } = useGetGenresQuery();
  const { data: moodOptions = [] } = useGetMoodsQuery();
  const { data: languages = [] } = useGetLanguagesQuery();
  const { songId } = useParams<"songId">() as SongRouteParams;

  const languageOptions = useExtractProperty(languages, "language_name");

  const windowWidth = useWindowDimensions()?.width;

  const isVerified = verificationStatus === VerificationStatus.Verified;

  const { values, errors, touched, setFieldValue, isSubmitting } =
    useFormikContext<UploadSongRequest>();

  // DSP pricing plan mint song toggling

  const [isPricingPlansOpen, setIsPricingPlansOpen] = useState(false);
  const handlePricingPlanClose = () => {
    setIsPricingPlansOpen(false);
  };
  const handlePricingPlanOpen = () => {
    setIsPricingPlansOpen(true);
  };

  useEffectAfterMount(() => {
    if (!isPricingPlansOpen && isArtistPricePlanSelected) {
      setFieldValue("isMinting", true);
    } else {
      setFieldValue("isMinting", false);
    }
  }, [isArtistPricePlanSelected, isPricingPlansOpen, setFieldValue]);

  const isMintingVisible = values.isMinting && isArtistPricePlanSelected;

  const isSubmitDisabled = isMintingVisible && (!wallet || !isVerified);

  const handleChangeOwners = (owners: ReadonlyArray<Owner>) => {
    setFieldValue("owners", owners);
  };

  const handleChangeCreditors = (creditors: ReadonlyArray<Creditor>) => {
    setFieldValue("creditors", creditors);
  };

  const handleChangeFeatured = (featured: ReadonlyArray<Featured>) => {
    setFieldValue("featured", featured);
  };

  const handleVerifyProfile = () => {
    dispatch(setIsIdenfyModalOpen(true));
  };

  useEffect(() => {
    scrollToError(errors, isSubmitting, [
      { error: errors.audio, element: audioRef.current },
      { error: errors.coverArtUrl, element: coverArtUrlRef.current },
      {
        error: errors.title || errors.genres || errors.moods,
        element: songDetailsRef.current,
      },
      {
        error: errors.description,
        element: descriptionRef.current,
      },
      { error: errors.creditors, element: coCreatorsRef.current },
      { error: errors.owners, element: coCreatorsRef.current },
    ]);
  }, [errors, isSubmitting]);

  return (
    <Stack>
      {!isArtistPricePlanSelected && (
        <PricingPlansDialog
          onClose={handlePricingPlanClose}
          open={isPricingPlansOpen}
        />
      )}
      <Stack direction="column" spacing={5}>
        <Stack
          sx={{
            alignItems: ["center", "center", "unset"],
            columnGap: [undefined, undefined, 1.5],
            display: "flex",
            flexDirection: ["column", "column", "row"],
            marginBottom: 3,
            maxWidth: [undefined, undefined, "700px"],
            rowGap: [2, null, 3],
          }}
        >
          <Stack
            maxWidth={theme.inputField.maxWidth}
            ref={audioRef}
            spacing={0.5}
            width="100%"
          >
            {isInEditMode ? (
              <>
                <Typography color="grey100" fontWeight={500}>
                  SONG
                </Typography>

                <SolidOutline
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexGrow: 1,
                    height: "100px",
                    justifyContent: "center",
                  }}
                >
                  <PlaySong id={songId} />
                </SolidOutline>
              </>
            ) : (
              <>
                <Typography color="grey100" fontWeight={500}>
                  SONG FILE
                </Typography>

                <UploadSongField name="audio" />
              </>
            )}
          </Stack>

          <Stack
            maxWidth={theme.inputField.maxWidth}
            ref={coverArtUrlRef}
            spacing={0.5}
            width="100%"
          >
            <Typography color="grey100" fontWeight={500}>
              SONG COVER ART
            </Typography>

            <UploadImageField
              changeImageButtonText="Change cover"
              emptyMessage="Drag and drop or browse your image"
              hasPreviewOption
              isAspectRatioOneToOne
              maxFileSizeMB={10}
              minDimensions={{ width: 1400, height: 1400 }}
              name="coverArtUrl"
              rootSx={{ width: "100%", alignSelf: "center" }}
            />
          </Stack>
        </Stack>

        <Stack
          spacing={3}
          sx={{
            marginX: ["auto", "auto", "unset"],
            maxWidth: [
              theme.inputField.maxWidth,
              theme.inputField.maxWidth,
              "700px",
            ],
            alignSelf: ["center", "center", "unset"],
          }}
        >
          <Stack
            ref={songDetailsRef}
            sx={{
              columnGap: [undefined, undefined, 1.5],
              display: "grid",
              gridTemplateColumns: ["repeat(1, 1fr)", null, "repeat(2, 1fr)"],
              rowGap: [2, null, 3],
            }}
          >
            <TextInputField
              isOptional={false}
              label="SONG TITLE"
              name="title"
              placeholder="Give your track a name..."
              widthType="full"
            />

            <DropdownMultiSelectField
              isOptional={false}
              label="GENRE"
              name="genres"
              options={genres}
              placeholder="Select all that apply"
            />

            <DropdownSelectField
              label="LANGUAGE"
              name="language"
              options={languageOptions}
              placeholder="Select a language"
            />

            <DropdownMultiSelectField
              label="MOOD"
              name="moods"
              options={moodOptions}
              placeholder="Select all that apply"
            />
          </Stack>

          <TextAreaField
            label="DESCRIPTION"
            name="description"
            placeholder="Tell us about your song"
            ref={descriptionRef}
          />

          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Box
                ref={coCreatorsRef}
                sx={{
                  backgroundColor: theme.colors.grey600,
                  border: `2px solid ${theme.colors.grey400}`,
                  borderRadius: "4px",
                }}
              >
                <SwitchInputField
                  description={
                    "Minting a song will create an NFT that reflects " +
                    "ownership, makes streaming royalties available for " +
                    "purchase, and enables royalty distribution to your account."
                  }
                  includeBorder={false}
                  name="isMinting"
                  onClick={() => {
                    if (!isArtistPricePlanSelected) handlePricingPlanOpen();
                  }}
                  title="DISTRIBUTE & MINT SONG"
                />

                {isMintingVisible && (
                  <SelectCoCeators
                    creditors={values.creditors}
                    featured={values.featured}
                    onChangeCreditors={handleChangeCreditors}
                    onChangeFeatured={handleChangeFeatured}
                    onChangeOwners={handleChangeOwners}
                    owners={values.owners}
                  />
                )}
              </Box>

              {!!touched.owners && !!errors.owners && (
                <Box mt={0.5}>
                  <ErrorMessage>{errors.owners as string}</ErrorMessage>
                </Box>
              )}

              {!!touched.creditors && !!errors.creditors && (
                <Box mt={0.5}>
                  <ErrorMessage>{errors.creditors as string}</ErrorMessage>
                </Box>
              )}
            </Stack>

            {isMintingVisible && !isVerified && (
              <Alert
                severity="warning"
                action={
                  <Button
                    aria-label="verify profile"
                    color="yellow"
                    onClick={handleVerifyProfile}
                    sx={{ textTransform: "none" }}
                    variant="outlined"
                  >
                    Verify profile
                  </Button>
                }
              >
                <Typography mb={0.5} color="yellow">
                  Verify your profile
                </Typography>
                <Typography color="yellow" fontWeight={400} variant="subtitle1">
                  Profile verification is required to mint. Please verify your
                  profile.
                </Typography>
              </Alert>
            )}

            {isMintingVisible && !wallet && (
              <Alert
                action={
                  <Button
                    aria-label="connect wallet"
                    variant="outlined"
                    color="yellow"
                    onClick={() => {
                      dispatch(setIsConnectWalletModalOpen(true));
                    }}
                    sx={{ textTransform: "none" }}
                  >
                    Connect wallet
                  </Button>
                }
                severity="warning"
                sx={{ py: 2.5 }}
              >
                <Typography mb={0.5} color="yellow">
                  Connect a wallet
                </Typography>
                <Typography color="yellow" fontWeight={400} variant="subtitle1">
                  To continue, please connect a wallet.
                </Typography>
              </Alert>
            )}
          </Stack>

          <Box>
            <HorizontalLine mb={5} />

            <Button
              disabled={isSubmitDisabled}
              isLoading={isSubmitting}
              type="submit"
              width={
                windowWidth && windowWidth > theme.breakpoints.values.md
                  ? "compact"
                  : "default"
              }
            >
              {isMintingVisible ? "Next" : isInEditMode ? "Save" : "Upload"}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BasicSongDetails;