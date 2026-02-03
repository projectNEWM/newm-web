import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";

import { useFlags } from "launchdarkly-react-client-sdk";

import { Form, Formik, FormikHelpers, useFormikContext } from "formik";

import * as Yup from "yup";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Button, HorizontalLine, Tooltip } from "@newm-web/elements";
import { useWindowDimensions } from "@newm-web/utils";
import { MintingStatus, PaymentType } from "@newm-web/types";

import AdvancedTrackDetails from "./AdvancedTrackDetails";
import BasicTrackDetails from "./BasicTrackDetails";
import DeleteSongModal from "../../DeleteSongModal";
import ReleaseDeletionHelp from "../../ReleaseDeletionHelp";
import { commonYupValidation, isSongEditable } from "../../../../../common";
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
  PatchSongThunkRequest,
  emptySong,
  getIsSongDeletable,
  useDeleteSongThunk,
  useGetCollaborationsQuery,
  useGetEarliestReleaseDateQuery,
  useGetSongQuery,
  useHasSongAccess,
  usePatchSongThunk,
} from "../../../../../modules/song";
import { setToastMessage } from "../../../../../modules/ui";
import {
  type RequestNavigationOptions,
  useUnsavedChanges,
} from "../../../../../contexts/UnsavedChangesContext";

interface EditTrackFormValues extends PatchSongThunkRequest {
  agreesToCoverArtGuidelines?: boolean;
}

const EDIT_TRACK_UNSAVED_MODAL_OPTIONS: RequestNavigationOptions = {
  message:
    "You haven't saved your changes to the track. If you exit now, your track metadata won't be saved.",
  title: "Wait! Don't lose your progress.",
};

/**
 * * Syncs Formik dirty state to unsaved changes context and sets edit-track modal copy.
 */
const EditTrackUnsavedSync: FunctionComponent = () => {
  const { dirty } = useFormikContext<EditTrackFormValues>();
  const { setHasUnsavedChanges, setUnsavedModalContent } = useUnsavedChanges();

  useEffect(() => {
    setHasUnsavedChanges(dirty);
    if (dirty) {
      setUnsavedModalContent(EDIT_TRACK_UNSAVED_MODAL_OPTIONS);
    } else {
      setUnsavedModalContent(null);
    }
    return () => {
      setHasUnsavedChanges(false);
      setUnsavedModalContent(null);
    };
  }, [dirty, setHasUnsavedChanges, setUnsavedModalContent]);

  return null;
};

const EditTrack: FunctionComponent = () => {
  const { webStudioDisableTrackDistributionAndMinting } = useFlags();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { releaseId, trackId } = useParams<"releaseId" | "trackId">() as {
    releaseId?: string;
    trackId?: string;
  };
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
    songIds: trackId ?? "",
  });
  const { data: { date: earliestReleaseDate } = {} } =
    useGetEarliestReleaseDateQuery();

  const [patchSong] = usePatchSongThunk();

  const hasAccess = useHasSongAccess(trackId ?? "");
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
  } = useGetSongQuery(trackId as string, { skip: !trackId });

  const isSongDeletable = getIsSongDeletable(mintingStatus);

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

  const initialValues: EditTrackFormValues = {
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
    id: trackId ?? "",
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
    navigate("/home/releases");

    dispatch(
      setToastMessage({
        message: "Error fetching song data",
        severity: "error",
      })
    );
  }

  const handleSubmit = async (
    values: EditTrackFormValues,
    helpers: FormikHelpers<EditTrackFormValues>
  ) => {
    await patchSong({
      ...values,
      mintingStatus,
      shouldRedirect: values.isMinting,
    });

    helpers.setSubmitting(false);

    if (releaseId) {
      navigate(`/home/releases/${releaseId}`);
    } else {
      navigate("/home/releases");
    }
  };

  /**
   * Ensure user is returned to first step on refresh since form
   * contents are not persisted.
   *
   * TODO: remove this when form values are persisted on refresh
   */
  useEffect(() => {
    if (releaseId && trackId) {
      navigate(`/home/releases/${releaseId}/track/${trackId}`, {
        replace: true,
      });
    }
    // useNavigate doesn't return memoized function, including it
    // as dependency will run this when navigation occurs. Exclude
    // to only run on mount.
    // eslint-disable-next-line
  }, []);

  const validations = {
    agreesToCoverArtGuidelines: commonYupValidation.agreesToCoverArtGuidelines,
    barcodeNumber: commonYupValidation.barcodeNumber,
    barcodeType: commonYupValidation.barcodeType,
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
    <Box pb={ 7 } pt={ 5 }>
      <Formik
        enableReinitialize={ true }
        initialValues={ initialValues }
        validationSchema={ Yup.object().shape({
          agreesToCoverArtGuidelines: validations.agreesToCoverArtGuidelines,
          barcodeNumber: validations.barcodeNumber,
          barcodeType: validations.barcodeType,
          compositionCopyrightOwner: validations.copyrightOwner,
          compositionCopyrightYear: validations.copyrightYear,
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
          <EditTrackFormContent
            deleteSong={ deleteSong }
            isDeclined={ isDeclined }
            isDeleteModalActive={ isDeleteModalActive }
            isDirtyRef={ isDirtyRef }
            isSongDeletable={ isSongDeletable }
            isSubmitting={ isSubmitting }
            navigate={ navigate }
            setIsDeleteModalActive={ setIsDeleteModalActive }
            title={ title }
            trackId={ trackId }
          />
        ) }
      </Formik>
    </Box>
  );
};

