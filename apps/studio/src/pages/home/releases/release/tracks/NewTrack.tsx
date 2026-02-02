import type { FunctionComponent } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate, useParams } from "react-router-dom";

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

/**
 * * Shared page for creating a new track and viewing track details.
 */
const NewTrack: FunctionComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { releaseId } = useParams<"releaseId">();

  const windowWidth = useWindowDimensions()?.width;

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
    <>
      <Stack alignItems="center" direction="row" gap={ 2.5 }>
        <Button
          color="white"
          variant="outlined"
          width="icon"
          onClick={ () => navigate(-1) }
        >
          <ArrowBackIcon />
        </Button>

        <Typography variant="h3">ADD NEW TRACK</Typography>
      </Stack>

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
            <Form noValidate>
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
                      onClick={ () => navigate(-1) }
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Form>
          ) }
        </Formik>
      </Box>
    </>
  );
};

export default NewTrack;
