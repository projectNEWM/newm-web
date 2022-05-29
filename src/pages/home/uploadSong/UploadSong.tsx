import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Stack } from "@mui/material";
import { Formik } from "formik";
import { selectContent } from "modules/content";
import {
  DropdownSelectField,
  TextInputField,
  UploadImage,
  UploadSong as UploadSongPicker,
} from "components";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
import { FilledButton, HorizontalLine, Typography } from "elements";

interface UploadSongFormValues {
  readonly image: {
    readonly file: string;
    readonly signature: string;
    readonly cloudName: string;
    readonly apiKey: string;
  };
  readonly title: string;
  readonly genre: string;
  readonly description: string;
}

const UploadSong: FunctionComponent = () => {
  const theme = useTheme();

  const { genres } = useSelector(selectContent);

  const genreOptions = genres.map((genre, idx) => ({
    id: idx + 1,
    name: genre,
    value: genre,
  }));

  const initialValues: UploadSongFormValues = {
    image: {
      file: "",
      signature: "",
      cloudName: "",
      apiKey: "",
    },
    title: "",
    genre: "",
    description: "",
  };

  const handleSubmit = (values: UploadSongFormValues) => {
    // TODO: Submit form
    console.log(values); // eslint-disable-line
  };

  const handleError = (message: string) => {
    // TODO: Update Redex UI state
    console.log(message); // eslint-disable-line
  };

  const validationSchema = Yup.object().shape({
    image: Yup.object({
      file: Yup.string().required("Required"),
      signature: Yup.string().required("Required"),
      cloudName: Yup.string().required("Required"),
      apiKey: Yup.string().required("Required"),
    }),
    title: Yup.string().required("Required"),
    genre: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  return (
    <Box p={ 7.5 } sx={ { width: "100%", maxWidth: theme.breakpoints.values.md } }>
      <Typography variant="h3" fontWeight="extra-bold">
        UPLOAD SONG
      </Typography>

      <Box pt={ 5 }>
        <Formik
          initialValues={ initialValues }
          onSubmit={ handleSubmit }
          validationSchema={ validationSchema }
        >
          <Grid container spacing={ 2 }>
            <Grid item xs={ 6 }>
              <Stack spacing={ 0.5 }>
                <Typography color="grey100" fontWeight="medium">
                  MUSIC
                </Typography>

                <UploadImage onError={ handleError } />
              </Stack>
            </Grid>

            <Grid item xs={ 6 }>
              <Stack spacing={ 0.5 }>
                <Typography color="grey100" fontWeight="medium">
                  SONG COVER ART
                </Typography>

                <UploadSongPicker onError={ handleError } />
              </Stack>
            </Grid>

            <Grid item xs={ 12 }>
              <HorizontalLine mt={ 7.5 } mb={ 6.25 } />
            </Grid>

            <Grid item xs={ 6 }>
              <TextInputField name="title" label="SONG TITLE" />
            </Grid>

            <Grid item xs={ 6 }>
              <DropdownSelectField
                name="genre"
                label="Genre"
                options={ genreOptions }
              />
            </Grid>

            <Grid item xs={ 12 }>
              <Box mt={ 7.5 }>
                <FilledButton type="submit">Upload</FilledButton>
              </Box>
            </Grid>
          </Grid>
        </Formik>
      </Box>
    </Box>
  );
};

export default UploadSong;
