import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilledButton, HorizontalLine, Typography } from "elements";
import { Box, Container, Stack } from "@mui/material";
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
import MintSong from "./MintSong";

const UploadSong: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { genres } = useSelector(selectContent);

  const initialValues: UploadSongFormValues = {
    image: undefined,
    audio: undefined,
    title: "",
    genre: "",
    description: "",
    isMinting: false,
    largestUtxo: undefined,
  };

  const handleSubmit = (values: UploadSongFormValues) => {
    dispatch(uploadSong(values));
  };

  const ValidationSchema = Yup.object().shape({
    image: Yup.mixed().required("This field is required"),
    audio: Yup.mixed().required("This field is required"),
    title: Yup.string().required("This field is required"),
    genre: Yup.string().required("This field is required"),
  });

  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginX: [null, null, 3],
        overflow: "auto",
        textAlign: ["center", "center", "initial"],
      } }
    >
      <Typography variant="h3" fontWeight={ 800 }>
        UPLOAD SONG
      </Typography>

      <Box pt={ 5 }>
        <Formik
          validateOnBlur={ false }
          initialValues={ initialValues }
          onSubmit={ handleSubmit }
          validationSchema={ ValidationSchema }
        >
          { () => (
            <Form>
              <Stack
                sx={ {
                  display: "grid",
                  gridTemplateColumns: [
                    "repeat(1, 1fr)",
                    null,
                    "repeat(2, 1fr)",
                  ],
                  columnGap: [undefined, undefined, "20px"],
                  maxWidth: [undefined, undefined, "700px"],
                  rowGap: ["16px", null, "12px"],
                } }
              >
                <Stack spacing={ 0.5 }>
                  <Typography color="grey100" fontWeight={ 500 }>
                    MUSIC
                  </Typography>

                  <UploadSongField name="audio" />
                </Stack>

                <Stack spacing={ 0.5 }>
                  <Typography color="grey100" fontWeight={ 500 }>
                    SONG COVER ART
                  </Typography>

                  <UploadImageField name="image" />
                </Stack>
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
                sx={ {
                  display: "grid",
                  gridTemplateColumns: [
                    "repeat(1, 1fr)",
                    null,
                    "repeat(2, 1fr)",
                  ],
                  rowGap: ["16px", null, "12px"],
                  columnGap: [undefined, undefined, "20px"],
                  maxWidth: [undefined, undefined, "700px"],
                } }
              >
                <TextInputField name="title" label="SONG TITLE" />

                <DropdownSelectField
                  name="genre"
                  label="GENRE"
                  options={ genres }
                />
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
                  placeholder="Optional"
                />

                <Box mt={ 5 }>
                  <HorizontalLine />
                </Box>

                <Box mt={ 5 }>
                  <MintSong />
                </Box>

                <Box mt={ 5 }>
                  <HorizontalLine />
                </Box>

                <Box mt={ 5 }>
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
              </Stack>
            </Form>
          ) }
        </Formik>
      </Box>
    </Container>
  );
};

export default UploadSong;
