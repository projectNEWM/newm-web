import { Box, Link, Stack, Typography, useTheme } from "@mui/material";
import {
  Alert,
  Button,
  CheckboxField,
  DropdownMultiSelectField,
  DropdownSelectField,
  ErrorMessage,
  HorizontalLine,
  SolidOutline,
  SwitchInputField,
  TextAreaField,
  TextInputField,
  UploadImageField,
  UploadSongField,
} from "@newm-web/elements";
import {
  LocalStorage,
  scrollToError,
  useExtractProperty,
  useWindowDimensions,
} from "@newm-web/utils";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { useFormikContext } from "formik";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocalStorageKey, MintingStatus } from "@newm-web/types";
import { useFlags } from "launchdarkly-react-client-sdk";
import { UploadSongFormValues } from "./UploadSong";
import {
  NEWM_STUDIO_FAQ_URL,
  SONG_DESCRIPTION_MAX_CHARACTER_COUNT,
  useAppDispatch,
} from "../../../common";
import {
  DistributionPricingDialog,
  PlaySong,
  PricingPlansDialog,
} from "../../../components";
import SelectCoCreators from "../../../components/minting/SelectCoCreators";
import {
  useGetGenresQuery,
  useGetLanguagesQuery,
  useGetMoodsQuery,
} from "../../../modules/content";
import {
  VerificationStatus,
  emptyProfile,
  useGetProfileQuery,
} from "../../../modules/session";
import {
  Creditor,
  Featured,
  Owner,
  emptySong,
  useGetSongQuery,
} from "../../../modules/song";
import {
  setIsConnectWalletModalOpen,
  setIsIdenfyModalOpen,
} from "../../../modules/ui";
import { SongRouteParams } from "../../../common/types";

interface BasicDonDetailsProps {
  readonly isInEditMode?: boolean;
}

