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
  CollaborationStatus,
  MintingStatus,
  PatchSongRequest,
  emptySong,
  getIsSongDeletable,
  useDeleteSongThunk,
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
import { commonYupValidation, extractProperty } from "common";
import AdvancedSongDetails from "pages/home/uploadSong/AdvancedSongDetails";
import BasicSongDetails from "pages/home/uploadSong/BasicSongDetails";
import ConfirmAgreement from "pages/home/uploadSong/ConfirmAgreement";
import DeleteSongModal from "./DeleteSongModal";
import { SongRouteParams } from "./types";

const EditSong: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { songId } = useParams<"songId">() as SongRouteParams;

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
  const languageCodes = extractProperty<Language, "language_code">(
    languages,
    "language_code"
  );
  const { data: collaborations = [] } = useGetCollaborationsQuery({
    songIds: songId,
  });
  const { data: { date: earliestReleaseDate } = {} } =
    useGetEarliestReleaseDateQuery();

  const [patchSong, { isLoading: isPatchSongLoading }] = usePatchSongThunk();

  const hasAccess = useHasSongAccess(songId);
  const artistName = `${firstName} ${lastName}`;

  const [deleteSong] = useDeleteSongThunk();

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
      releaseDate,
      publicationDate,
      compositionCopyrightYear,
      compositionCopyrightOwner,
      phonographicCopyrightYear,
      phonographicCopyrightOwner,
      barcodeNumber,
      barcodeType,
      isrc,
      iswc,
      ipis,
    } = emptySong,
    error,
    isLoading: isGetSongLoading,
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
      percentage:
        collaboration.royaltyRate !== undefined
          ? +collaboration.royaltyRate
          : 0,
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
    title,
    genres: songGenres,
    moods,
    description,
    compositionCopyrightYear,
    compositionCopyrightOwner,
    phonographicCopyrightYear,
    phonographicCopyrightOwner,
    isrc,
    releaseDate,
    isExplicit: parentalAdvisory === "Explicit",
    isMinting: false,
    language,
    owners:
      owners.length > 0
        ? owners
        : [
            {
              email,
              isCreator: true,
              isRightsOwner: true,
              percentage: 100,
              role,
              status: CollaborationStatus.Editing,
            },
          ],
    creditors:
      creditors.length > 0
        ? creditors
        : [
            {
              email,
              role,
              isCredited: true,
              status: CollaborationStatus.Editing,
            },
          ],
    featured,
    consentsToContract: false,
    companyName,
    artistName,
    stageName,
    barcodeNumber,
    barcodeType,
    publicationDate,
    iswc,
    userIpi: ipis?.join(", "),
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

  const isLoading = isPatchSongLoading || isGetSongLoading;

  /**
   * Redirect if user manually navigates
   * to edit page after minting process started.
   */
  if (!isLoading && mintingStatus !== MintingStatus.Undistributed) {
    navigate(`/home/library/view-details/${songId}`, { replace: true });
  }

  const handleSubmit = async (
    step: "basic-details" | "advanced-details" | "confirm",
    values: PatchSongRequest,
    helpers: FormikHelpers<FormikValues>
  ) => {
    const patchValues = {
      ...values,
      isMinting: false,
      shouldRedirect: false,
    };

    if (step === "basic-details") {
      patchValues.shouldRedirect = !values.isMinting;
    } else if (step === "advanced-details") {
      patchValues.isMinting = true;
    } else if (step === "confirm") {
      patchValues.isMinting = true;
      patchValues.shouldRedirect = true;
    }

    await patchSong(patchValues);

    helpers.setSubmitting(false);

    if (step === "basic-details" && values.isMinting) {
      navigate("advanced-details");
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
    copyrightYear: commonYupValidation.year,
    copyrightOwner: commonYupValidation.copyright,
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
          onSubmit={ (values, helpers) =>
            handleSubmit("confirm", values, helpers)
          }
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
              onSubmitStep: (values, helpers) =>
                handleSubmit("basic-details", values, helpers),
              validationSchema: Yup.object().shape({
                coverArtUrl: validations.coverArtUrl,
                title: validations.title,
                genres: validations.genres,
                moods: validations.moods,
                owners: validations.owners,
                description: validations.description,
              }),
            },
            {
              element: <AdvancedSongDetails />,
              onSubmitStep: (values, helpers) =>
                handleSubmit("advanced-details", values, helpers),
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
    </>
  );
};

export default EditSong;
