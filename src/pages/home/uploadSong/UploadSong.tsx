import { Box, Container } from "@mui/material";
import { WizardForm } from "components";
import { Typography } from "elements";
import { selectSession } from "modules/session";
import {
  UploadSongFormValues,
  generateArtistAgreement,
  uploadSong,
} from "modules/song";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import ConfirmUpload from "./ConfirmUpload";
import SongDetails from "./SongDetails";

const UploadSong: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector(selectSession);

  const initialValues: UploadSongFormValues = {
    image: undefined,
    audio: undefined,
    title: "",
    genre: "",
    description: "",
    isMinting: false,
    largestUtxo: undefined,
    owners: [],
    hasViewedAgreement: false,
    isCreator: false,
    agreesToContract: false,
  };

  const handleSongDetails = (values: UploadSongFormValues) => {
    if (values.isMinting) {
      const songName = values.title;
      // TODO: reference company name when exists in profile
      const companyName = "";
      const artistName = `${profile.firstName} ${profile.lastName}`;
      const stageName = profile.nickname;

      dispatch(
        generateArtistAgreement({
          songName,
          companyName,
          artistName,
          stageName,
        })
      );
    } else {
      handleSubmit(values);
    }
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
    isCreator: Yup.bool().required("This field is required"),
    agreesToContract: Yup.bool().required("This field is required"),
  };

  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginX: [null, null, 3],
        marginBottom: 4,
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
              onSubmitStep: handleSongDetails,
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
              validationSchema: Yup.object().shape({
                agreesToContract: validations.agreesToContract,
                isCreator: validations.isCreator,
              }),
            },
          ] }
        />
      </Box>
    </Container>
  );
};

export default UploadSong;
