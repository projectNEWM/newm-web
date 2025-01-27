import { Box, Container, Typography } from "@mui/material";
import { WizardForm } from "@newm-web/elements";
import { FormikHelpers, FormikValues } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PageNotFound } from "@newm-web/components";
import AdvancedSongDetails from "./AdvancedSongDetails";
import BasicSongDetails from "./BasicSongDetails";
import ConfirmAgreement from "./ConfirmAgreement";
import { commonYupValidation } from "../../../common";
import {
  useGetGenresQuery,
  useGetISRCCountryCodesQuery,
  useGetRolesQuery,
} from "../../../modules/content";
import { emptyProfile, useGetProfileQuery } from "../../../modules/session";
import {
  CollaborationStatus,
  UploadSongThunkRequest,
  useGenerateArtistAgreementThunk,
  useGetEarliestReleaseDateQuery,
  useUploadSongThunk,
} from "../../../modules/song";

export interface UploadSongFormValues extends UploadSongThunkRequest {
  agreesToCoverArtGuidelines?: boolean;
}

const UploadSong: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isValidPath, setIsValidPath] = useState(true);

  const { data: genres = [] } = useGetGenresQuery();
  const { data: roles = [] } = useGetRolesQuery();
  const {
    data: {
      companyName = "",
      email,
      firstName = "",
      ipi: userIpi,
      lastName = "",
      nickname: stageName = "",
      role,
    } = emptyProfile,
  } = useGetProfileQuery();
  const { data: languageCodes = [] } = useGetISRCCountryCodesQuery();
  const { data: { date: earliestReleaseDate } = {} } =
    useGetEarliestReleaseDateQuery(undefined, {
      // endpoint throws error if user hasn't added first name
      skip: !firstName,
    });

  const [uploadSong] = useUploadSongThunk();
  const [generateArtistAgreement] = useGenerateArtistAgreementThunk();

  const artistName = `${firstName} ${lastName}`;

  const initialValues: UploadSongFormValues = {
    agreesToCoverArtGuidelines: false,
    artistName,
    audio: undefined,
    barcodeNumber: undefined,
    barcodeType: undefined,
    companyName,
    compositionCopyrightOwner: undefined,
    compositionCopyrightYear: undefined,
    consentsToContract: false,
    coverArtUrl: "",
    creditors: [
      {
        email,
        isCredited: true,
        role,
        status: CollaborationStatus.Editing,
      },
    ],
    description: "",
    featured: [],
    genres: [],
    ipi: userIpi,
    isCoverRemixSample: false,
    isExplicit: false,
    isInstrumental: false,
    isMinting: false,
    isrc: undefined,
    moods: [],
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
    phonographicCopyrightOwner: undefined,
    phonographicCopyrightYear: undefined,
    publicationDate: undefined,
    releaseDate: undefined,
    stageName,
    title: "",
  };

  // Navigate to advanced details if minting, otherwise upload song
  const handleSongInfo = async (
    values: UploadSongThunkRequest,
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
    values: UploadSongThunkRequest,
    helpers: FormikHelpers<FormikValues>
  ) => {
    await generateArtistAgreement({
      artistName,
      companyName,
      songName: values.title,
      stageName,
    });

    helpers.setSubmitting(false);
  };

  const handleSubmit = async (
    values: UploadSongThunkRequest,
    helpers: FormikHelpers<FormikValues>
  ) => {
    await uploadSong(values);
    helpers.setSubmitting(false);
  };

  /**
   * Ensure user is returned to first step on refresh since form
   * contents are not persisted. If user navigates to an invalid
   * path, redirect to 404 page.
   *
   * TODO: remove the navigation when form values are persisted on refresh
   */
  useEffect(() => {
    const validPaths = [
      "/home/upload-song",
      "/home/upload-song/advanced-details",
      "/home/upload-song/confirm",
    ];

    // Remove trailing slashes to compare paths
    const normalizePath = (path: string) => path.replace(/\/+$/, "");
    const currentPath = normalizePath(location.pathname);

    if (!validPaths.includes(currentPath)) {
      setIsValidPath(false);
    } else {
      setIsValidPath(true);
      navigate("/home/upload-song", { replace: true });
    }
    // useNavigate doesn't return memoized function, including it
    // as dependency will run this when navigation occurs. Exclude
    // to only run on mount.
    // eslint-disable-next-line
  }, []);

  if (!isValidPath) {
    return <PageNotFound />;
  }

  const validations = {
    agreesToCoverArtGuidelines: commonYupValidation.agreesToCoverArtGuidelines,
    audio: commonYupValidation.audio,
    barcodeNumber: commonYupValidation.barcodeNumber,
    barcodeType: commonYupValidation.barcodeType,
    consentsToContract: commonYupValidation.consentsToContract,
    copyrightOwner: commonYupValidation.copyright,
    copyrightYear: commonYupValidation.year,
    coverArtUrl: commonYupValidation.coverArtUrl,
    creditors: commonYupValidation.creditors(roles),
    description: commonYupValidation.description,
    genres: commonYupValidation.genres(genres),
    ipi: commonYupValidation.ipi,
    isrc: commonYupValidation.isrc(languageCodes),
    iswc: commonYupValidation.iswc,
    moods: commonYupValidation.moods,
    owners: commonYupValidation.owners,
    publicationDate: commonYupValidation.publicationDate,
    releaseDate: commonYupValidation.releaseDate(earliestReleaseDate),
    title: commonYupValidation.title,
  };

  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginBottom: 8,
        marginX: [null, null, 3],
        overflow: "auto",
        textAlign: ["center", "center", "initial"],
      } }
    >
      <Typography fontWeight={ 800 } variant="h3">
        UPLOAD A SONG
      </Typography>

      <Box pb={ 7 } pt={ 5 }>
        <WizardForm
          enableReinitialize={ true }
          initialValues={ initialValues }
          isProgressStepperVisible={ true }
          rootPath="home/upload-song"
          routes={ [
            {
              element: <BasicSongDetails />,
              navigateOnSubmitStep: false,
              onSubmitStep: handleSongInfo,
              path: "",
              progressStepTitle: "Basic details",
              validationSchema: Yup.object().shape({
                agreesToCoverArtGuidelines:
                  validations.agreesToCoverArtGuidelines,
                audio: validations.audio,
                coverArtUrl: validations.coverArtUrl,
                creditors: validations.creditors,
                description: validations.description,
                genres: validations.genres,
                moods: validations.moods,
                owners: validations.owners,
                title: validations.title,
              }),
            },
            {
              element: <AdvancedSongDetails />,
              onSubmitStep: handleAdvancedDetails,
              path: "advanced-details",
              progressStepTitle: "Advanced details",
              validationSchema: Yup.object({
                barcodeNumber: validations.barcodeNumber,
                barcodeType: validations.barcodeType,
                compositionCopyrightOwner: validations.copyrightOwner,
                compositionCopyrightYear: validations.copyrightYear,
                ipi: validations.ipi,
                isrc: validations.isrc,
                iswc: validations.iswc,
                phonographicCopyrightOwner: validations.copyrightOwner,
                phonographicCopyrightYear: validations.copyrightYear,
                publicationDate: validations.publicationDate,
                releaseDate: validations.releaseDate,
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
          onSubmit={ handleSubmit }
        />
      </Box>
    </Container>
  );
};

export default UploadSong;
