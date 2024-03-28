import { Box, Stack } from "@mui/material";
import { useParams } from "react-router";
import { useWindowDimensions } from "@newm-web/utils";
import {
  CopyrightInputField,
  HorizontalLine,
  SolidOutline,
  SwitchInputField,
  TextAreaField,
  TextInputField,
  Typography,
  UploadImageField,
} from "@newm-web/elements";
import theme from "@newm-web/theme";
import { Formik } from "formik";
import { SongRouteParams } from "./types";
import { emptySong, useGetSongQuery } from "../../../modules/song";
import { CoverRemixSample, PlaySong } from "../../../components";

const SongInfo = () => {
  const windowWidth = useWindowDimensions()?.width;
  const { songId } = useParams<"songId">() as SongRouteParams;

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
  } = useGetSongQuery(songId);

  const initialValues = {
    barcodeNumber,
    barcodeType,
    compositionCopyrightOwner,
    compositionCopyrightYear,
    consentsToContract: false,
    coverArtUrl,
    description,
    genres: songGenres,
    id: songId,
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
                <Typography color="grey100" fontWeight={ 500 }>
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
                  <PlaySong id={ songId || "" } />
                </SolidOutline>
              </Stack>

              <Stack
                maxWidth={ theme.inputField.maxWidth }
                spacing={ 0.5 }
                width="100%"
              >
                <Typography color="grey100" fontWeight={ 500 }>
                  SONG COVER ART
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
                  label="SONG TITLE"
                  name="title"
                  title={ values.title || "" }
                />

                <TextInputField
                  disabled={ true }
                  isOptional={ false }
                  label="GENRE"
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
                title="Is this song an instrumental?"
                tooltipText={
                  "Songs without voices or lyrics should be indicated as an " +
                  "instrumental. Failure to accurately label the song will " +
                  "result in a declined distribution submission."
                }
              />
              <SwitchInputField
                disabled={ true }
                name="isExplicit"
                title="Does the song contain explicit content?"
                tooltipText={
                  "Explicit content includes strong or discriminatory language, " +
                  "or depictions of sex, violence or substance abuse."
                }
              />
              <CoverRemixSample disabled={ true } />
              <Stack
                columnGap={ [undefined, undefined, 1.5] }
                display="grid"
                gridTemplateColumns={ ["repeat(1, 1fr)", null, "repeat(2, 1fr)"] }
                rowGap={ [2, null, 3] }
              >
                <TextInputField
                  disabled={ true }
                  isOptional={ false }
                  label="SCHEDULE RELEASE DATE"
                  name="releaseDate"
                  tooltipText={
                    "When selecting a date to release your song on our " +
                    "platform, please remember to factor in approval from any " +
                    "contributors/featured artists as well as mint processing time " +
                    "which can take up to 15 days."
                  }
                  type="date"
                />
                <TextInputField
                  disabled={ true }
                  label="ORIGINAL PUBLICATION DATE"
                  name="publicationDate"
                  tooltipText={
                    "If your song has already been launched on other platforms you " +
                    "may input the release date here, but it is not required."
                  }
                  type="date"
                />
                <CopyrightInputField
                  copyrightType="composition"
                  disabled={ true }
                  isOptional={ false }
                  label="COMPOSITION COPYRIGHT"
                  ownerFieldName="compositionCopyrightOwner"
                  placeholder=""
                  tooltipText={
                    "The copyright for a musical composition covers the " +
                    "music and lyrics of a song (not the recorded " +
                    "performance). It is typically owned by the songwriter " +
                    "and/or music publisher."
                  }
                  yearFieldName="compositionCopyrightYear"
                />
                <CopyrightInputField
                  copyrightType="phonographic"
                  disabled={ true }
                  isOptional={ false }
                  label="SOUND RECORDING COPYRIGHT"
                  ownerFieldName="phonographicCopyrightOwner"
                  placeholder=""
                  tooltipText={
                    "The copyright in a sound recording covers the " +
                    "recording itself (it does not cover the music " +
                    "or lyrics of the song). It is typically owned by " +
                    "the artist and/or record label."
                  }
                  yearFieldName="phonographicCopyrightYear"
                />
                <TextInputField
                  disabled={ true }
                  label="RELEASE CODE TYPE"
                  name="barcodeType"
                />
                <TextInputField
                  disabled={ true }
                  label="RELEASE CODE NUMBER"
                  name="barcodeNumber"
                  tooltipText={
                    "A release code number is a unique code that identifies " +
                    "your release."
                  }
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
                  label="IPI"
                  name="ipi"
                  tooltipText={
                    "An IPI is a nine-digit number used to identify songwriters, " +
                    "composers, and music publishers."
                  }
                  type="number"
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

export default SongInfo;
