import { Box, Container, Typography } from "@mui/material";
import { WizardForm } from "@newm-web/elements";
import { FormikHelpers, FormikValues } from "formik";
import { FunctionComponent, useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { removeTrailingSlash } from "@newm-web/utils";
import AdvancedSongDetails from "./AdvancedSongDetails";
import BasicSongDetails from "./BasicSongDetails";
import ConfirmAgreement from "./ConfirmAgreement";
import NotFoundPage from "../../NotFoundPage";
import { commonYupValidation } from "../../../common";
import {
  useGetGenresQuery,
  useGetISRCCountryCodesQuery,
  useGetRolesQuery,
} from "../../../modules/content";
import { emptyProfile, useGetProfileQuery } from "../../../modules/session";
import {
  CollaborationStatus,
  PaymentType,
  UploadSongThunkRequest,
  useGenerateArtistAgreementThunk,
  useGetEarliestReleaseDateQuery,
  useUploadSongThunk,
} from "../../../modules/song";

const rootPath = "home/upload-song";

export interface UploadSongFormValues extends UploadSongThunkRequest {
  agreesToCoverArtGuidelines?: boolean;
}

const UploadSong: FunctionComponent = () => {
  const navigate = useNavigate();
  const currentPathLocation = useLocation();

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
    paymentType: PaymentType.ADA,
    phonographicCopyrightOwner: undefined,
    phonographicCopyrightYear: undefined,
    publicationDate: undefined,
    releaseDate: undefined,
    stageName,
    title: "",
  };

  const handleSubmit = useCallback(
    async (
      values: UploadSongThunkRequest,
      helpers: FormikHelpers<FormikValues>
    ) => {
      await uploadSong(values);
      helpers.setSubmitting(false);
    },
    [uploadSong]
  );

  // Navigate to advanced details if minting, otherwise upload song
  const handleSongInfo = useCallback(
    async (
      values: UploadSongThunkRequest,
      helpers: FormikHelpers<FormikValues>
    ) => {
      if (values.isMinting) {
        helpers.setSubmitting(false);
        navigate("advanced-details");
      } else {
        await handleSubmit(values, helpers);
      }
    },
    [navigate, handleSubmit]
  );

  // Prepare Artist Agreement for confirmation page
  const handleAdvancedDetails = useCallback(
    async (
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
    },
    [generateArtistAgreement, artistName, companyName, stageName]
  );

  const wizardRoutes = useMemo(
    () => [
      {
        element: <BasicSongDetails />,
        navigateOnSubmitStep: false,
        onSubmitStep: handleSongInfo,
        path: "",
        progressStepTitle: "Basic details",
        validationSchema: Yup.object().shape({
          agreesToCoverArtGuidelines:
            commonYupValidation.agreesToCoverArtGuidelines,
          audio: commonYupValidation.audio,
          coverArtUrl: commonYupValidation.coverArtUrl,
          creditors: commonYupValidation.creditors(roles),
          description: commonYupValidation.description,
          genres: commonYupValidation.genres(genres),
          moods: commonYupValidation.moods,
          owners: commonYupValidation.owners,
          title: commonYupValidation.title,
        }),
      },
      {
        element: <AdvancedSongDetails />,
        onSubmitStep: handleAdvancedDetails,
        path: "advanced-details",
        progressStepTitle: "Advanced details",
        validationSchema: Yup.object({
          barcodeNumber: commonYupValidation.barcodeNumber,
          barcodeType: commonYupValidation.barcodeType,
          compositionCopyrightOwner: commonYupValidation.copyright,
          compositionCopyrightYear: commonYupValidation.year,
          ipi: commonYupValidation.ipi,
          isrc: commonYupValidation.isrc(languageCodes),
          iswc: commonYupValidation.iswc,
          phonographicCopyrightOwner: commonYupValidation.copyright,
          phonographicCopyrightYear: commonYupValidation.year,
          publicationDate: commonYupValidation.publicationDate,
          releaseDate: commonYupValidation.releaseDate(earliestReleaseDate),
        }),
      },
      {
        element: <ConfirmAgreement />,
        path: "confirm",
        progressStepTitle: "Distribute & Mint",
        validationSchema: Yup.object().shape({
          consentsToContract: commonYupValidation.consentsToContract,
        }),
      },
    ],
    [
      handleSongInfo,
      roles,
      genres,
      handleAdvancedDetails,
      languageCodes,
      earliestReleaseDate,
    ]
  );

  /**
   * Check if the current path is a valid path, if not, show a 404 page.
   */
  const currentPathName = removeTrailingSlash(currentPathLocation.pathname);
  const validPaths = useMemo(
    () =>
      wizardRoutes.map((route) =>
        removeTrailingSlash(`/${rootPath}/${route.path}`)
      ),
    [wizardRoutes]
  );
  const isValidPath = validPaths.includes(currentPathName);

  /**
   * Ensure user is returned to first step on refresh since form
   * contents are not persisted.
   *
   * TODO: remove the navigation when form values are persisted on refresh
   */
  useEffect(() => {
    if (isValidPath) {
      navigate("/home/upload-song", { replace: true });
    }
    // useNavigate doesn't return memoized function, including it
    // as dependency will run this when navigation occurs. Exclude
    // to only run on mount.
    // eslint-disable-next-line
  }, []);

  if (!isValidPath) {
    return <NotFoundPage redirectUrl="/home/upload-song" />;
  }

  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginBottom: 8,
        marginTop: 10.5,
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
          rootPath={ rootPath }
          routes={ wizardRoutes }
          onSubmit={ handleSubmit }
        />
      </Box>
    </Container>
  );
};

export default UploadSong;
