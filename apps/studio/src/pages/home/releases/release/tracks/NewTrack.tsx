import {
  type FunctionComponent,
  type MutableRefObject,
  useEffect,
  useRef,
} from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Form, Formik, FormikHelpers, useFormikContext } from "formik";

import * as Yup from "yup";

import { Box, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";

import { Button, HorizontalLine } from "@newm-web/elements";
import { useWindowDimensions } from "@newm-web/utils";
import { PaymentType } from "@newm-web/types";

import AdvancedTrackDetails from "./AdvancedTrackDetails";
import BasicTrackDetails from "./BasicTrackDetails";
import { TrackFormValues } from "./trackFormTypes";
import {
  type RequestNavigationOptions,
  useUnsavedChanges,
} from "../../../../../contexts/UnsavedChangesContext";
import { commonYupValidation } from "../../../../../common";
import {
  useGetGenresQuery,
  useGetISRCCountryCodesQuery,
  useGetRolesQuery,
} from "../../../../../modules/content";
import {
  emptyProfile,
  useGetProfileQuery,
} from "../../../../../modules/session";
import {
  CollaborationStatus,
  useGenerateArtistAgreementThunk,
  useGetEarliestReleaseDateQuery,
  useUploadSongThunk,
} from "../../../../../modules/song";

const NEW_TRACK_UNSAVED_MODAL_OPTIONS: RequestNavigationOptions = {
  message:
    "You haven't added the track to your release. If you exit now, your track metadata won't be saved.",
  title: "Wait! Don't lose your progress.",
};

/**
 * Syncs Formik dirty state to unsaved changes context and sets track-specific modal copy.
 */
const NewTrackUnsavedSync: FunctionComponent = () => {
  const { dirty } = useFormikContext<TrackFormValues>();
  const { setHasUnsavedChanges, setUnsavedModalContent } = useUnsavedChanges();

  useEffect(() => {
    setHasUnsavedChanges(dirty);
    if (dirty) {
      setUnsavedModalContent(NEW_TRACK_UNSAVED_MODAL_OPTIONS);
    } else {
      setUnsavedModalContent(null);
    }
  }, [dirty, setHasUnsavedChanges, setUnsavedModalContent]);

  // * Reset context only on unmount; setters from context are stable.
  useEffect(() => {
    return () => {
      setHasUnsavedChanges(false);
      setUnsavedModalContent(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

/**
 * * Shared page for creating a new track and viewing track details.
 */
const NewTrack: FunctionComponent = () => {
  const navigate = useNavigate();
  const { releaseId } = useParams<"releaseId">();
  const isDirtyRef = useRef(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirtyRef.current) {
        event.preventDefault();
        // * Deprecated per spec but still required by most browsers to show the dialog.
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

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

  // TODO: Fetch track details.

  const initialValues: TrackFormValues = {
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
    paymentType: PaymentType.NEWM,
    phonographicCopyrightOwner: undefined,
    phonographicCopyrightYear: undefined,
    publicationDate: undefined,
    releaseDate: undefined,
    stageName,
    title: "",
  };

  const validations = {
    agreesToCoverArtGuidelines: commonYupValidation.agreesToCoverArtGuidelines,
    barcodeNumber: commonYupValidation.barcodeNumber,
    barcodeType: commonYupValidation.barcodeType,
    compositionCopyrightOwner: commonYupValidation.copyright,
    compositionCopyrightYear: commonYupValidation.year,
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

  const handleSubmit = async (
    values: TrackFormValues,
    helpers: FormikHelpers<TrackFormValues>
  ) => {
    await generateArtistAgreement({
      artistName,
      companyName,
      songName: values.title,
      stageName,
    });
    await uploadSong(values);
    helpers.setSubmitting(false);

    if (releaseId) {
      navigate(`/home/releases/${releaseId}`);
    } else {
      navigate("/home/releases");
    }
  };

  return (
    <Box pb={ 7 } pt={ 5 }>
      <Formik
        enableReinitialize={ true }
        initialValues={ initialValues }
        validationSchema={ Yup.object().shape({
          agreesToCoverArtGuidelines: validations.agreesToCoverArtGuidelines,
          barcodeNumber: validations.barcodeNumber,
          barcodeType: validations.barcodeType,
          compositionCopyrightOwner: validations.compositionCopyrightOwner,
          compositionCopyrightYear: validations.compositionCopyrightYear,
          coverArtUrl: validations.coverArtUrl,
          creditors: validations.creditors,
          description: validations.description,
          genres: validations.genres,
          ipi: validations.ipi,
          isrc: validations.isrc,
          iswc: validations.iswc,
          moods: validations.moods,
          owners: validations.owners,
          publicationDate: validations.publicationDate,
          releaseDate: validations.releaseDate,
          title: validations.title,
        }) }
        onSubmit={ handleSubmit }
      >
        { ({ isSubmitting }) => (
          <NewTrackFormContent
            isDirtyRef={ isDirtyRef }
            isSubmitting={ isSubmitting }
            navigate={ navigate }
          />
        ) }
      </Formik>
    </Box>
  );
};

interface NewTrackFormContentProps {
  readonly isDirtyRef: MutableRefObject<boolean>;
  readonly isSubmitting: boolean;
  readonly navigate: ReturnType<typeof useNavigate>;
}

const NewTrackFormContent: FunctionComponent<NewTrackFormContentProps> = ({
  isDirtyRef,
  isSubmitting,
  navigate,
}) => {
  const theme = useTheme();
  const windowWidth = useWindowDimensions()?.width;
  const { dirty } = useFormikContext<TrackFormValues>();
  const { requestNavigation } = useUnsavedChanges();

  isDirtyRef.current = dirty;

  return (
    <>
      <Stack alignItems="center" direction="row" gap={ 2.5 } mb={ 5 }>
        <Button
          color="white"
          variant="outlined"
          width="icon"
          onClick={ () => (dirty ? requestNavigation(null) : navigate(-1)) }
        >
          <ArrowBackIcon />
        </Button>

        <Typography variant="h3">ADD NEW TRACK</Typography>
      </Stack>

      <Form noValidate>
        <NewTrackUnsavedSync />
        <Stack
          spacing={ 6 }
          sx={ {
            alignItems: ["center", "center", "unset"],
          } }
        >
          <Stack spacing={ 2 }>
            <Typography variant="h4">BASIC DETAILS</Typography>
            <BasicTrackDetails />
          </Stack>

          <Stack spacing={ 2 }>
            <Typography variant="h4">ADVANCED DETAILS</Typography>
            <AdvancedTrackDetails />
          </Stack>

          <Box>
            <HorizontalLine mb={ 5 } />
            <Stack direction="row" gap={ 2 }>
              <Button
                isLoading={ isSubmitting }
                type="submit"
                width={
                  windowWidth && windowWidth > theme.breakpoints.values.md
                    ? "compact"
                    : "default"
                }
              >
                Add Track
              </Button>

              <Button
                variant="outlined"
                width="compact"
                onClick={ () => (dirty ? requestNavigation(null) : navigate(-1)) }
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Form>
    </>
  );
};

export default NewTrack;