interface EditTrackFormContentProps {
  readonly deleteSong: (args: { archived: boolean; songId: string }) => void;
  readonly isDeclined: boolean;
  readonly isDeleteModalActive: boolean;
  readonly isDirtyRef: React.MutableRefObject<boolean>;
  readonly isSongDeletable: boolean;
  readonly isSubmitting: boolean;
  readonly navigate: ReturnType<typeof useNavigate>;
  readonly setIsDeleteModalActive: (value: boolean) => void;
  readonly title: string | undefined;
  readonly trackId: string | undefined;
}

const EditTrackFormContent: FunctionComponent<EditTrackFormContentProps> = ({
  deleteSong,
  isDeclined,
  isDeleteModalActive,
  isDirtyRef,
  isSongDeletable,
  isSubmitting,
  navigate,
  setIsDeleteModalActive,
  title,
  trackId,
}) => {
  const theme = useTheme();
  const windowWidth = useWindowDimensions()?.width;
  const { dirty } = useFormikContext<EditTrackFormValues>();
  const { requestNavigation } = useUnsavedChanges();

  isDirtyRef.current = dirty;

  return (
    <>
      <Stack alignItems="center" direction="row" gap={ 2.5 } mb={ 5 }>
        <Button
          color="white"
          variant="outlined"
          width="icon"
          onClick={ () => {
            if (dirty) {
              isDirtyRef.current = false;
              requestNavigation(null);
            } else {
              navigate(-1);
            }
          } }
        >
          <ArrowBackIcon sx={ { color: "white" } } />
        </Button>

        { title && <Typography variant="h3">{ title.toUpperCase() }</Typography> }

        <>
          <Tooltip
            disableFocusListener={ isSongDeletable }
            disableHoverListener={ isSongDeletable }
            disableTouchListener={ isSongDeletable }
            title={ isSongDeletable ? "" : <ReleaseDeletionHelp /> }
          >
            <Stack ml="auto">
              <Button
                color="white"
                disabled={ !isSongDeletable }
                sx={ { marginLeft: "auto" } }
                variant="outlined"
                width="icon"
                onClick={ () => setIsDeleteModalActive(true) }
              >
                <DeleteIcon fontSize="small" sx={ { color: "white" } } />
              </Button>
            </Stack>
          </Tooltip>

          { isDeleteModalActive && (
            <DeleteSongModal
              primaryAction={ () => {
                deleteSong({
                  archived: true,
                  songId: trackId ?? "",
                });
              } }
              secondaryAction={ () => setIsDeleteModalActive(false) }
            />
          ) }
        </>
      </Stack>

      <Form noValidate>
        <EditTrackUnsavedSync />
        <Stack
          spacing={ 6 }
          sx={ {
            alignItems: ["center", "center", "unset"],
          } }
        >
          <Stack spacing={ 2 }>
            <Typography variant="h4">BASIC DETAILS</Typography>
            <BasicTrackDetails
              isDeclined={ isDeclined }
              isInEditMode={ true }
              trackId={ trackId }
            />
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
                Save
              </Button>

              <Button
                variant="outlined"
                width="compact"
                onClick={ () => {
                  if (dirty) {
                    isDirtyRef.current = false;
                    requestNavigation(null);
                  } else {
                    navigate(-1);
                  }
                } }
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

export default EditTrack;
