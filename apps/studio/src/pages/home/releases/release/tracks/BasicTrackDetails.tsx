import { FunctionComponent, useEffect, useRef } from "react";

import { useFormikContext } from "formik";

import { Link, Stack, Typography, useTheme } from "@mui/material";

import {
  CheckboxField,
  DropdownMultiSelectField,
  DropdownSelectField,
  HorizontalLine,
  SolidOutline,
  TextAreaField,
  TextInputField,
  UploadSongField,
} from "@newm-web/elements";
import { scrollToError, useExtractProperty } from "@newm-web/utils";

import { TrackFormValues } from "./trackFormTypes";
import PlayTrack from "./tabs/PlayTrack";
import {
  NEWM_STUDIO_FAQ_URL,
  SONG_DESCRIPTION_MAX_CHARACTER_COUNT,
} from "../../../../../common";
import {
  useGetGenresQuery,
  useGetLanguagesQuery,
  useGetMoodsQuery,
} from "../../../../../modules/content";

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
  const { data: genres = [] } = useGetGenresQuery();
  const { data: moodOptions = [] } = useGetMoodsQuery();
  const { data: languages = [] } = useGetLanguagesQuery();
  const languageOptions = useExtractProperty(languages, "language_name");

  const audioRef = useRef<HTMLDivElement>(null);
  const coverArtUrlRef = useRef<HTMLDivElement>(null);
  const agreesToCoverArtGuidelinesRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const trackDetailsRef = useRef<HTMLDivElement>(null);

  const { values, errors, setFieldValue, isSubmitting, initialValues } =
    useFormikContext<TrackFormValues>();

  const hasCoverArtChanged = values.coverArtUrl !== initialValues.coverArtUrl;

  useEffect(() => {
    scrollToError(errors, isSubmitting, [
      { element: audioRef.current, error: errors.audio },
      { element: coverArtUrlRef.current, error: errors.coverArtUrl },
      {
        element: agreesToCoverArtGuidelinesRef.current,
        error: errors.agreesToCoverArtGuidelines,
      },
      {
        element: trackDetailsRef.current,
        error: errors.title || errors.genres || errors.moods,
      },
      {
        element: descriptionRef.current,
        error: errors.description,
      },
    ]);
  }, [errors, isSubmitting]);

  useEffect(() => {
    if (hasCoverArtChanged) {
      setFieldValue("agreesToCoverArtGuidelines", false);
    }
  }, [setFieldValue, hasCoverArtChanged]);

  return (
    <Stack>
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
                  TRACK
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
                  <PlayTrack id={ trackId } />
                </SolidOutline>
              </>
            ) : (
              <Stack
                direction={ ["column", "column", "row"] }
                spacing={ 1.5 }
                sx={ {
                  alignItems: ["stretch", "stretch", "flex-start"],
                  gap: [2, null, 2],
                  width: "100%",
                } }
              >
                <Stack
                  spacing={ 0.5 }
                  sx={ {
                    flex: ["1 1 auto", "1 1 auto", "0 0 320px"],
                    maxWidth: ["100%", "100%", "320px"],
                    minWidth: 0,
                  } }
                >
                  <Typography color={ theme.colors.grey100 } fontWeight={ 700 }>
                    TRACK FILE
                  </Typography>
                  <UploadSongField name="audio" />
                </Stack>
                <Stack
                  spacing={ 0.5 }
                  sx={ {
                    flex: ["1 1 auto", "1 1 auto", "1 1 0"],
                    minWidth: "100%",
                  } }
                >
                  <TextInputField
                    isOptional={ false }
                    label="TRACK TITLE"
                    name="title"
                    placeholder="Give your track a name..."
                  />
                </Stack>
              </Stack>
            ) }
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
            ref={ trackDetailsRef }
            sx={ {
              columnGap: [undefined, undefined, 1.5],
              display: "grid",
              gridTemplateColumns: ["repeat(1, 1fr)", null, "repeat(2, 1fr)"],
              rowGap: [2, null, 3],
            } }
          >
            <DropdownMultiSelectField
              isOptional={ false }
              label="PRIMARY GENRE"
              name="primaryGenre"
              options={ genres ?? [] }
              placeholder="Select primary genre"
            />

            <DropdownMultiSelectField
              isOptional={ true }
              label="SECONDARY GENRE"
              name="secondaryGenre"
              options={ genres ?? [] }
              placeholder="Select secondary genre"
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

          <HorizontalLine />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BasicTrackDetails;
