import {
  type FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Form, Formik, useFormikContext } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import { AddOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import {
  Button,
  DashedOutline,
  DropdownSelectField,
  HorizontalLine,
  Link,
  TextInputField,
  Tooltip,
  UploadImageField,
} from "@newm-web/elements";
import { scrollToError } from "@newm-web/utils";

import { useUnsavedChanges } from "../../../../contexts/UnsavedChangesContext";
import { NONE_OPTION, commonYupValidation } from "../../../../common";
import { emptyProfile, useGetProfileQuery } from "../../../../modules/session";
import ReleaseDeletionHelp from "../ReleaseDeletionHelp";

const RELEASE_CODE_TYPE_OPTIONS = [NONE_OPTION, "EAN", "UPC", "JAN"] as const;

const REQUIRED_FIELDS = {
  coverArtUrl: true,
  releaseDate: true,
  releaseTitle: true,
} as const;

export interface ReleaseFormValues {
  artistName: string;
  coverArtUrl: File | undefined;
  originalReleaseDate: string;
  releaseCodeNumber: string;
  releaseCodeType: string;
  releaseDate: string;
  releaseTitle: string;
}

interface ReleaseDetailsFormContentProps {
  readonly addTrackPath: string;
  readonly coverArtUrlRef: React.RefObject<HTMLDivElement | null>;
  readonly isDirtyRef: React.MutableRefObject<boolean>;
  readonly releaseDateRef: React.RefObject<HTMLInputElement | null>;
  readonly releaseId: string | undefined;
  readonly releaseTitleRef: React.RefObject<HTMLInputElement | null>;
  readonly requestNavigation: (path: string | null) => void;
  readonly setHasUnsavedChanges: (value: boolean) => void;
}

/**
 * @internal
 * Props are typed via ReleaseDetailsFormContentProps; no prop-types needed.
 */
/* eslint-disable react/prop-types */
const ReleaseDetailsFormContent: FunctionComponent<ReleaseDetailsFormContentProps> =
  memo(
    ({
      addTrackPath,
      coverArtUrlRef,
      isDirtyRef,
      releaseDateRef,
      releaseId,
      releaseTitleRef,
      requestNavigation,
      setHasUnsavedChanges,
    }) => {
      const navigate = useNavigate();
      const theme = useTheme();
      const { dirty, errors, isSubmitting, setTouched, validateForm, values } =
        useFormikContext<ReleaseFormValues>();

      useEffect(() => {
        setHasUnsavedChanges(dirty);
      }, [dirty, setHasUnsavedChanges]);

      useEffect(() => {
        scrollToError(errors, isSubmitting, [
          { element: coverArtUrlRef.current, error: errors.coverArtUrl },
          { element: releaseDateRef.current, error: errors.releaseDate },
          {
            element: releaseTitleRef.current,
            error: errors.releaseTitle,
          },
        ]);
      }, [
        errors,
        isSubmitting,
        coverArtUrlRef,
        releaseDateRef,
        releaseTitleRef,
      ]);

      const handleProceedOrSave = useCallback(
        (action: "proceed" | "save") => {
          validateForm()
            .then((formErrors) => {
              const hasErrors = Object.keys(formErrors).length > 0;
              if (hasErrors) {
                setTouched(REQUIRED_FIELDS);
                return;
              }

              if (action === "save") {
                // TODO: Add save logic here...........................................
                navigate("/home/releases/");
              } else {
                // TODO: Add proceed logic here...........................................
                navigate(
                  releaseId
                    ? `/home/releases/${releaseId}/distribute`
                    : "/home/releases/"
                );
              }
            })
            .catch(() => {
              setTouched(REQUIRED_FIELDS);
            });
        },
        [navigate, releaseId, setTouched, validateForm]
      );

      const handleBackClick = useCallback(() => {
        if (dirty) {
          requestNavigation(null);
        } else {
          navigate(-1);
        }
      }, [dirty, navigate, requestNavigation]);

      const handleAddTrackClick = useCallback(
        (event: React.MouseEvent) => {
          if (dirty) {
            event.preventDefault();
            requestNavigation(addTrackPath);
          }
        },
        [addTrackPath, dirty, requestNavigation]
      );

      isDirtyRef.current = dirty;

      return (
        <>
          <Stack alignItems="center" direction="row" gap={ 2.5 } mb={ 2 }>
            <Button
              color="white"
              variant="outlined"
              width="icon"
              onClick={ handleBackClick }
            >
              <ArrowBackIcon />
            </Button>

            <Typography variant="h3">
              { releaseId ? "RELEASE DETAILS" : "CREATE NEW RELEASE" }
            </Typography>

            { releaseId && (
              <Tooltip title={ <ReleaseDeletionHelp /> }>
                <Stack ml="auto">
                  <Button
                    color="white"
                    disabled={ true }
                    sx={ { marginLeft: "auto" } }
                    variant="outlined"
                    width="icon"
                  >
                    <DeleteIcon fontSize="small" sx={ { color: "white" } } />
                  </Button>
                </Stack>
              </Tooltip>
            ) }
          </Stack>

          <Form noValidate>
            <Box
              pb={ 7 }
              pt={ 3 }
              sx={ {
                alignItems: { md: "stretch", xs: "center" },
                display: "flex",
                flexDirection: ["column", "column", "row"],
                gap: [8, 2, 2],
                justifyContent: { md: "flex-start", xs: "center" },
                maxWidth: "970px",
              } }
            >
              <Box
                sx={ {
                  alignItems: { md: "stretch", xs: "center" },
                  display: ["flex", "flex", "unset"],
                  flex: 1,
                  justifyContent: { md: "flex-start", xs: "center" },
                  minWidth: 368,
                  order: { md: 0, xs: 0 },
                } }
              >
                <Stack gap={ 1 }>
                  <Typography variant="h4">COVER ART</Typography>
                  <Box ref={ coverArtUrlRef }>
                    <UploadImageField
                      emptyMessage="Drag and drop or browse to add your file"
                      minDimensions={ { height: 1400, width: 1400 } }
                      minFileSizeMB={ 0.1 }
                      name="coverArtUrl"
                      rootSx={ {
                        alignSelf: "center",
                        height: "330px",
                        mb: 2.5,
                        width: "100%",
                      } }
                      hasPreviewOption
                      isAspectRatioOneToOne
                    />
                  </Box>

                  <Stack
                    gap={ 2 }
                    sx={ {
                      maxWidth: theme.inputField.maxWidth,
                    } }
                  >
                    <TextInputField
                      isOptional={ false }
                      label="RELEASE DATE"
                      name="releaseDate"
                      placeholder="Select date"
                      ref={ releaseDateRef as React.Ref<HTMLInputElement> }
                      tooltipText="TO BE UPDATED"
                      type="date"
                    />
                    <TextInputField
                      isOptional={ true }
                      label="ORIGINAL RELEASE DATE"
                      max={ new Date().toISOString().split("T")[0] }
                      name="originalReleaseDate"
                      placeholder="Select date"
                      tooltipText="TO BE UPDATED"
                      type="date"
                    />
                    <DropdownSelectField
                      isOptional={ true }
                      label="RELEASE CODE TYPE"
                      name="releaseCodeType"
                      options={ [...RELEASE_CODE_TYPE_OPTIONS] }
                      placeholder="Select one"
                      tooltipText="TO BE UPDATED"
                    />
                    <TextInputField
                      disabled={
                        values.releaseCodeType === NONE_OPTION ||
                        !values.releaseCodeType
                      }
                      isOptional={ true }
                      label="RELEASE CODE NUMBER"
                      name="releaseCodeNumber"
                      placeholder="000000000000"
                      tooltipText="TO BE UPDATED"
                    />
                  </Stack>

                  <Box
                    sx={ {
                      display: "flex",
                      flex: 1,
                      gap: 1.5,
                      justifyContent: { md: "flex-start", xs: "center" },
                      mb: 1,
                      minWidth: 0,
                      mt: 2,
                    } }
                  >
                    <Button
                      type="button"
                      variant="primary"
                      width="compact"
                      onClick={ () => handleProceedOrSave("proceed") }
                    >
                      Proceed
                    </Button>

                    <Button
                      type="button"
                      variant="outlined"
                      width="compact"
                      onClick={ () => handleProceedOrSave("save") }
                    >
                      Save
                    </Button>
                  </Box>
                </Stack>
              </Box>

              <Box
                sx={ {
                  display: { md: "flex", xs: "contents" },
                  flex: "0 0 auto",
                  flexDirection: "column",
                  minWidth: 0,
                } }
              >
                <Box sx={ { order: { md: 0, xs: -1 }, paddingBottom: 3 } }>
                  <Stack
                    gap={ 2 }
                    sx={ {
                      flexDirection: ["column", "column", "row"],
                    } }
                  >
                    <TextInputField
                      isOptional={ false }
                      label="RELEASE TITLE"
                      name="releaseTitle"
                      placeholder="Give your release a title"
                      ref={ releaseTitleRef as React.Ref<HTMLInputElement> }
                    />

                    <TextInputField
                      disabled={ true }
                      isOptional={ false }
                      label="ARTIST NAME"
                      name="artistName"
                      startAdornment={
                        <LockIcon
                          sx={ {
                            color: theme.colors.white,
                            height: "auto",
                            marginLeft: 1,
                            marginRight: 1,
                            width: 22,
                          } }
                        />
                      }
                    />
                  </Stack>
                </Box>

                <Box sx={ { order: { md: 0, xs: 0 }, width: "100%" } }>
                  <HorizontalLine />

                  <Typography pt={ 2.5 } variant="h4">
                    TRACKS
                  </Typography>

                  <Box sx={ { padding: 2 } }>Track list (placeholder)</Box>

                  <Box
                    sx={ {
                      display: "flex",
                      flexDirection: ["column", "column", "row"],
                      gap: 2,
                      paddingBottom: 2.5,
                    } }
                  >
                    <Box width="100%">
                      <Link
                        aria-label="Add new track"
                        sx={ { textDecoration: "none" } }
                        to={ addTrackPath }
                        onClick={ handleAddTrackClick }
                      >
                        <DashedOutline
                          sx={ {
                            alignItems: "center",
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            padding: 3.5,
                          } }
                        >
                          <AddOutlined sx={ { marginRight: 0.5 } } /> Add new
                          track
                        </DashedOutline>
                      </Link>
                    </Box>
                  </Box>

                  <HorizontalLine />
                </Box>
              </Box>
            </Box>
          </Form>
        </>
      );
    }
  );

ReleaseDetailsFormContent.displayName = "ReleaseDetailsFormContent";

/**
 * * Shared page for creating a new release and viewing release details.
 */
const ReleaseDetails: FunctionComponent = () => {
  const { releaseId } = useParams<"releaseId">();
  const { requestNavigation, setHasUnsavedChanges } = useUnsavedChanges();

  const coverArtUrlRef = useRef<HTMLDivElement>(null);
  const isDirtyRef = useRef(false);
  const releaseDateRef = useRef<HTMLInputElement>(null);
  const releaseTitleRef = useRef<HTMLInputElement>(null);

  const { data: { firstName = "", lastName = "" } = emptyProfile } =
    useGetProfileQuery();

  const artistName = `${firstName} ${lastName}`.trim() || "Artist";

  const initialValues = useMemo<ReleaseFormValues>(
    () => ({
      artistName,
      coverArtUrl: undefined,
      originalReleaseDate: "",
      releaseCodeNumber: "",
      releaseCodeType: "",
      releaseDate: "",
      releaseTitle: "",
    }),
    [artistName]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        coverArtUrl: commonYupValidation.coverArtUrl,
        originalReleaseDate: commonYupValidation.publicationDate
          .nullable()
          .transform((v, o) => (o === "" ? undefined : v)),
        releaseCodeNumber: Yup.string(),
        releaseCodeType: Yup.string(),
        releaseDate: commonYupValidation.releaseReleaseDate,
        releaseTitle: commonYupValidation.title,
      }),
    []
  );

  const addTrackPath =
    releaseId === undefined
      ? "/home/releases/new/track/new"
      : `/home/releases/${releaseId}/track/new`;

  useEffect(() => {
    return () => setHasUnsavedChanges(false);
  }, [setHasUnsavedChanges]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirtyRef.current) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <Formik
      enableReinitialize={ true }
      initialValues={ initialValues }
      validationSchema={ validationSchema }
      onSubmit={ () => {
        /* // * Stub; requests handled at 'handleProceedOrSave' */
      } }
    >
      <ReleaseDetailsFormContent
        addTrackPath={ addTrackPath }
        coverArtUrlRef={ coverArtUrlRef }
        isDirtyRef={ isDirtyRef }
        releaseDateRef={ releaseDateRef }
        releaseId={ releaseId }
        releaseTitleRef={ releaseTitleRef }
        requestNavigation={ requestNavigation }
        setHasUnsavedChanges={ setHasUnsavedChanges }
      />
    </Formik>
  );
};

export default ReleaseDetails;
