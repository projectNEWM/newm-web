import { AlertTitle, Box, Button as MUIButton, Stack } from "@mui/material";
import {
  Alert,
  Button,
  ErrorMessage,
  HorizontalLine,
  SwitchInputField,
  Typography,
} from "@newm-web/elements";
import theme from "@newm-web/theme";
import {
  getUpdatedValues,
  scrollToError,
  useWindowDimensions,
} from "@newm-web/utils";
import { MintingStatus } from "@newm-web/types";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import { Formik, FormikValues } from "formik";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { SongRouteParams } from "./types";
import { commonYupValidation, useAppDispatch } from "../../../common";
import { ConfirmContract } from "../../../components";
import SelectCoCeators from "../../../components/minting/SelectCoCreators";
import { useGetRolesQuery } from "../../../modules/content";
import {
  VerificationStatus,
  emptyProfile,
  useGetProfileQuery,
} from "../../../modules/session";
import {
  CollaborationStatus,
  Creditor,
  Featured,
  Owner,
  emptySong,
  useGenerateArtistAgreementThunk,
  useGetCollaborationsQuery,
  useGetSongQuery,
  usePatchSongThunk,
} from "../../../modules/song";
import {
  setIsConnectWalletModalOpen,
  setIsIdenfyModalOpen,
} from "../../../modules/ui";

interface FormValues {
  readonly consentsToContract: boolean;
  readonly creditors: Array<Creditor>;
  readonly featured: Array<Featured>;
  readonly isMinting: boolean;
  readonly owners: Array<Owner>;
}

