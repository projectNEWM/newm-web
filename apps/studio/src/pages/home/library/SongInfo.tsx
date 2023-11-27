import { Box, Stack } from "@mui/material";
import { useParams } from "react-router";
import { useWindowDimensions } from "@newm.io/studio/common";
import {
  CopyrightInputField,
  PlaySong,
  SolidOutline,
  SwitchInputField,
  TextAreaField,
  TextInputField,
  UploadImageField,
} from "@newm.io/studio/components";
import { HorizontalLine, Typography } from "@newm.io/studio/elements";
import theme from "@newm.io/theme";
import { emptySong, useGetSongQuery } from "@newm.io/studio/modules/song";
import { Formik } from "formik";
import { SongRouteParams } from "./types";

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
      ipis,
    } = emptySong,
  } = useGetSongQuery(songId);

  const initialValues = {
    id: songId,
    coverArtUrl,
    title,
    genres: songGenres,
    moods,
    description,
    compositionCopyrightYear,
    compositionCopyrightOwner,
    phonographicCopyrightYear,
    phonographicCopyrightOwner,
    isrc,
    releaseDate,
    isExplicit: parentalAdvisory === "Explicit",
    isMinting: false,
    language,
    consentsToContract: false,
    barcodeNumber,
    barcodeType,
    publicationDate,
    iswc,
    userIpi: ipis?.join(", "),
  };

  return (
    <Box
      sx={{
        mt: 5,
        textAlign:
          windowWidth && windowWidth > theme.breakpoints.values.md
            ? "left"
            : "center",
        maxWidth: [
          theme.inputField.maxWidth,
          theme.inputField.maxWidth,
          "700px",
        ],
      }}
    >
      <Formik
        initialValues={initialValues}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        {({ values }) => (
          <Stack direction="column" spacing={5}>
            <Typography variant="h4" fontWeight="700">
              Basic Details
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: ["column", "column", "row"],
                columnGap: [undefined, undefined, 1.5],
                rowGap: [2, null, 3],
                maxWidth: [undefined, undefined, "700px"],
                marginBottom: 3,
                alignItems: ["center", "center", "unset"],
              }}
            >
              <Stack
                maxWidth={theme.inputField.maxWidth}
                spacing={0.5}
                width="100%"
              >
                <Typography color="grey100" fontWeight={500}>
                  SONG
                </Typography>

                <SolidOutline
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1,
                    height: "100px",
                  }}
                >
                  <PlaySong id={songId || ""} />
                </SolidOutline>
              </Stack>

              <Stack
                maxWidth={theme.inputField.maxWidth}
                spacing={0.5}
                width="100%"
              >
                <Typography color="grey100" fontWeight={500}>
                  SONG COVER ART
                </Typography>

                <UploadImageField
                  rootSx={{ width: "100%", alignSelf: "center" }}
                  name="coverArtUrl"
                  emptyMessage="Loading..."
                  hasPreviewOption={true}
                  allowImageChange={false}
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
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  display: "grid",
                  gridTemplateColumns: [
                    "repeat(1, 1fr)",
                    null,
                    "repeat(2, 1fr)",
                  ],
                  rowGap: [2, null, 3],
                  columnGap: [undefined, undefined, 1.5],
                }}
              >
                <TextInputField
                  disabled={true}
                  isOptional={false}
                  label="SONG TITLE"
                  name="title"
                  title={values.title || ""}
                  widthType="full"
                />

                <TextInputField
                  disabled={true}
                  isOptional={false}
                  label="GENRE"
                  name="genres"
                  title={values.genres?.join(", ") || ""}
                />

                <TextInputField
                  disabled={true}
                  label="LANGUAGE"
                  name="language"
                />

                <TextInputField
                  disabled={true}
                  label="MOOD"
                  name="moods"
                  title={values.moods?.join(", ") || ""}
                />
              </Stack>

              <TextAreaField
                disabled={true}
                label="DESCRIPTION"
                name="description"
                title={values.description || ""}
              />

              <Stack>
                <HorizontalLine my={2} />
              </Stack>
            </Stack>
            <Typography variant="h4" fontWeight="700">
              Advanced Details
            </Typography>
            <Stack
              marginX={["auto", "auto", "unset"]}
              maxWidth={[
                theme.inputField.maxWidth,
                theme.inputField.maxWidth,
                "700px",
              ]}
              spacing={3}
            >
              <SwitchInputField
                disabled={true}
                name="isExplicit"
                title="Does the song contain explicit content?"
                tooltipText={
                  "Explicit content includes strong or discriminatory language, " +
                  "or depictions of sex, violence or substance abuse."
                }
              />
              <Stack
                display="grid"
                gridTemplateColumns={["repeat(1, 1fr)", null, "repeat(2, 1fr)"]}
                rowGap={[2, null, 3]}
                columnGap={[undefined, undefined, 1.5]}
              >
                <TextInputField
                  disabled={true}
                  isOptional={false}
                  label="SCHEDULE RELEASE DATE"
                  name="releaseDate"
                  type="date"
                  tooltipText={
                    "When selecting a date to release your song on our " +
                    "platform, please remember to factor in approval from any " +
                    "contributors/featured artists as well as mint processing time " +
                    "which can take up to 15 days."
                  }
                />
                <TextInputField
                  disabled={true}
                  name="publicationDate"
                  label="ORIGINAL PUBLICATION DATE"
                  type="date"
                  tooltipText={
                    "If your song has already been launched on other platforms you " +
                    "may input the release date here, but it is not required."
                  }
                />
                <CopyrightInputField
                  disabled={true}
                  label="COMPOSITION COPYRIGHT"
                  yearFieldName="compositionCopyrightYear"
                  ownerFieldName="compositionCopyrightOwner"
                  copyrightType="composition"
                  isOptional={false}
                  placeholder=""
                  tooltipText={
                    "The copyright for a musical composition covers the " +
                    "music and lyrics of a song (not the recorded " +
                    "performance). It is typically owned by the songwriter " +
                    "and/or music publisher."
                  }
                />
                <CopyrightInputField
                  disabled={true}
                  label="SOUND RECORDING COPYRIGHT"
                  yearFieldName="phonographicCopyrightYear"
                  ownerFieldName="phonographicCopyrightOwner"
                  copyrightType="phonographic"
                  isOptional={false}
                  placeholder=""
                  tooltipText={
                    "The copyright in a sound recording covers the " +
                    "recording itself (it does not cover the music " +
                    "or lyrics of the song). It is typically owned by " +
                    "the artist and/or record label."
                  }
                />
                <TextInputField
                  disabled={true}
                  name="barcodeType"
                  label="RELEASE CODE TYPE"
                />
                <TextInputField
                  disabled={true}
                  name="barcodeNumber"
                  label="RELEASE CODE NUMBER"
                  tooltipText={
                    "A release code number is a unique code that identifies " +
                    "your release."
                  }
                />
                <TextInputField
                  disabled={true}
                  label="ISRC"
                  mask="aa-***-99-99999"
                  maskChar={null}
                  name="isrc"
                  tooltipText={
                    "An ISRC is a unique code that identifies this specific " +
                    "recording."
                  }
                />
                <TextInputField
                  disabled={true}
                  label="IPI"
                  name="userIpi"
                  tooltipText={
                    "An IPI is a unique code assigned to songwriters, " +
                    "composers, and music publishers."
                  }
                  type="number"
                />
                <TextInputField
                  disabled={true}
                  label="ISWC"
                  mask="T-999999999-9"
                  maskChar={null}
                  name="iswc"
                  tooltipText={
                    "An ISWC is the unique identification code of your song " +
                    "(unlike ISRC which is linked to  the specific recording)."
                  }
                />
              </Stack>
            </Stack>
          </Stack>
        )}
      </Formik>
    </Box>
  );
};

export default SongInfo;
