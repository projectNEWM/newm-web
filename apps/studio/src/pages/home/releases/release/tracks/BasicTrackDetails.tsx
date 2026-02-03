import { FunctionComponent, useEffect, useRef, useState } from "react";

import { useFormikContext } from "formik";

import { useFlags } from "launchdarkly-react-client-sdk";

import { Box, Link, Stack, Typography, useTheme } from "@mui/material";

import {
  CheckboxField,
  DropdownMultiSelectField,
  DropdownSelectField,
  ErrorMessage,
  SolidOutline,
  TextAreaField,
  TextInputField,
  UploadImageField,
  UploadSongField,
} from "@newm-web/elements";
import {
  LocalStorage,
  scrollToError,
  useExtractProperty,
} from "@newm-web/utils";
import { LocalStorageKey } from "@newm-web/types";

import { TrackFormValues } from "./trackFormTypes";
import {
  NEWM_STUDIO_FAQ_URL,
  SONG_DESCRIPTION_MAX_CHARACTER_COUNT,
} from "../../../../../common";
import { DistributionPricingDialog, PlaySong } from "../../../../../components";
import SelectCoCreators from "../../../../../components/minting/SelectCoCreators";
import {
  useGetGenresQuery,
  useGetLanguagesQuery,
  useGetMoodsQuery,
} from "../../../../../modules/content";
import {
  emptyProfile,
  useGetProfileQuery,
} from "../../../../../modules/session";
import { Creditor, Featured, Owner } from "../../../../../modules/song";

interface BasicTrackDetailsProps {
  readonly isDeclined?: boolean;
  readonly isInEditMode?: boolean;
  readonly trackId?: string;
}

const BasicTrackDetails: FunctionComponent<BasicTrackDetailsProps> = ({
  isDeclined = false,
  isInEditMode = false,
  trackId = "",
}) => {
  const theme = useTheme();
  const {
    data: {
      dspPlanSubscribed: isArtistPricePlanSelected = false,
    } = emptyProfile,
  } = useGetProfileQuery();
  const { webStudioDisableTrackDistributionAndMinting } = useFlags();
  const { data: genres = [] } = useGetGenresQuery();
  const { data: moodOptions = [] } = useGetMoodsQuery();
  const { data: languages = [] } = useGetLanguagesQuery();
  const languageOptions = useExtractProperty(languages, "language_name");

  const audioRef = useRef<HTMLDivElement>(null);
  const coCreatorsRef = useRef<HTMLDivElement>(null);
  const coverArtUrlRef = useRef<HTMLDivElement>(null);
  const agreesToCoverArtGuidelinesRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const songDetailsRef = useRef<HTMLDivElement>(null);

  const {
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
    initialValues,
  } = useFormikContext<TrackFormValues>();

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

  const handleChangeOwners = (owners: ReadonlyArray<Owner>) => {
    setFieldValue("owners", owners);
  };

  const handleChangeCreditors = (creditors: ReadonlyArray<Creditor>) => {
    setFieldValue("creditors", creditors);
  };

  const handleChangeFeatured = (featured: ReadonlyArray<Featured>) => {
    setFieldValue("featured", featured);
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
      { !isArtistPricePlanSelected && (
        <DistributionPricingDialog
          open={ isPricingPlansOpen }
          onCancel={ handlePricingPlanCancel }
          onConfirm={ handlePricingPlanConfirm }
        />
      ) }
      <Stack direction="column" spacing={ 3 }>
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
                  <PlaySong id={ trackId } />
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
              checked={ values.agreesToCoverArtGuidelines }
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
            <Box
              sx={ {
                backgroundColor: theme.colors.grey600,
                border: `2px solid ${theme.colors.grey400}`,
                borderRadius: "4px",
              } }
            >
              <SelectCoCreators
                creditors={ values.creditors }
                featured={ values.featured }
                isAddDeleteDisabled={ isDeclined }
                owners={ values.owners }
                onChangeCreditors={ handleChangeCreditors }
                onChangeFeatured={ handleChangeFeatured }
                onChangeOwners={ handleChangeOwners }
              />
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
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BasicTrackDetails;
