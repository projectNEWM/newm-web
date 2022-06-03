import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { selectContent } from "modules/content";
import { UploadSongFormValues, uploadSong } from "modules/song";
import {
  DropdownSelectField,
  TextAreaField,
  TextInputField,
  UploadImageField,
  UploadSongField,
} from "components";
import * as Yup from "yup";
import { FilledButton, HorizontalLine, Typography } from "elements";

const UploadSong: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { genres } = useSelector(selectContent);

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

    dispatch(uploadSong(values));
  };

  const ValidationSchema = Yup.object().shape({
    image: Yup.string().required("This field is required"),
    audio: Yup.string().required("This field is required"),
    title: Yup.string().required("This field is required"),
    genre: Yup.string().required("This field is required"),
  });

  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginLeft: [null, null, 4.5],
        overflow: "auto",
        paddingY: 7.5,
        textAlign: ["center", "center", "initial"],
        maxWidth: [undefined, undefined, "750px"],
      } }
    >
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
                <Grid item xs={ 12 } md={ 6 }>
                  <Stack spacing={ 0.5 }>
                    <Typography color="grey100" fontWeight="medium">
                      MUSIC
                    </Typography>

                    <UploadSongField name="audio" />
                  </Stack>
                </Grid>

                <Grid item xs={ 12 } md={ 6 }>
                  <Stack spacing={ 0.5 }>
                    <Typography color="grey100" fontWeight="medium">
                      SONG COVER ART
                    </Typography>

                    <UploadImageField name="image" />
                  </Stack>
                </Grid>

                <Grid
                  item
                  xs={ 12 }
                  sx={ {
                    marginX: ["auto", "auto", "unset"],
                    maxWidth: ["340px", "340px", "750px"],
                  } }
                >
                  <HorizontalLine mt={ 5.5 } mb={ 4 } />
                </Grid>

                <Grid item xs={ 12 } md={ 6 }>
                  <TextInputField name="title" label="SONG TITLE" />
                </Grid>

                <Grid item xs={ 12 } md={ 6 }>
                  <DropdownSelectField
                    name="genre"
                    label="GENRE"
                    options={ genres }
                  />
                </Grid>

                <Grid item xs={ 12 } justifyContent="center">
                  <TextAreaField
                    name="description"
                    label="SONG DESCRIPTION"
                    placeholder="Optional"
                  />
                </Grid>

                <Grid item xs={ 12 }>
                  <Box mt={ 6 }>
                    <FilledButton
                      type="submit"
                      sx={ {
                        maxWidth: ["340px", "340px", null],
                        width: "100%",
                      } }
                    >
                      Upload
                    </FilledButton>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          ) }
        </Formik>
      </Box>
    </Container>
  );
};

export default UploadSong;
