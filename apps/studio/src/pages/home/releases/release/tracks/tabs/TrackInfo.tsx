import { useParams } from "react-router";

import { Formik } from "formik";

import { Box, Stack, Typography } from "@mui/material";

import { useWindowDimensions } from "@newm-web/utils";
import {
  CopyrightInputField,
  HorizontalLine,
  SolidOutline,
  SwitchInputField,
  TextAreaField,
  TextInputField,
  UploadImageField,
} from "@newm-web/elements";
import theme from "@newm-web/theme";

import PlayTrack from "./PlayTrack";
import { emptySong, useGetSongQuery } from "../../../../../../modules/song";
import { CoverRemixSample } from "../../../../../../components";
import {
  FIELDS_TOOLTIP_COPY_NODE,
  FIELDS_TOOLTIP_COPY_TEXT,
} from "../../../constants";

const TrackInfo = () => {
  const windowWidth = useWindowDimensions()?.width;
  const { trackId } = useParams<"trackId">() as { trackId: string };

  const {
    data: {
      title,
      genres: songGenres,
      moods,
      coverArtUrl,
      description,
      language,
      parentalAdvisory,
      releaseDate,
      publicationDate,
      compositionCopyrightYear,
      compositionCopyrightOwner,
      phonographicCopyrightYear,
      phonographicCopyrightOwner,
      barcodeNumber,
      barcodeType,
      isrc,
      iswc,
      instrumental: isInstrumental,
      ipis,
      coverRemixSample: isCoverRemixSample,
    } = emptySong,
  } = useGetSongQuery(trackId);

  const initialValues = {
    barcodeNumber,
    barcodeType,
    compositionCopyrightOwner,
    compositionCopyrightYear,
    consentsToContract: false,
    coverArtUrl,
    description,
    genres: songGenres,
    id: trackId,
    ipi: ipis?.join(", "),
    isCoverRemixSample,
    isExplicit: parentalAdvisory === "Explicit",
    isInstrumental,
    isMinting: false,
    isrc,
    iswc,
    language,
    moods,
    phonographicCopyrightOwner,
    phonographicCopyrightYear,
    publicationDate,
    releaseDate,
    title,
  };

  return (
    <Box
      sx={ {
        maxWidth: [
          theme.inputField.maxWidth,
          theme.inputField.maxWidth,
          "700px",
        ],
        mt: 5,
        textAlign:
          windowWidth && windowWidth > theme.breakpoints.values.md
            ? "left"
            : "center",
      } }
    >
      <Formik
        enableReinitialize={ true }
        initialValues={ initialValues }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={ () => {} }
      >
        { ({ values }) => (
          <Stack direction="column" spacing={ 5 }>
            <Typography fontWeight="700" variant="h4">
              Basic Details
            </Typography>
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
                spacing={ 0.5 }
                width="100%"
              >
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
                  <PlayTrack id={ trackId || "" } />
                </SolidOutline>
              </Stack>

              <Stack
                maxWidth={ theme.inputField.maxWidth }
                spacing={ 0.5 }
                width="100%"
              >
                <Typography color={ theme.colors.grey100 } fontWeight={ 700 }>
                  TRACK COVER ART
                </Typography>

                <UploadImageField
                  allowImageChange={ false }
                  emptyMessage="Loading..."
                  hasPreviewOption={ true }
                  name="coverArtUrl"
                  rootSx={ { alignSelf: "center", width: "100%" } }
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
                width: "100%",
              } }
            >
              <Stack
                sx={ {
                  columnGap: [undefined, undefined, 1.5],
                  display: "grid",
                  gridTemplateColumns: [
                    "repeat(1, 1fr)",
                    null,
                    "repeat(2, 1fr)",
                  ],
                  rowGap: [2, null, 3],
                } }
              >
                <TextInputField
                  disabled={ true }
                  isOptional={ false }
                  label="TRACK TITLE"
                  name="title"
                  title={ values.title || "" }
                />

                <TextInputField
                  disabled={ true }
                  isOptional={ false }
                  label="PRIMARY GENRE"
                  name="genres"
                  title={ values.genres?.join(", ") || "" }
                />

                <TextInputField
                  disabled={ true }
                  isOptional={ true }
                  label="SECONDARY GENRE"
                  name="genres"
                  title={ values.genres?.join(", ") || "" }
                />

                <TextInputField
                  disabled={ true }
                  label="LANGUAGE"
                  name="language"
                />

                <TextInputField
                  disabled={ true }
                  label="MOOD"
                  name="moods"
                  title={ values.moods?.join(", ") || "" }
                />
              </Stack>

              <TextAreaField
                disabled={ true }
                label="DESCRIPTION"
                name="description"
                title={ values.description || "" }
              />

              <Stack>
                <HorizontalLine my={ 2 } />
              </Stack>
            </Stack>
            <Typography fontWeight="700" variant="h4">
              Advanced Details
            </Typography>
            <Stack
              marginX={ ["auto", "auto", "unset"] }
              maxWidth={ [
                theme.inputField.maxWidth,
                theme.inputField.maxWidth,
                "700px",
              ] }
              spacing={ 3 }
            >
              <SwitchInputField
                disabled={ true }
                name="isInstrumental"
                title="Is this track an instrumental?"
                tooltipText={ FIELDS_TOOLTIP_COPY_TEXT.instrumental }
              />
              <SwitchInputField
                disabled={ true }
                name="isExplicit"
                title="Does the track contain explicit content?"
                tooltipText={ FIELDS_TOOLTIP_COPY_TEXT.explicit }
              />
              <CoverRemixSample disabled={ true } />
              <Stack
                columnGap={ [undefined, undefined, 1.5] }
                display="grid"
                gridTemplateColumns={ ["repeat(1, 1fr)", null, "repeat(2, 1fr)"] }
                rowGap={ [2, null, 3] }
              >
                <CopyrightInputField
                  copyrightType="composition"
                  disabled={ true }
                  isOptional={ false }
                  label="COMPOSITION COPYRIGHT"
                  ownerFieldName="compositionCopyrightOwner"
                  placeholder=""
                  tooltipText={ FIELDS_TOOLTIP_COPY_NODE.compositionCopyright }
                  yearFieldName="compositionCopyrightYear"
                />
                <CopyrightInputField
                  copyrightType="phonographic"
                  disabled={ true }
                  isOptional={ false }
                  label="SOUND RECORDING COPYRIGHT"
                  ownerFieldName="phonographicCopyrightOwner"
                  placeholder=""
                  tooltipText={ FIELDS_TOOLTIP_COPY_NODE.phonographicCopyright }
                  yearFieldName="phonographicCopyrightYear"
                />

                <TextInputField
                  disabled={ true }
                  label="ISRC"
                  mask="aa-***-99-99999"
                  maskChar={ null }
                  name="isrc"
                  tooltipText={
                    "An ISRC is a unique code that identifies this specific " +
                    "recording."
                  }
                />

                <TextInputField
                  disabled={ true }
                  label="ISWC"
                  mask="T-999999999-9"
                  maskChar={ null }
                  name="iswc"
                  tooltipText={
                    "An ISWC is the unique identification code of your song " +
                    "(unlike ISRC which is linked to  the specific recording)."
                  }
                />
              </Stack>
            </Stack>
          </Stack>
        ) }
      </Formik>
    </Box>
  );
};

export default TrackInfo;
