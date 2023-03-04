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
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ConfirmAgreement from "./ConfirmAgreement";
import SongInfo from "./SongInfo";

const UploadSong: FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useSelector(selectSession);

  const initialValues: UploadSongFormValues = {
    image: undefined,
    audio: undefined,
    title: "",
    genre: "",
    mood: "",
    description: "",
    isExplicit: false,
    isMinting: false,
    owners: [],
    creditors: [],
    consentsToContract: false,
  };

  const handleSongInfo = (values: UploadSongFormValues) => {
    if (values.isMinting) {
      const songName = values.title;
      // TODO: reference company name when exists in profile
      const companyName = "ACME";
      const artistName = `${profile.firstName} ${profile.lastName}`;
      const stageName = profile.nickname;

      dispatch(
        generateArtistAgreement({
          body: {
            songName,
            companyName,
            artistName,
            stageName,
          },
          callback: () => navigate("confirm"),
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
    owners: Yup.array().when("isMinting", {
      is: (value: boolean) => !!value,
      then: Yup.array()
        .min(1, "At least one owner is required when minting")
        .test({
          message: "100% ownership must be distributed",
          test: (owners) => {
            if (!owners) return false;

            const percentageSum = owners.reduce((sum, owner) => {
              return sum + owner.percentage;
            }, 0);

            return percentageSum === 100;
          },
        }),
    }),
    consentsToContract: Yup.bool().required("This field is required"),
  };

  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginX: [null, null, 3],
        marginBottom: 8,
        overflow: "auto",
        textAlign: ["center", "center", "initial"],
      } }
    >
      <Typography variant="h3" fontWeight={ 800 }>
        UPLOAD A SONG
      </Typography>

      <Box pt={ 5 } pb={ 7 }>
        <WizardForm
          validateOnBlur={ false }
          initialValues={ initialValues }
          onSubmit={ handleSubmit }
          rootPath="home/upload-song"
          validateOnMount={ true }
          routes={ [
            {
              element: <SongInfo />,
              path: "",
              navigateOnSubmitStep: false,
              onSubmitStep: handleSongInfo,
              validationSchema: Yup.object().shape({
                image: validations.image,
                audio: validations.audio,
                title: validations.title,
                genre: validations.genre,
                owners: validations.owners,
              }),
            },
            {
              element: <ConfirmAgreement />,
              path: "confirm",
              validationSchema: Yup.object().shape({
                consentsToContract: validations.consentsToContract,
              }),
            },
          ] }
        />
      </Box>
    </Container>
  );
};

export default UploadSong;
