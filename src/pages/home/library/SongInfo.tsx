import { useRef } from "react";
import * as Yup from "yup";
import { Box, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { Form, Formik, FormikValues } from "formik";
import {
  commonYupValidation,
  extractProperty,
  getUpdatedValues,
  scrollToError,
  useWindowDimensions,
} from "common";
import {
  DropdownMultiSelectField,
  TextAreaField,
  TextInputField,
  UploadImageField,
} from "components";
import { Button, HorizontalLine, Typography } from "elements";
import theme from "theme";
import {
  Song,
  emptySong,
  useGetSongQuery,
  usePatchSongThunk,
} from "modules/song";
import { Genre, useGetGenresQuery, useGetMoodsQuery } from "modules/content";

const SongInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const windowWidth = useWindowDimensions()?.width;
  const { id = "" } = location.state as Song;

  const coverArtUrlRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const genresRef = useRef<HTMLDivElement>(null);

  const { data: genresData = [] } = useGetGenresQuery();
  const { data: moodOptions = [] } = useGetMoodsQuery();
  const [patchSong] = usePatchSongThunk();
  const {
    data: {
      title,
      coverArtUrl,
      description,
      genres = [],
      moods = [],
    } = emptySong,
  } = useGetSongQuery(id);

  const initialValues = {
    coverArtUrl,
    description,
    genres,
    moods,
    title,
  };

  const genreOptions = extractProperty<Genre, "name">(genresData, "name");

  const validationSchema = Yup.object({
    coverArtUrl: commonYupValidation.coverArtUrl,
    description: Yup.string(),
    genres: commonYupValidation
      .genres(genreOptions)
      .min(1, "At least one genre is required"),
    title: commonYupValidation.title,
  });

  /**
   * Update profile data with modifications made.
   */
  const handleSubmit = (values: FormikValues) => {
    const updatedValues = getUpdatedValues(initialValues, values);

    patchSong({ id, ...updatedValues });
  };

  return (
    <Box sx={ { mt: 5 } }>
      <Formik
        enableReinitialize={ true }
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
        validateOnBlur={ false }
        validationSchema={ validationSchema }
      >
        { ({ dirty, errors, isSubmitting }) => {
          scrollToError(errors, isSubmitting, [
            { error: errors.coverArtUrl, element: coverArtUrlRef.current },
            { error: errors.title, element: titleRef.current },
            { error: errors.genres, element: genresRef.current },
          ]);

          return (
            <Form
              style={ {
                textAlign:
                  windowWidth && windowWidth > theme.breakpoints.values.md
                    ? "left"
                    : "center",
              } }
            >
              <Stack
                sx={ {
                  m: ["0 auto", undefined, "0"],
                  maxWidth: theme.inputField.maxWidth,
                  textAlign: "left",
                } }
                spacing={ 0.5 }
                ref={ coverArtUrlRef }
              >
                <Typography color="grey100" fontWeight={ 500 }>
                  SONG COVER ART
                </Typography>

                <UploadImageField
                  name="coverArtUrl"
                  changeImageButtonText="Change cover"
                  emptyMessage="Drag and drop or browse your image"
                  minDimensions={ { width: 2048, height: 2048 } }
                  isMultiButtonLayout={ true }
                />
              </Stack>
              <Stack
                sx={ {
                  marginY: 5,
                  marginX: ["auto", "auto", "unset"],
                  maxWidth: ["340px", "340px", "700px"],
                } }
              >
                <HorizontalLine />
              </Stack>

              <Stack
                spacing={ 2.5 }
                sx={ {
                  marginX: ["auto", "auto", "unset"],
                  maxWidth: ["340px", "340px", "700px"],
                } }
              >
                <TextInputField
                  isOptional={ false }
                  name="title"
                  label="SONG TITLE"
                  placeholder="Give your track a name..."
                  widthType="full"
                  ref={ titleRef }
                />

                <Stack
                  ref={ genresRef }
                  sx={ {
                    display: "grid",
                    gridTemplateColumns: [
                      "repeat(1, 1fr)",
                      null,
                      "repeat(2, 1fr)",
                    ],
                    rowGap: ["16px", null, "12px"],
                    columnGap: [undefined, undefined, "20px"],
                  } }
                >
                  <DropdownMultiSelectField
                    label="Genres"
                    isOptional={ false }
                    name="genres"
                    placeholder="Select all that apply"
                    options={ genreOptions }
                  />

                  <DropdownMultiSelectField
                    label="Moods"
                    name="moods"
                    placeholder="Select all that apply"
                    options={ moodOptions }
                  />
                </Stack>
              </Stack>

              <Stack
                sx={ {
                  marginTop: 2.5,
                  marginX: ["auto", "auto", "unset"],
                  maxWidth: ["340px", "340px", "700px"],
                } }
              >
                <TextAreaField
                  name="description"
                  label="SONG DESCRIPTION"
                  placeholder="Description"
                  widthType={
                    windowWidth && windowWidth > theme.breakpoints.values.md
                      ? "full"
                      : "default"
                  }
                />
              </Stack>

              <Stack
                sx={ {
                  marginY: 5,
                  marginX: ["auto", "auto", "unset"],
                  maxWidth: ["340px", "340px", "700px"],
                } }
              >
                <HorizontalLine />
                <Stack
                  sx={ {
                    columnGap: 2,
                    flexDirection: [null, null, "row"],
                    mt: 5,
                    rowGap: 2,
                  } }
                >
                  <Button
                    color="music"
                    onClick={ () => navigate(-1) }
                    variant="secondary"
                    width={
                      windowWidth && windowWidth > theme.breakpoints.values.md
                        ? "compact"
                        : "default"
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    sx={ { display: dirty ? "inline-flex" : "none" } }
                    isLoading={ isSubmitting }
                    width={
                      windowWidth && windowWidth > theme.breakpoints.values.md
                        ? "compact"
                        : "default"
                    }
                    type="submit"
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Form>
          );
        } }
      </Formik>
    </Box>
  );
};

export default SongInfo;
