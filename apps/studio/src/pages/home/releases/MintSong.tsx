import {
  AlertTitle,
  Box,
  Button as MUIButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Alert,
  Button,
  ErrorMessage,
  HorizontalLine,
  SwitchInputField,
} from "@newm-web/elements";
import theme from "@newm-web/theme";
import {
  getUpdatedValues,
  scrollToError,
  useWindowDimensions,
} from "@newm-web/utils";
import { Formik, FormikValues } from "formik";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { MintingStatus } from "@newm-web/types";
import { SongRouteParams } from "../../../common/types";
import { commonYupValidation } from "../../../common";
import SelectCoCreators from "../../../components/minting/SelectCoCreators";
import { useGetRolesQuery } from "../../../modules/content";
import { emptyProfile, useGetProfileQuery } from "../../../modules/session";
import {
  CollaborationStatus,
  Creditor,
  Featured,
  Owner,
  emptySong,
  useGetCollaborationsQuery,
  useGetSongQuery,
  usePatchSongThunk,
} from "../../../modules/song";

interface FormValues {
  readonly creditors: Array<Creditor>;
  readonly featured: Array<Featured>;
  readonly isMinting: boolean;
  readonly owners: Array<Owner>;
}

const MintSong = () => {
  const navigate = useNavigate();
  const windowWidth = useWindowDimensions()?.width;
  const { songId } = useParams<"songId">() as SongRouteParams;

  const coCreatorsRef = useRef<HTMLDivElement>(null);

  const { data: { email, role } = emptyProfile } = useGetProfileQuery();

  const { data: { mintingStatus } = emptySong } = useGetSongQuery(songId);

  const { data: collabs = [] } = useGetCollaborationsQuery({ songIds: songId });

  const { data: roles = [] } = useGetRolesQuery();

  const [patchSong, { isLoading }] = usePatchSongThunk();

  const [showWarning, setShowWarning] = useState(true);

  // get owners from collaborations array
  const owners: Array<Owner> = collabs
    .filter(({ royaltyRate }) => !!royaltyRate)
    .map((collab) => ({
      email: collab.email,
      id: collab.id,
      isCreator: collab.email === email,
      isRightsOwner: true,
      percentage: collab.royaltyRate || 0,
      role: collab.role,
      status: collab.status,
    }));

  // get credited artists from collaborations array
  const creditors: Array<Creditor> = collabs
    .filter(({ credited }) => credited)
    .map((collab) => ({
      email: collab.email,
      id: collab.id,
      isCredited: true,
      role: collab.role,
      status: collab.status,
    }));

  // get featured artists from collaborations array
  const featured: Array<Featured> = collabs
    .filter(({ featured }) => featured)
    .map((collab) => ({
      email: collab.email,
      id: collab.id,
      isFeatured: true,
      role: collab.role,
      status: collab.status,
    }));

  // set initial owner
  const initialOwners =
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
        ];

  // set initial creditors
  const initialCreditors = creditors.length
    ? creditors
    : [
        {
          email,
          isCredited: true,
          role,
          status: CollaborationStatus.Editing,
        },
      ];

  // set initial featured artists
  const initialFeatured = featured.length ? featured : [];

  // Set isMinting switch as toggled for minting in progress or completed
  const isMinting = mintingStatus !== MintingStatus.Undistributed;

  const initialValues: FormValues = {
    creditors: initialCreditors,
    featured: initialFeatured,
    isMinting,
    owners: initialOwners,
  };

  const validationSchema = Yup.object().shape({
    creditors: commonYupValidation.creditors(roles),
    owners: commonYupValidation.owners,
  });

  const handleSubmitForm = (values: FormikValues) => {
    const updatedValues = getUpdatedValues(initialValues, values);

    patchSong({ id: songId, ...updatedValues });
  };

  return (
    <Box sx={ { maxWidth: "700px" } }>
      { showWarning && (
        <Box sx={ { mt: 3 } }>
          <Alert
            action={
              <MUIButton
                aria-label="close"
                color="info"
                sx={ { textTransform: "none" } }
                variant={ "outlined" }
                onClick={ () => {
                  setShowWarning(false);
                } }
              >
                Dismiss
              </MUIButton>
            }
          >
            <AlertTitle sx={ { color: theme.colors.baseBlue, fontWeight: 600 } }>
              { "Collaborators can't be added or removed after " +
                "initiating minting." }
            </AlertTitle>
            <Typography color="baseBlue" fontWeight={ 500 } variant="subtitle1">
              { "If you need to add or remove a collaborator, please " +
                "contact support." }
            </Typography>
          </Alert>
        </Box>
      ) }

      <Formik
        enableReinitialize={ true }
        initialValues={ initialValues }
        validationSchema={ validationSchema }
        onSubmit={ handleSubmitForm }
      >
        { ({
          dirty,
          errors,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          touched,
          values,
        }) => {
          const handleChangeOwners = (values: ReadonlyArray<Owner>) => {
            setFieldValue("owners", values);
          };

          const handleChangeCreditors = (values: ReadonlyArray<Creditor>) => {
            setFieldValue("creditors", values);
          };

          const handleChangeFeatured = (values: ReadonlyArray<Featured>) => {
            setFieldValue("featured", values);
          };

          scrollToError(errors, isSubmitting, [
            { element: coCreatorsRef.current, error: errors.creditors },
            { element: coCreatorsRef.current, error: errors.owners },
          ]);

          return (
            <Stack pt={ 3 }>
              <Stack spacing={ 5 }>
                <Box>
                  <SwitchInputField
                    description={
                      "Minting a song will create an NFT that reflects " +
                      "ownership, making streaming royalties purchasable. " +
                      "Once a song is minted, it cannot be deleted."
                    }
                    disabled={ true }
                    includeBorder={ false }
                    name="isMinting"
                    title="DISTRIBUTE & MINT SONG"
                  />

                  <SelectCoCreators
                    creditors={ values.creditors }
                    featured={ values.featured }
                    isAddDeleteDisabled={ true }
                    owners={ values.owners }
                    onChangeCreditors={ handleChangeCreditors }
                    onChangeFeatured={ handleChangeFeatured }
                    onChangeOwners={ handleChangeOwners }
                  />
                </Box>

                { !!touched.owners && !!errors.owners && (
                  <Box mt={ 0.5 } ref={ coCreatorsRef }>
                    <ErrorMessage>{ errors.owners as string }</ErrorMessage>
                  </Box>
                ) }

                { !!touched.creditors && !!errors.creditors && (
                  <Box mt={ 0.5 } ref={ coCreatorsRef }>
                    <ErrorMessage>{ errors.creditors as string }</ErrorMessage>
                  </Box>
                ) }
              </Stack>

              <Box py={ 5 }>
                <HorizontalLine />
              </Box>

              <Stack columnGap={ 2 } direction="row">
                <Button
                  color="music"
                  variant="secondary"
                  width={
                    windowWidth && windowWidth > theme.breakpoints.values.md
                      ? "compact"
                      : "default"
                  }
                  onClick={ () => navigate(-1) }
                >
                  Cancel
                </Button>

                { dirty && (
                  <Button
                    isLoading={ isLoading }
                    width={
                      windowWidth && windowWidth > theme.breakpoints.values.md
                        ? "compact"
                        : "default"
                    }
                    onClick={ () => handleSubmit() }
                  >
                    Update collaborators
                  </Button>
                ) }
              </Stack>
            </Stack>
          );
        } }
      </Formik>
    </Box>
  );
};

export default MintSong;
