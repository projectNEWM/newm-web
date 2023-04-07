import * as Yup from "yup";
import { Box, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Form, Formik, FormikValues } from "formik";
import { commonYupValidation, useWindowDimensions } from "common";
import {
  DropdownMultiSelectField,
  TextAreaField,
  TextInputField,
  UploadImageField,
} from "components";
import { Button, HorizontalLine, Typography } from "elements";
import theme from "theme";
import { Song, patchSong, useGetSongQuery } from "modules/song";
import { useGetGenresQuery, useGetMoodsQuery } from "modules/content";

const SongInfo = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windowWidth = useWindowDimensions()?.width;
  const { id = "" } = location.state as Song;

  const { data: genreOptions = [] } = useGetGenresQuery();
  const { data: moodOptions = [] } = useGetMoodsQuery();
  const { data: song = {} } = useGetSongQuery(id);

  const {
    coverArtUrl = "",
    description = "",
    genres = [],
    moods = [],
    title = "",
  } = song;

  const initialValues = {
    image: coverArtUrl,
    description,
    genres,
    moods,
    title,
  };

  const validationSchema = Yup.object({
    description: Yup.string(),
    genres: commonYupValidation
      .genres(genreOptions)
      .min(1, "At lease one genre is required"),
    image: Yup.mixed(),
    title: Yup.string(),
  });

  /**
   * Update profile data with modifications made.
   */
  const handleSubmit = (values: FormikValues) => {
    const updatedValues: FormikValues = {};
    if (values.image && coverArtUrl !== values.image) {
      updatedValues.image = values.image;
    }
    if (description !== values.description) {
      updatedValues.description = values.description;
    }
    if (JSON.stringify(genres) !== JSON.stringify(values.genres)) {
      updatedValues.genres = values.genres;
    }
    if (JSON.stringify(moods) !== JSON.stringify(values.moods)) {
      updatedValues.moods = values.moods;
    }
    if (title !== values.title) {
      updatedValues.title = values.title;
    }

    dispatch(patchSong({ id, ...updatedValues }));
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
        { ({ dirty }) => {
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
              >
                <Typography color="grey100" fontWeight={ 500 }>
                  SONG COVER ART
                </Typography>

                <UploadImageField
                  name="image"
                  message="Drag and drop or browse your image"
                  minDimensions={ { width: 2048, height: 2048 } }
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
                />

                <Stack
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