const MintSong = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const windowWidth = useWindowDimensions()?.width;
  const { wallet } = useConnectWallet();
  const { songId } = useParams<"songId">() as SongRouteParams;

  const coCreatorsRef = useRef<HTMLDivElement>(null);
  const consentsToContractRef = useRef<HTMLDivElement>(null);

  const {
    data: {
      companyName = "",
      email,
      firstName = "",
      lastName = "",
      nickname: stageName,
      verificationStatus,
      role,
    } = emptyProfile,
  } = useGetProfileQuery();
  const { data: { title, mintingStatus } = emptySong } =
    useGetSongQuery(songId);
  const { data: collabs = [] } = useGetCollaborationsQuery({ songIds: songId });

  const [patchSong, { isLoading: isSongLoading }] = usePatchSongThunk();
  const [generateArtistAgreement, { isLoading: isArtistAgreementLoading }] =
    useGenerateArtistAgreementThunk();

  const [stepIndex, setStepIndex] = useState<0 | 1>(0);
  const [showWarning, setShowWarning] = useState(true);

  const isLoading = isSongLoading || isArtistAgreementLoading;
  const isVerified = verificationStatus === VerificationStatus.Verified;
  const artistName = `${firstName} ${lastName}`;

  // some functionality is different if minting has already been initiated
  const isMintingInitiated = mintingStatus !== MintingStatus.Undistributed;

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

  // Set collaborator content as visible if any have been added
  const isMinting = collabs.length > 0;

  const initialValues: FormValues = {
    consentsToContract: false,
    creditors: initialCreditors,
    featured: initialFeatured,
    isMinting,
    owners: initialOwners,
  };

  const { data: roles = [] } = useGetRolesQuery();

  const validationSchema = Yup.object().shape({
    consentsToContract: Yup.bool().required("This field is required"),
    creditors: commonYupValidation.creditors(roles),
    owners: commonYupValidation.owners,
  });

  const handleSubmitStep = async (values: FormValues) => {
    const updatedValues = getUpdatedValues(initialValues, values);

    if (stepIndex === 0) {
      handleCompleteFirstStep();
    } else {
      await generateArtistAgreement({
        artistName,
        companyName,
        saved: true,
        songId,
        songName: title,
        stageName,
      });

      patchSong({ id: songId, ...updatedValues });
    }
  };

  const handleCompleteFirstStep = async () => {
    await generateArtistAgreement({
      artistName,
      companyName,
      songName: title,
      stageName,
    });

    setStepIndex(1);
  };

  const handleUpdateCollaborators = (values: FormikValues) => {
    const updatedValues = getUpdatedValues(initialValues, values);

    patchSong({ id: songId, ...updatedValues });
  };

  const handleVerifyProfile = () => {
    dispatch(setIsIdenfyModalOpen(true));
  };

  const handleConnectWallet = () => {
    dispatch(setIsConnectWalletModalOpen(true));
  };

  const handleSubmitForm = isMintingInitiated
    ? handleUpdateCollaborators
    : handleSubmitStep;

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
              { isMintingInitiated
                ? "Collaborators can't be added or removed after " +
                  "initiating minting"
                : "These details cannot be changed after minting." }
            </AlertTitle>
            <Typography color="baseBlue" fontWeight={ 500 } variant="subtitle1">
              { isMintingInitiated
                ? "If you need to add or remove a collaborator, please " +
                  "contact support."
                : "Please review all details carefully before moving forward " +
                  "with the minting process." }
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
          // if minting has been initiated, only show save button if
          // collaborators have changed, otherwise only show if minting
          const isStepOneButtonVisible = isMintingInitiated
            ? dirty
            : values.isMinting;

          // if minting has been toggled but mint hasn't been initiated
          const isMintingFormVisible = !isMintingInitiated && values.isMinting;

          const isStepOneButtonDisabled =
            isMintingFormVisible && (!isVerified || !wallet);

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
            {
              element: consentsToContractRef.current,
              error: errors.consentsToContract,
            },
          ]);

          return (
            <>
              { stepIndex === 0 && (
                <Stack pt={ 3 }>
                  <Stack spacing={ 5 }>
                    <Box>
                      <SwitchInputField
                        description={
                          "Minting a song will create an NFT that reflects " +
                          "ownership, making streaming royalties purchasable. " +
                          "Once a song is minted, it cannot be deleted."
                        }
                        disabled={ isMintingInitiated }
                        includeBorder={ false }
                        name="isMinting"
                        title="DISTRIBUTE & MINT SONG"
                      />

                      { values.isMinting && (
                        <SelectCoCeators
                          creditors={ values.creditors }
                          featured={ values.featured }
                          isAddDeleteDisabled={ isMintingInitiated }
                          owners={ values.owners }
                          onChangeCreditors={ handleChangeCreditors }
                          onChangeFeatured={ handleChangeFeatured }
                          onChangeOwners={ handleChangeOwners }
                        />
                      ) }
                    </Box>

                    { !!touched.owners && !!errors.owners && (
                      <Box mt={ 0.5 } ref={ coCreatorsRef }>
                        <ErrorMessage>{ errors.owners as string }</ErrorMessage>
                      </Box>
                    ) }

                    { !!touched.creditors && !!errors.creditors && (
                      <Box mt={ 0.5 } ref={ coCreatorsRef }>
                        <ErrorMessage>
                          { errors.creditors as string }
                        </ErrorMessage>
                      </Box>
                    ) }

                    { isMintingFormVisible && !isVerified && (
                      <Alert
                        action={
                          <Button
                            aria-label="close"
                            color="yellow"
                            sx={ { textTransform: "none" } }
                            variant="outlined"
                            onClick={ handleVerifyProfile }
                          >
                            Verify profile
                          </Button>
                        }
                        severity="warning"
                      >
                        <Typography color="yellow">
                          Verify your profile
                        </Typography>
                        <Typography
                          color="yellow"
                          fontWeight={ 400 }
                          variant="subtitle1"
                        >
                          Profile verification is required to mint. Please
                          verify your profile.
                        </Typography>
                      </Alert>
                    ) }

                    { isMintingFormVisible && !wallet && (
                      <Alert
                        action={
                          <Button
                            aria-label="close"
                            color="yellow"
                            sx={ { textTransform: "none" } }
                            variant="outlined"
                            onClick={ handleConnectWallet }
                          >
                            Connect wallet
                          </Button>
                        }
                        severity="warning"
                        sx={ { py: 2.5 } }
                      >
                        <Typography color="yellow">Connect a wallet</Typography>
                        <Typography
                          color="yellow"
                          fontWeight={ 400 }
                          variant="subtitle1"
                        >
                          To continue, please connect a wallet.
                        </Typography>
                      </Alert>
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

                    { isStepOneButtonVisible && (
                      <Button
                        disabled={ isStepOneButtonDisabled }
                        isLoading={ isLoading }
                        width={
                          windowWidth &&
                          windowWidth > theme.breakpoints.values.md
                            ? "compact"
                            : "default"
                        }
                        onClick={ () => handleSubmit() }
                      >
                        { isMintingInitiated ? "Update collaborators" : "Next" }
                      </Button>
                    ) }
                  </Stack>
                </Stack>
              ) }

              { stepIndex === 1 && (
                <Stack>
                  <Stack ref={ consentsToContractRef } sx={ { my: 4, rowGap: 2 } }>
                    <Typography>ONE LAST THING</Typography>
                    <Typography variant="subtitle1">
                      You&apos;re almost ready to mint! To proceed please review
                      your ownership contract and follow the steps below.
                    </Typography>
                  </Stack>

                  <ConfirmContract
                    isCoCreator={ values.owners.length > 1 }
                    songTitle={ title }
                    onConfirm={ (value: boolean) =>
                      setFieldValue("consentsToContract", value)
                    }
                  />

                  <HorizontalLine sx={ { my: 5 } } />

                  <Stack
                    alignItems="center"
                    columnGap={ 2 }
                    direction="row"
                    mt={ 5 }
                  >
                    <Button
                      color="music"
                      variant="secondary"
                      width={
                        windowWidth && windowWidth > theme.breakpoints.values.md
                          ? "compact"
                          : "default"
                      }
                      onClick={ () => setStepIndex(0) }
                    >
                      Previous
                    </Button>

                    <Button
                      disabled={ !values.consentsToContract }
                      isLoading={ isLoading }
                      width={
                        windowWidth && windowWidth > theme.breakpoints.values.md
                          ? "compact"
                          : "default"
                      }
                      onClick={ () => handleSubmit() }
                    >
                      Request Minting
                    </Button>
                  </Stack>
                </Stack>
              ) }
            </>
          );
        } }
      </Formik>
    </Box>
  );
};

export default MintSong;
