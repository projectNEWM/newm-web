import { Box, Container } from "@mui/material";
import { WizardForm } from "components";
import { Typography } from "elements";
import { emptyProfile, useGetProfileQuery } from "modules/session";
import {
  UploadSongRequest,
  useGenerateArtistAgreementThunk,
  useUploadSongThunk,
} from "modules/song";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ConfirmAgreement from "./ConfirmAgreement";
import SongInfo from "./SongInfo";

const UploadSong: FunctionComponent = () => {
  const navigate = useNavigate();

  const { data: profile = emptyProfile } = useGetProfileQuery();
  const [uploadSong, isLoading] = useUploadSongThunk();
  const [generateArtistAgreement] = useGenerateArtistAgreementThunk();

  console.log("IS LOADING: ", isLoading);

  const initialValues: UploadSongRequest = {
    image: undefined,
    audio: undefined,
    title: "",
    genres: [],
    moods: [],
    description: "",
    isExplicit: false,
    isMinting: false,
    owners: [],
    creditors: [],
    consentsToContract: false,
  };

  const handleSongInfo = (values: UploadSongRequest) => {
    if (values.isMinting) {
      const songName = values.title;
      // TODO: reference company name when exists in profile
      const companyName = "ACME";
      const artistName = `${profile.firstName} ${profile.lastName}`;
      const stageName = profile.nickname;

      generateArtistAgreement({
        body: {
          songName,
          companyName,
          artistName,
          stageName,
        },
        callback: () => navigate("confirm"),
      });
    } else {
      handleSubmit(values);
    }
  };

  // eslint-disable-next-line
  const handleSubmit = (values: any) => {
    uploadSong(values);
  };

  const validations = {
    image: Yup.mixed().required("This field is required"),
    audio: Yup.mixed().required("This field is required"),
    title: Yup.string().required("This field is required"),
    genres: Yup.array().min(1, "This field is required"),
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
                genres: validations.genres,
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