const BasicSongDetails: FunctionComponent<BasicDonDetailsProps> = ({
  isInEditMode,
}) => {
  const { webStudioReleaseDistributionPaymentEnhancements } = useFlags();

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();

  const audioRef = useRef<HTMLDivElement>(null);
  const coCreatorsRef = useRef<HTMLDivElement>(null);
  const coverArtUrlRef = useRef<HTMLDivElement>(null);
  const agreesToCoverArtGuidelinesRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const songDetailsRef = useRef<HTMLDivElement>(null);

  const {
    data: {
      verificationStatus,
      dspPlanSubscribed: isArtistPricePlanSelected,
      spotifyProfile,
      appleMusicProfile,
    } = emptyProfile,
  } = useGetProfileQuery();
  const { webStudioDisableTrackDistributionAndMinting } = useFlags();
  const { data: genres = [] } = useGetGenresQuery();
  const { data: moodOptions = [] } = useGetMoodsQuery();
  const { data: languages = [] } = useGetLanguagesQuery();
  const { songId } = useParams<"songId">() as SongRouteParams;
  const { data: song = emptySong } = useGetSongQuery(songId, { skip: !songId });
  const shouldShowOutletsWarning = !appleMusicProfile || !spotifyProfile;
  const isDeclined = song.mintingStatus === MintingStatus.Declined;
  const languageOptions = useExtractProperty(languages, "language_name");

  const windowWidth = useWindowDimensions()?.width;

  const isVerified = verificationStatus === VerificationStatus.Verified;

  const {
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
    dirty,
    initialValues,
  } = useFormikContext<UploadSongFormValues>();

  // DSP pricing plan mint song toggling
  const [isPricingPlansOpen, setIsPricingPlansOpen] = useState(false);
  const handlePricingPlanCancel = () => {
    setIsPricingPlansOpen(false);
    setFieldValue("isMinting", false);
  };
  const handlePricingPlanConfirm = () => {
    setIsPricingPlansOpen(false);
    setFieldValue("isMinting", true);
  };
  const handlePricingPlanOpen = () => {
    setIsPricingPlansOpen(true);
    setFieldValue("isMinting", true);
  };

  // Handle the one-time pricing plan acceptance
  useEffect(() => {
    const hasAcceptedPricingPlan =
      LocalStorage.getItem(LocalStorageKey.isStudioPricingPlanAccepted) ===
      "true";

    if (hasAcceptedPricingPlan) {
      if (!webStudioDisableTrackDistributionAndMinting) {
        setFieldValue("isMinting", true);
      }
      LocalStorage.removeItem(LocalStorageKey.isStudioPricingPlanAccepted);
    }
  }, [setFieldValue, webStudioDisableTrackDistributionAndMinting]);

  // Monitor feature flag changes, particularly seen for pricing plan acceptance
  useEffect(() => {
    if (webStudioDisableTrackDistributionAndMinting) {
      setFieldValue("isMinting", false);
    }
  }, [webStudioDisableTrackDistributionAndMinting, setFieldValue]);

  const hasCoverArtChanged = values.coverArtUrl !== initialValues.coverArtUrl;
  const isMintingVisible = values.isMinting && isArtistPricePlanSelected;

  const isSubmitDisabled =
    !values.agreesToCoverArtGuidelines ||
    (isMintingVisible && (!wallet || !isVerified)) ||
    (values.isMinting && webStudioDisableTrackDistributionAndMinting);

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
      { element: audioRef.current, error: errors.audio },
      { element: coverArtUrlRef.current, error: errors.coverArtUrl },
      {
        element: agreesToCoverArtGuidelinesRef.current,
        error: errors.agreesToCoverArtGuidelines,
      },
      {
        element: songDetailsRef.current,
        error: errors.title || errors.genres || errors.moods,
      },
      {
        element: descriptionRef.current,
        error: errors.description,
      },
      { element: coCreatorsRef.current, error: errors.creditors },
      { element: coCreatorsRef.current, error: errors.owners },
    ]);
  }, [errors, isSubmitting]);

  useEffect(() => {
    if (hasCoverArtChanged) {
      setFieldValue("agreesToCoverArtGuidelines", false);
    }
  }, [setFieldValue, hasCoverArtChanged]);

  return (
    <Stack>
      { !isArtistPricePlanSelected &&
        (webStudioReleaseDistributionPaymentEnhancements ? (
          <DistributionPricingDialog
            open={ isPricingPlansOpen }
            onCancel={ handlePricingPlanCancel }
            onConfirm={ handlePricingPlanConfirm }
          />
        ) : (
          <PricingPlansDialog
            open={ isPricingPlansOpen }
            onCancel={ handlePricingPlanCancel }
            onConfirm={ handlePricingPlanConfirm }
          />
        )) }
      <Stack direction="column" spacing={ 3 }>
        { shouldShowOutletsWarning && (
          <Stack
            alignSelf={ ["center", "center", "unset"] }
            maxWidth={ [
              theme.inputField.maxWidth,
              theme.inputField.maxWidth,
              "700px",
            ] }
          >
            <Alert
              action={
                <Button
                  color="yellow"
                  sx={ { textTransform: "none" } }
                  variant="outlined"
                  onClick={ () =>
                    navigate("/home/profile", {
                      state: { scrollToOutlets: true },
                    })
                  }
                >
                  Go to profile
                </Button>
              }
              severity="warning"
            >
              <Typography color={ theme.colors.yellow } mb={ 0.5 }>
                Outlet Profile Information Missing
              </Typography>
              <Typography
                color={ theme.colors.yellow }
                fontWeight={ 400 }
                maxWidth="460px"
                variant="subtitle1"
              >
                Please add your outlet profile URLs to your artist profile. If
                you&apos;re a first-time distributor, or do not have an outlet
                profile, disregard this message.
              </Typography>
            </Alert>
          </Stack>
        ) }
        <Stack
          sx={ {
            alignItems: ["center", "center", "unset"],
            columnGap: [undefined, undefined, 1.5],
            display: "flex",
            flexDirection: ["column", "column", "row"],
            marginBottom: 3,
            maxWidth: [undefined, undefined, "700px"],
            rowGap: [2, null, 3],
          } }
        >
          <Stack
            maxWidth={ theme.inputField.maxWidth }
            ref={ audioRef }
            spacing={ 0.5 }
            width="100%"
          >
            { isInEditMode ? (
              <>
                <Typography color={ theme.colors.grey100 } fontWeight={ 700 }>
                  SONG
                </Typography>

                <SolidOutline
                  sx={ {
                    alignItems: "center",
                    display: "flex",
                    flexGrow: 1,
                    height: "100px",
                    justifyContent: "center",
                  } }
                >
                  <PlaySong id={ songId } />
                </SolidOutline>
              </>
            ) : (
              <>
                <Typography color={ theme.colors.grey100 } fontWeight={ 700 }>
                  SONG FILE
                </Typography>

                <UploadSongField name="audio" />
              </>
            ) }
          </Stack>

          <Stack
            maxWidth={ theme.inputField.maxWidth }
            ref={ coverArtUrlRef }
            spacing={ 0.5 }
            width="100%"
          >
            <Typography color={ theme.colors.grey100 } fontWeight={ 700 }>
              SONG COVER ART
            </Typography>

            <UploadImageField
              changeImageButtonText="Change cover"
              emptyMessage="Drag and drop or browse your image"
              maxFileSizeMB={ 10 }
              minDimensions={ { height: 1400, width: 1400 } }
              minFileSizeMB={ 0.1 }
              name="coverArtUrl"
              rootSx={ { alignSelf: "center", width: "100%" } }
              hasPreviewOption
              isAspectRatioOneToOne
            />
          </Stack>
        </Stack>

        <Stack
          spacing={ 3 }
          sx={ {
            alignSelf: ["center", "center", "unset"],
            marginX: ["auto", "auto", "unset"],
            maxWidth: [
              theme.inputField.maxWidth,
              theme.inputField.maxWidth,
              "700px",
            ],
          } }
        >
          { hasCoverArtChanged && (
            <CheckboxField
              checked={
                (isInEditMode && !dirty) || values.agreesToCoverArtGuidelines
              }
              label={
                <Typography
                  sx={ {
                    color: "white",
                    fontSize: 12,
                  } }
                  variant="subtitle1"
                >
                  I confirm that the cover art meets the specified guidelines,
                  and submitting cover art that does not comply may result in a
                  declined track distribution. For a full list of these
                  guidelines, please see our{ " " }
                  <Link
                    href={ NEWM_STUDIO_FAQ_URL }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    FAQ
                  </Link>
                  .
                </Typography>
              }
              name="agreesToCoverArtGuidelines"
              ref={ agreesToCoverArtGuidelinesRef }
            />
          ) }
          <Stack
            ref={ songDetailsRef }
            sx={ {
              columnGap: [undefined, undefined, 1.5],
              display: "grid",
              gridTemplateColumns: ["repeat(1, 1fr)", null, "repeat(2, 1fr)"],
              rowGap: [2, null, 3],
            } }
          >
            <TextInputField
              isOptional={ false }
              label="SONG TITLE"
              name="title"
              placeholder="Give your track a name..."
            />

            <DropdownMultiSelectField
              isOptional={ false }
              label="GENRE"
              name="genres"
              options={ genres }
              placeholder="Select all that apply"
            />

            <DropdownSelectField
              label="LANGUAGE"
              name="language"
              options={ languageOptions }
              placeholder="Select a language"
            />

            <DropdownMultiSelectField
              label="MOOD"
              name="moods"
              options={ moodOptions }
              placeholder="Select all that apply"
            />
          </Stack>

          <TextAreaField
            characterCountLimit={ SONG_DESCRIPTION_MAX_CHARACTER_COUNT }
            currentCharacterCount={ values.description?.length }
            label="DESCRIPTION"
            name="description"
            placeholder="Tell us about your song"
            ref={ descriptionRef }
          />

          <Stack spacing={ 3 }>
            <Stack spacing={ 1.5 }>
              <Box
                ref={ coCreatorsRef }
                sx={ {
                  backgroundColor: theme.colors.grey600,
                  border: `2px solid ${theme.colors.grey400}`,
                  borderRadius: "4px",
                } }
              >
                <SwitchInputField
                  data-testid="isMinting"
                  description={
                    "Distribute your track to all major streaming platforms " +
                    "and generate stream tokens for royalty claiming."
                  }
                  disabled={
                    isDeclined || webStudioDisableTrackDistributionAndMinting
                  }
                  includeBorder={ false }
                  name="isMinting"
                  title="DISTRIBUTE & MINT SONG"
                  toggleTooltipText={
                    webStudioDisableTrackDistributionAndMinting
                      ? "Track distribution and minting are temporarily disabled, " +
                        "but we're working on it! You can still upload your tracks and " +
                        "song details to save for later. Check back in a bit for updates."
                      : undefined
                  }
                  onClick={ () => {
                    if (!isArtistPricePlanSelected) handlePricingPlanOpen();
                  } }
                />

                { isMintingVisible && (
                  <SelectCoCreators
                    creditors={ values.creditors }
                    featured={ values.featured }
                    isAddDeleteDisabled={ isDeclined }
                    owners={ values.owners }
                    onChangeCreditors={ handleChangeCreditors }
                    onChangeFeatured={ handleChangeFeatured }
                    onChangeOwners={ handleChangeOwners }
                  />
                ) }
              </Box>

              { !!touched.owners && !!errors.owners && (
                <Box mt={ 0.5 }>
                  <ErrorMessage>{ errors.owners as string }</ErrorMessage>
                </Box>
              ) }

              { !!touched.creditors && !!errors.creditors && (
                <Box mt={ 0.5 }>
                  <ErrorMessage>{ errors.creditors as string }</ErrorMessage>
                </Box>
              ) }
            </Stack>

            { isMintingVisible && !isVerified && (
              <Alert
                action={
                  <Button
                    aria-label="verify profile"
                    color="yellow"
                    sx={ { textTransform: "none" } }
                    variant="outlined"
                    onClick={ handleVerifyProfile }
                  >
                    Verify profile
                  </Button>
                }
                severity="warning"
              >
                <Typography color={ theme.colors.yellow } mb={ 0.5 }>
                  Verify your profile
                </Typography>
                <Typography
                  color={ theme.colors.yellow }
                  fontWeight={ 400 }
                  variant="subtitle1"
                >
                  Profile verification is required to mint. Please verify your
                  profile.
                </Typography>
              </Alert>
            ) }

            { isMintingVisible && !wallet && (
              <Alert
                action={
                  <Button
                    aria-label="connect wallet"
                    color="yellow"
                    sx={ { textTransform: "none" } }
                    variant="outlined"
                    onClick={ () => {
                      dispatch(setIsConnectWalletModalOpen(true));
                    } }
                  >
                    Connect wallet
                  </Button>
                }
                severity="warning"
                sx={ { py: 2.5 } }
              >
                <Typography color={ theme.colors.yellow } mb={ 0.5 }>
                  Connect a wallet
                </Typography>
                <Typography
                  color={ theme.colors.yellow }
                  fontWeight={ 400 }
                  variant="subtitle1"
                >
                  To continue, please connect a wallet.
                </Typography>
              </Alert>
            ) }
          </Stack>

          <Box>
            <HorizontalLine mb={ 5 } />

            <Button
              disabled={ isSubmitDisabled }
              isLoading={ isSubmitting }
              type="submit"
              width={
                windowWidth && windowWidth > theme.breakpoints.values.md
                  ? "compact"
                  : "default"
              }
            >
              { isMintingVisible ? "Next" : isInEditMode ? "Save" : "Upload" }
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BasicSongDetails;
