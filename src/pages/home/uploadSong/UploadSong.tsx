import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { selectContent } from "modules/content";
import {
  DropdownSelectField,
  TextAreaField,
  TextInputField,
  UploadImageField,
  UploadSongField,
} from "components";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
import { FilledButton, HorizontalLine, Typography } from "elements";

interface UploadSongFormValues {
  readonly image?: string;
  readonly audio: string;
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
    image: "",
    audio: "",
    title: "",
    genre: "",
    description: "",
  };

  const handleSubmit = (values: UploadSongFormValues) => {
    // TODO: Submit form
    console.log(values); // eslint-disable-line
  };

  const ValidationSchema = Yup.object().shape({
    image: Yup.string().required("This field is required"),
    audio: Yup.string().required("This field is required"),
    title: Yup.string().required("This field is required"),
    genre: Yup.string().required("This field is required"),
  });

  return (
    <Box p={ 7.5 } sx={ { width: "100%", maxWidth: theme.breakpoints.values.md } }>
      <Typography variant="h3" fontWeight="extra-bold">
        UPLOAD SONG
      </Typography>

      <Box pt={ 5 }>
        <Formik
          validateOnMount={ true }
          initialValues={ initialValues }
          onSubmit={ handleSubmit }
          validationSchema={ ValidationSchema }
        >
          { () => (
            <Form>
              <Grid container spacing={ 2 } rowSpacing={ 2.25 }>
                <Grid item xs={ 6 }>
                  <Stack spacing={ 0.5 }>
                    <Typography color="grey100" fontWeight="medium">
                      MUSIC
                    </Typography>

                    <UploadSongField name="audio" />
                  </Stack>
                </Grid>

                <Grid item xs={ 6 }>
                  <Stack spacing={ 0.5 }>
                    <Typography color="grey100" fontWeight="medium">
                      SONG COVER ART
                    </Typography>

                    <UploadImageField name="image" />
                  </Stack>
                </Grid>

                <Grid item xs={ 12 }>
                  <HorizontalLine mt={ 5.5 } mb={ 4 } />
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
                  <TextAreaField
                    name="description"
                    label="SONG DESCRIPTION"
                    placeholder="Optional"
                  />
                </Grid>

                <Grid item xs={ 12 }>
                  <Box mt={ 7.5 }>
                    <FilledButton type="submit">Upload</FilledButton>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          ) }
        </Formik>
      </Box>
    </Box>
  );
};

export default UploadSong;
