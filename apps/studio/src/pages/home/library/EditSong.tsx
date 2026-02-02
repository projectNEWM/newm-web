import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Link, Stack, Tooltip, Typography } from "@mui/material";
import { Button, ProfileImage, WizardForm } from "@newm-web/elements";
import { FormikHelpers, FormikValues } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { resizeCloudinaryImage } from "@newm-web/utils";
import { MintingStatus, PaymentType } from "@newm-web/types";
import { useFlags } from "launchdarkly-react-client-sdk";
import DeleteSongModal from "./DeleteSongModal";
import { SongRouteParams } from "../../../common/types";
import {
  NEWM_SUPPORT_EMAIL,
  commonYupValidation,
  isSongEditable,
} from "../../../common";
import {
  useGetGenresQuery,
  useGetISRCCountryCodesQuery,
  useGetRolesQuery,
} from "../../../modules/content";
import { emptyProfile, useGetProfileQuery } from "../../../modules/session";
import {
  CollaborationStatus,
  PatchSongThunkRequest,
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

interface EditSongFormValues extends PatchSongThunkRequest {
  agreesToCoverArtGuidelines?: boolean;
}

const EditSong: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { songId } = useParams<"songId">() as SongRouteParams;

  const { webStudioDisableTrackDistributionAndMinting } = useFlags();

  const { data: genres = [] } = useGetGenresQuery();
  const { data: roles = [] } = useGetRolesQuery();
  const {
    data: {
      companyName = "",
      dspPlanSubscribed: isArtistPricePlanSelected = false,
      email,
      firstName = "",
      lastName = "",
      nickname: stageName = "",
      role,
    } = emptyProfile,
  } = useGetProfileQuery();
  const { data: languageCodes = [] } = useGetISRCCountryCodesQuery();

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
      instrumental,
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

  const isDeclined = mintingStatus === MintingStatus.Declined;

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

  const initialValues: EditSongFormValues = {
    agreesToCoverArtGuidelines: true,
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
              isCredited: true,
              role,
              status: CollaborationStatus.Editing,
            },
          ],
    description,
    featured,
    genres: songGenres,
    id: songId,
    ipi: ipis?.join(", "),
    isExplicit: parentalAdvisory === "Explicit",
    isInstrumental: instrumental,
    isMinting:
      isArtistPricePlanSelected &&
      isSongEditable(mintingStatus) &&
      !webStudioDisableTrackDistributionAndMinting,
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
    paymentType: PaymentType.NEWM,
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
  if (!isLoading && !isSongEditable(mintingStatus)) {
    navigate(`/home/library/view-details/${songId}`, { replace: true });
  }

  const handleSubmit = async (
    step: "basic-details" | "advanced-details" | "confirm",
    values: EditSongFormValues,
    helpers: FormikHelpers<FormikValues>
  ) => {
    const patchValues = {
      ...values,
      isMinting: false,
      mintingStatus,
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
    agreesToCoverArtGuidelines: commonYupValidation.agreesToCoverArtGuidelines,
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
    releaseDate: commonYupValidation.releaseDate(
      earliestReleaseDate,
      isDeclined
    ),
    title: commonYupValidation.title,
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
          <ArrowBackIcon sx={ { color: "white" } } />
        </Button>
        <ProfileImage
          alt="Song cover art"
          height="90px"
          src={ resizeCloudinaryImage(coverArtUrl, { height: 180, width: 180 }) }
          width="90px"
        />
        { title && <Typography variant="h3">{ title.toUpperCase() }</Typography> }

        <>
          <Tooltip
            title={
              <span>
                To delete a song for which minting and distribution is in
                process or has completed, please send a deletion request email
                to{ " " }
                <Link href={ `mailto:${NEWM_SUPPORT_EMAIL}` }>
                  { NEWM_SUPPORT_EMAIL }
                </Link>
                . Please note that artists not holding 100% of Stream Tokens for
                a given track are unable to cease minting and distribution.
              </span>
            }
          >
            <Stack ml="auto">
              <Button
                color="white"
                disabled={ !getIsSongDeletable(mintingStatus) }
                sx={ { marginLeft: "auto" } }
                variant="outlined"
                width="icon"
                onClick={ () => {
                  setIsDeleteModalActive(true);
                } }
              >
                <DeleteIcon fontSize="small" sx={ { color: "white" } } />
              </Button>
            </Stack>
          </Tooltip>

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
      <Box pb={ 7 } pt={ 5 }>
        <WizardForm
          enableReinitialize={ true }
          initialValues={ initialValues }
          isProgressStepperVisible={ true }
          rootPath={ `home/library/edit-song/${songId}` }
          routes={ [
            {
              element: <BasicSongDetails isInEditMode={ true } />,
              navigateOnSubmitStep: false,
              onSubmitStep: (values, helpers) =>
                handleSubmit("basic-details", values, helpers),
              path: "",
              progressStepTitle: "Basic details",
              validationSchema: Yup.object().shape({
                agreesToCoverArtGuidelines:
                  validations.agreesToCoverArtGuidelines,
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
              element: (
                <ConfirmAgreement shouldShowOrderSummary={ !isDeclined } />
              ),
              path: "confirm",
              progressStepTitle: "Distribute",
              validationSchema: Yup.object().shape({
                consentsToContract: validations.consentsToContract,
              }),
            },
          ] }
          validateOnMount={ true }
          onSubmit={ (values, helpers) =>
            handleSubmit("confirm", values, helpers)
          }
        />
      </Box>
    </>
  );
};

export default EditSong;
