import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Stack, Typography } from "@mui/material";
import { Button, ProfileImage, WizardForm } from "@newm-web/elements";
import { useExtractProperty } from "@newm-web/utils";
import { FormikHelpers, FormikValues } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { commonYupValidation } from "../../../common";
import {
  useGetGenresQuery,
  useGetLanguagesQuery,
  useGetRolesQuery,
} from "../../../modules/content";
import { emptyProfile, useGetProfileQuery } from "../../../modules/session";
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
} from "../../../modules/song";
import { setToastMessage } from "../../../modules/ui";
import AdvancedSongDetails from "../../../pages/home/uploadSong/AdvancedSongDetails";
import BasicSongDetails from "../../../pages/home/uploadSong/BasicSongDetails";
import ConfirmAgreement from "../../../pages/home/uploadSong/ConfirmAgreement";
import DeleteSongModal from "./DeleteSongModal";
import { SongRouteParams } from "./types";

const EditSong: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { songId } = useParams<"songId">() as SongRouteParams;

  const { data: genres = [] } = useGetGenresQuery();
  const { data: roles = [] } = useGetRolesQuery();
  const {
    data: {
      companyName = "",
      email,
      firstName = "",
      lastName = "",
      nickname: stageName = "",
      role,
    } = emptyProfile,
  } = useGetProfileQuery();
  const { data: languages = [] } = useGetLanguagesQuery();
  const languageCodes = useExtractProperty(languages, "language_code", false);

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
      barcodeNumber,
      barcodeType,
      compositionCopyrightOwner,
      compositionCopyrightYear,
      coverArtUrl,
      description,
      genres: songGenres,
      ipis,
      isrc,
      iswc,
      language,
      mintingStatus,
      moods,
      parentalAdvisory,
      phonographicCopyrightOwner,
      phonographicCopyrightYear,
      publicationDate,
      releaseDate,
      title,
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
      isCreator: "isCreator" in collaboration && !!collaboration.isCreator,
      isRightsOwner: collaboration.royaltyRate
        ? collaboration.royaltyRate > 0
        : false,
      percentage:
        collaboration.royaltyRate !== undefined
          ? +collaboration.royaltyRate
          : 0,

      role: collaboration.role,
      status: collaboration.status,
    }));

  const creditors = collaborations
    .filter((collaboration) => collaboration.credited)
    .map((collaboration) => ({
      email: collaboration.email,
      isCredited: collaboration.credited,
      role: collaboration.role,
      status: collaboration.status,
    }));

  const featured = collaborations
    .filter((collaboration) => collaboration.featured)
    .map((collaboration) => ({
      email: collaboration.email,
      isFeatured: collaboration.featured,
      role: collaboration.role,
      status: collaboration.status,
    }));

  const initialValues: PatchSongRequest = {
    artistName,
    barcodeNumber,
    barcodeType,
    companyName,
    compositionCopyrightOwner,
    compositionCopyrightYear,
    consentsToContract: false,
    coverArtUrl,
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
    description,
    featured,
    genres: songGenres,
    id: songId,
    ipi: ipis?.join(", "),
    isExplicit: parentalAdvisory === "Explicit",
    isMinting: false,
    isrc,
    iswc,
    language,
    moods,
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
    phonographicCopyrightOwner,
    phonographicCopyrightYear,
    publicationDate,
    releaseDate,
    stageName,
    title,
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

  const validations = {
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
    <>
      <Stack direction="row" alignItems="center" gap={2.5}>
        <Button
          color="white"
          onClick={() => navigate(-1)}
          variant="outlined"
          width="icon"
        >
          <ArrowBackIcon sx={{ color: "white" }} />
        </Button>
        <ProfileImage
          alt="Song cover art"
          height="90px"
          src={coverArtUrl}
          width="90px"
        />
        {title && <Typography variant="h3">{title.toUpperCase()}</Typography>}

        <>
          <Button
            color="white"
            disabled={!getIsSongDeletable(mintingStatus)}
            onClick={() => {
              setIsDeleteModalActive(true);
            }}
            sx={{ marginLeft: "auto" }}
            variant="outlined"
            width="icon"
          >
            <DeleteIcon fontSize="small" sx={{ color: "white" }} />
          </Button>

          {isDeleteModalActive && (
            <DeleteSongModal
              primaryAction={() => {
                deleteSong({ songId });
              }}
              secondaryAction={() => {
                setIsDeleteModalActive(false);
              }}
            />
          )}
        </>
      </Stack>
      <Box pt={5} pb={7}>
        <WizardForm
          initialValues={initialValues}
          onSubmit={(values, helpers) =>
            handleSubmit("confirm", values, helpers)
          }
          enableReinitialize={true}
          isProgressStepperVisible={true}
          rootPath={`home/library/edit-song/${songId}`}
          validateOnMount={true}
          routes={[
            {
              element: <BasicSongDetails isInEditMode={true} />,
              path: "",
              progressStepTitle: "Basic details",
              navigateOnSubmitStep: false,
              onSubmitStep: (values, helpers) =>
                handleSubmit("basic-details", values, helpers),
              validationSchema: Yup.object().shape({
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
              onSubmitStep: (values, helpers) =>
                handleSubmit("advanced-details", values, helpers),
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
          ]}
        />
      </Box>
    </>
  );
};

export default EditSong;
