import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Box, Container } from "@mui/material";
import { FormikHelpers, FormikValues } from "formik";
import { commonYupValidation, useExtractProperty } from "common";
import { WizardForm } from "components";
import { Typography } from "elements";
import { useGetGenresQuery, useGetLanguagesQuery } from "modules/content";
import { emptyProfile, useGetProfileQuery } from "modules/session";
import {
  CollaborationStatus,
  UploadSongRequest,
  useGenerateArtistAgreementThunk,
  useGetEarliestReleaseDateQuery,
  useUploadSongThunk,
} from "modules/song";
import ConfirmAgreement from "./ConfirmAgreement";
import BasicSongDetails from "./BasicSongDetails";
import AdvancedSongDetails from "./AdvancedSongDetails";

const UploadSong: FunctionComponent = () => {
  const navigate = useNavigate();

  const { data: genres = [] } = useGetGenresQuery();
  const {
    data: {
      companyName = "",
      firstName = "",
      lastName = "",
      nickname: stageName = "",
      email,
      role,
    } = emptyProfile,
  } = useGetProfileQuery();
  const { data: languages = [] } = useGetLanguagesQuery();
  const languageCodes = useExtractProperty(languages, "language_code");
  const { data: { date: earliestReleaseDate } = {} } =
    useGetEarliestReleaseDateQuery(undefined, {
      // endpoint throws error if user hasn't added first name
      skip: !firstName,
    });

  const [uploadSong] = useUploadSongThunk();
  const [generateArtistAgreement] = useGenerateArtistAgreementThunk();

  const artistName = `${firstName} ${lastName}`;

  const initialValues: UploadSongRequest = {
    coverArtUrl: "",
    audio: undefined,
    title: "",
    genres: [],
    moods: [],
    description: "",
    compositionCopyrightYear: undefined,
    compositionCopyrightOwner: undefined,
    phonographicCopyrightYear: undefined,
    phonographicCopyrightOwner: undefined,
    isrc: undefined,
    releaseDate: undefined,
    isExplicit: false,
    isMinting: false,
    owners: [
      {
        email,
        isCreator: true,
        isRightsOwner: true,
        percentage: 100,
        role,
        status: CollaborationStatus.Editing,
      },
    ],
    creditors: [
      {
        email,
        role,
        isCredited: true,
        status: CollaborationStatus.Editing,
      },
    ],
    featured: [],
    consentsToContract: false,
    companyName,
    artistName,
    stageName,
    barcodeNumber: undefined,
    barcodeType: undefined,
    publicationDate: undefined,
  };

  // Navigate to advanced details if minting, otherwise upload song
  const handleSongInfo = async (
    values: UploadSongRequest,
    helpers: FormikHelpers<FormikValues>
  ) => {
    if (values.isMinting) {
      helpers.setSubmitting(false);
      navigate("advanced-details");
    } else {
      await handleSubmit(values, helpers);
    }
  };

  // Prepare Artist Agreement for confirmation page
  const handleAdvancedDetails = async (
    values: UploadSongRequest,
    helpers: FormikHelpers<FormikValues>
  ) => {
    await generateArtistAgreement({
      songName: values.title,
      companyName,
      artistName,
      stageName,
    });

    helpers.setSubmitting(false);
  };

  const handleSubmit = async (
    values: UploadSongRequest,
    helpers: FormikHelpers<FormikValues>
  ) => {
    await uploadSong(values);
    helpers.setSubmitting(false);
  };

  /**
   * Ensure user is returned to first step on refresh since form
   * contents are not persisted.
   *
   * TODO: remove this when form values are persisted on refresh
   */
  useEffect(() => {
    navigate("/home/upload-song", { replace: true });
    // useNavigate doesn't return memoized function, including it
    // as dependency will run this when navigation occurs. Exclude
    // to only run on mount.
    // eslint-disable-next-line
  }, []);
  const genreOptions = useExtractProperty(genres, "name");

  const validations = {
    coverArtUrl: commonYupValidation.coverArtUrl,
    audio: commonYupValidation.audio,
    title: commonYupValidation.title,
    description: commonYupValidation.description,
    genres: commonYupValidation.genres(genreOptions),
    moods: commonYupValidation.moods,
    owners: commonYupValidation.owners,
    consentsToContract: commonYupValidation.consentsToContract,
    isrc: commonYupValidation.isrc(languageCodes),
    barcodeType: commonYupValidation.barcodeType,
    barcodeNumber: commonYupValidation.barcodeNumber,
    publicationDate: commonYupValidation.publicationDate,
    releaseDate: commonYupValidation.releaseDate(earliestReleaseDate),
    copyrightYear: commonYupValidation.year.required("This field is required"),
    copyrightOwner: commonYupValidation.copyright,
    userIpi: commonYupValidation.userIpi,
    iswc: commonYupValidation.iswc,
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
          initialValues={ initialValues }
          onSubmit={ handleSubmit }
          rootPath="home/upload-song"
          isProgressStepperVisible={ true }
          enableReinitialize={ true }
          routes={ [
            {
              element: <BasicSongDetails />,
              path: "",
              progressStepTitle: "Basic details",
              onSubmitStep: handleSongInfo,
              navigateOnSubmitStep: false,
              validationSchema: Yup.object().shape({
                coverArtUrl: validations.coverArtUrl,
                audio: validations.audio,
                title: validations.title,
                genres: validations.genres,
                moods: validations.moods,
                owners: validations.owners,
                description: validations.description,
              }),
            },
            {
              element: <AdvancedSongDetails />,
              onSubmitStep: handleAdvancedDetails,
              path: "advanced-details",
              progressStepTitle: "Advanced details",
              validationSchema: Yup.object({
                isrc: validations.isrc,
                barcodeType: validations.barcodeType,
                barcodeNumber: validations.barcodeNumber,
                compositionCopyrightYear: validations.copyrightYear,
                compositionCopyrightOwner: validations.copyrightOwner,
                phonographicCopyrightYear: validations.copyrightYear,
                phonographicCopyrightOwner: validations.copyrightOwner,
                publicationDate: validations.publicationDate,
                releaseDate: validations.releaseDate,
                userIpi: validations.userIpi,
                iswc: validations.iswc,
              }),
            },
            {
              element: <ConfirmAgreement />,
              path: "confirm",
              progressStepTitle: "Distribute & Mint",
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
