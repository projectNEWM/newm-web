import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Box, Container } from "@mui/material";
import { FormikHelpers, FormikValues } from "formik";
import {
  NONE_OPTION,
  REGEX_ISRC_FORMAT,
  commonYupValidation,
  getBarcodeRegex,
  useExtractProperty,
} from "common";
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
    copyrights: undefined,
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
    owners: Yup.array().when("isMinting", {
      is: (value: boolean) => !!value,
      then: Yup.array()
        .min(1, "At least one owner is required when minting")
        .test({
          message: "Owner percentages must be between 00.01% and 100%",
          test: (owners = []) =>
            owners.every(
              ({ percentage = 0 }) => percentage >= 0.01 && percentage <= 100
            ),
        })
        .test({
          message: "Percentages should not exceed 2 decimal places",
          test: (owners = []) =>
            owners.every(({ percentage = 0 }) =>
              /^\d+(\.\d{1,2})?$/.test(percentage.toString())
            ),
        })
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
    isrc: Yup.string()
      .matches(REGEX_ISRC_FORMAT, "This is not a valid ISRC format")
      .test("is-valid-country-code", "The country code is invalid", (value) => {
        if (!value) return true;

        const countryCode = value.substring(0, 2).toLowerCase();
        return languageCodes.includes(countryCode);
      }),
    barcodeType: Yup.string(),
    barcodeNumber: Yup.string().when("barcodeType", {
      is: (barcodeType: string) => !!barcodeType && barcodeType !== NONE_OPTION,
      then: Yup.string()
        .test("barcodeNumberTest", function (value = "") {
          const { barcodeType } = this.parent;
          const { regEx, message } = getBarcodeRegex(barcodeType);

          return regEx.test(value) ? true : this.createError({ message });
        })
        .required("Barcode number is required when barcode type is selected"),
      otherwise: Yup.string(),
    }),
    publicationDate: Yup.date().max(new Date(), "Cannot be a future date"),
    releaseDate: commonYupValidation.releaseDate(earliestReleaseDate),
    copyrights: commonYupValidation.copyrights,
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
          validateOnBlur={ false }
          routes={ [
            {
              element: <BasicSongDetails />,
              path: "",
              progressStepTitle: "Basic details",
              navigateOnSubmitStep: false,
              onSubmitStep: handleSongInfo,
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
                copyrights: validations.copyrights,
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
