import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import { Box, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router";
import { Button } from "elements";
import { ProfileImage, WizardForm } from "components";
import { emptyProfile, useGetProfileQuery } from "modules/session";
import {
  PatchSongRequest,
  emptySong,
  getIsSongDeletable,
  useDeleteSongThunk,
  useGenerateArtistAgreementThunk,
  useGetCollaborationsQuery,
  useGetEarliestReleaseDateQuery,
  useGetSongQuery,
  useHasSongAccess,
  usePatchSongThunk,
} from "modules/song";
import { setToastMessage } from "modules/ui";
import {
  Genre,
  Language,
  useGetGenresQuery,
  useGetLanguagesQuery,
} from "modules/content";
import {
  NONE_OPTION,
  REGEX_ISRC_FORMAT,
  commonYupValidation,
  extractProperty,
  getBarcodeRegex,
} from "common";
import AdvancedSongDetails from "pages/home/uploadSong/AdvancedSongDetails";
import BasicSongDetails from "pages/home/uploadSong/BasicSongDetails";
import ConfirmAgreement from "pages/home/uploadSong/ConfirmAgreement";
import DeleteSongModal from "./DeleteSongModal";

interface RouteParams {
  readonly songId: string;
}

const EditSong: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { songId } = useParams<"songId">() as RouteParams;

  const { data: genres = [] } = useGetGenresQuery();
  const {
    data: {
      companyName = "",
      firstName = "",
      lastName = "",
      nickname: stageName = "",
    } = emptyProfile,
  } = useGetProfileQuery();
  const { data: languages = [] } = useGetLanguagesQuery();
  const languageCodes = extractProperty<Language, "language_code">(
    languages,
    "language_code"
  );
  const { data: collaborations = [] } = useGetCollaborationsQuery({
    songIds: songId,
  });
  const { data: { date: earliestReleaseDate } = {} } =
    useGetEarliestReleaseDateQuery();

  const [patchSong] = usePatchSongThunk();

  const hasAccess = useHasSongAccess(songId);
  const artistName = `${firstName} ${lastName}`;

  const [deleteSong] = useDeleteSongThunk();
  const [generateArtistAgreement] = useGenerateArtistAgreementThunk();

  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const {
    data: {
      title,
      genres: songGenres,
      moods,
      coverArtUrl,
      description,
      language,
      parentalAdvisory,
      mintingStatus,
    } = emptySong,
    error,
  } = useGetSongQuery(songId);

  const owners = collaborations
    .filter(
      (collaboration) =>
        collaboration.royaltyRate && collaboration.royaltyRate > 0
    )
    .map((collaboration) => ({
      email: collaboration.email,
      isRightsOwner: collaboration.royaltyRate
        ? collaboration.royaltyRate > 0
        : false,
      percentage: collaboration.royaltyRate || 0,
      role: collaboration.role,
      status: collaboration.status,
      isCreator: "isCreator" in collaboration && !!collaboration.isCreator,
    }));

  const creditors = collaborations
    .filter((collaboration) => collaboration.credited)
    .map((collaboration) => ({
      email: collaboration.email,
      role: collaboration.role,
      isCredited: collaboration.credited,
      status: collaboration.status,
    }));

  const featured = collaborations
    .filter((collaboration) => collaboration.featured)
    .map((collaboration) => ({
      email: collaboration.email,
      role: collaboration.role,
      isFeatured: collaboration.featured,
      status: collaboration.status,
    }));

  const initialValues: PatchSongRequest = {
    id: songId,
    coverArtUrl,
    audio: undefined,
    title,
    genres: songGenres,
    moods,
    description,
    copyrights: undefined,
    isrc: undefined,
    releaseDate: undefined,
    isExplicit: parentalAdvisory === "Explicit",
    isMinting: false,
    language,
    owners,
    creditors,
    featured,
    consentsToContract: false,
    companyName,
    artistName,
    stageName,
    barcodeNumber: undefined,
    barcodeType: undefined,
    publicationDate: undefined,
  };

  // TODO: show "Not found" content if not available for user
  if (error || !hasAccess) {
    navigate("/home/library");

    dispatch(
      setToastMessage({
        message: "Error fetching song data",
        severity: "error",
      })
    );
  }

  const handleSubmit = async (
    values: PatchSongRequest,
    helpers: FormikHelpers<FormikValues>
  ) => {
    await patchSong(values);
    helpers.setSubmitting(false);
  };

  // Navigate to advanced details if minting, otherwise upload song
  const handleSongInfo = async (
    values: PatchSongRequest,
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
    values: PatchSongRequest,
    helpers: FormikHelpers<FormikValues>
  ) => {
    if (values.title) {
      await generateArtistAgreement({
        songName: values.title,
        companyName,
        artistName,
        stageName,
      });

      helpers.setSubmitting(false);
    }
  };

  /**
   * Ensure user is returned to first step on refresh since form
   * contents are not persisted.
   *
   * TODO: remove this when form values are persisted on refresh
   */
  useEffect(() => {
    navigate(`/home/library/edit-song/${songId}`, { replace: true });
    // useNavigate doesn't return memoized function, including it
    // as dependency will run this when navigation occurs. Exclude
    // to only run on mount.
    // eslint-disable-next-line
  }, []);

  const genreOptions = extractProperty<Genre, "name">(genres, "name");

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
    <>
      <Stack direction="row" alignItems="center" gap={ 2.5 }>
        <Button
          color="white"
          onClick={ () => navigate(-1) }
          variant="outlined"
          width="icon"
        >
          <ArrowBackIcon sx={ { color: "white" } } />
        </Button>
        <ProfileImage
          alt="Song cover art"
          height="90px"
          src={ coverArtUrl }
          width="90px"
        />
        { title && <Typography variant="h3">{ title.toUpperCase() }</Typography> }

        <>
          <Button
            color="white"
            variant="outlined"
            width="icon"
            disabled={ !getIsSongDeletable(mintingStatus) }
            sx={ { marginLeft: "auto" } }
            onClick={ () => {
              setIsDeleteModalActive(true);
            } }
          >
            <DeleteIcon fontSize="small" sx={ { color: "white" } } />
          </Button>

          { isDeleteModalActive && (
            <DeleteSongModal
              primaryAction={ () => {
                deleteSong({ songId });
              } }
              secondaryAction={ () => {
                setIsDeleteModalActive(false);
              } }
            />
          ) }
        </>
      </Stack>
      <Box pt={ 5 } pb={ 7 }>
        <WizardForm
          initialValues={ initialValues }
          onSubmit={ handleSubmit }
          rootPath={ `home/library/edit-song/${songId}` }
          isProgressStepperVisible={ true }
          validateOnMount={ true }
          enableReinitialize={ true }
          routes={ [
            {
              element: <BasicSongDetails isInEditMode={ true } />,
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
    </>
  );
};

export default EditSong;
