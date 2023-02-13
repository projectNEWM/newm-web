import { Box, Container } from "@mui/material";
import { WizardForm } from "components";
import { Typography } from "elements";
import {
  GenerateArtistAgreementBody,
  UploadSongFormValues,
  generateArtistAgreement,
  uploadSong,
} from "modules/song";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import ConfirmUpload from "./ConfirmUpload";
import SongDetails from "./SongDetails";

const UploadSong: FunctionComponent = () => {
  const dispatch = useDispatch();

  const initialValues: UploadSongFormValues = {
    image: undefined,
    audio: undefined,
    title: "",
    genre: "",
    description: "",
    isMinting: false,
    largestUtxo: undefined,
  };

  const handleNavigateToConfirmationStep = ({
    songName,
    companyName,
    artistName,
    stageName,
  }: GenerateArtistAgreementBody) => {
    dispatch(
      generateArtistAgreement({ songName, companyName, artistName, stageName })
    );
  };

  // eslint-disable-next-line
  const handleSubmit = (values: any) => {
    dispatch(uploadSong(values));
  };

  const validations = {
    image: Yup.mixed().required("This field is required"),
    audio: Yup.mixed().required("This field is required"),
    title: Yup.string().required("This field is required"),
    genre: Yup.string().required("This field is required"),
  };

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
        UPLOAD A SONG
      </Typography>

      <Box pt={ 5 }>
        <WizardForm
          validateOnBlur={ false }
          initialValues={ initialValues }
          onSubmit={ handleSubmit }
          rootPath="home/upload-song"
          validateOnMount={ true }
          routes={ [
            {
              element: <SongDetails />,
              path: "",
              navigateOnSubmitStep: false,
              onSubmitStep: handleNavigateToConfirmationStep,
              validationSchema: Yup.object().shape({
                image: validations.image,
                audio: validations.audio,
                title: validations.title,
                genre: validations.genre,
              }),
            },
            {
              element: <ConfirmUpload />,
              path: "confirm",
            },
          ] }
        />
      </Box>
    </Container>
  );
};

export default UploadSong;
