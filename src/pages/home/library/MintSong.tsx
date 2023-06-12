import { AlertTitle, Box, Button as MUIButton, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useWindowDimensions } from "common";
import { Alert, Button, HorizontalLine, Typography } from "elements";
import theme from "theme";
import {
  CollaborationStatus,
  Creditor,
  Featured,
  MintingStatus,
  Owner,
  Song,
  emptySong,
  useGenerateArtistAgreementThunk,
  useGetCollaborationsQuery,
  useGetSongQuery,
  usePatchSongThunk,
} from "modules/song";
import { useState } from "react";
import { ConfirmContract, ErrorMessage, SwitchInputField } from "components";
import { Formik, FormikValues } from "formik";
import { useDispatch } from "react-redux";
import {
  VerificationStatus,
  emptyProfile,
  useGetProfileQuery,
} from "modules/session";
import SelectCoCeators from "components/minting/SelectCoCreators";
import * as Yup from "yup";
import { setIsConnectWalletModalOpen, setIsIdenfyModalOpen } from "modules/ui";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";

interface FormValues {
  readonly isMinting: boolean;
  readonly owners: Array<Owner>;
  readonly creditors: Array<Creditor>;
  readonly featured: Array<Featured>;
  readonly consentsToContract: boolean;
}

const MintSong = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const windowWidth = useWindowDimensions()?.width;
  const { wallet } = useConnectWallet();
  const { id, title } = location.state as Song;

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
  const [patchSong, { isLoading: isSongLoading }] = usePatchSongThunk();
  const [generateArtistAgreement, { isLoading: isArtistAgreementLoading }] =
    useGenerateArtistAgreementThunk();

  const { data: { mintingStatus } = emptySong } = useGetSongQuery(id);
  const { data: collabs = [] } = useGetCollaborationsQuery({ songIds: id });

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
      id: collab.id,
      email: collab.email,
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
      id: collab.id,
      email: collab.email,
      role: collab.role,
      isCredited: true,
      status: collab.status,
    }));

  // get featured artists from collaborations array
  const featured: Array<Featured> = collabs
    .filter(({ featured }) => featured)
    .map((collab) => ({
      id: collab.id,
      email: collab.email,
      role: collab.role,
      isFeatured: true,
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
          role,
          isCredited: true,
          status: CollaborationStatus.Editing,
        },
      ];

  // set initial featured artists
  const initialFeatured = featured.length ? featured : [];

  // Set collaborator content as visible if any have been added
  const isMinting = collabs.length > 0;

  const initialValues: FormValues = {
    isMinting,
    owners: initialOwners,
    creditors: initialCreditors,
    featured: initialFeatured,
    consentsToContract: false,
  };

  const validationSchema = Yup.object().shape({
    owners: Yup.array().when("isMinting", {
      is: (value: boolean) => !!value,
      then: Yup.array()
        .min(1, "At least one owner is required when minting")
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
  });

  const handleSubmitStep = async (values: FormValues) => {
    if (stepIndex === 0) {
      handleCompleteFirstStep();
    } else {
      await generateArtistAgreement({
        songName: title,
        companyName,
        artistName,
        stageName,
        songId: id,
        saved: true,
      });

      patchSong({ id, ...values });
    }
  };

  const handleCompleteFirstStep = async () => {
    await generateArtistAgreement({
      songName: title,
      companyName,
      artistName,
      stageName,
    });

    setStepIndex(1);
  };

  const handleUpdateCollaborators = (values: FormikValues) => {
    patchSong({ id, ...values });
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
                onClick={ () => {
                  setShowWarning(false);
                } }
                sx={ { textTransform: "none" } }
                variant={ "outlined" }
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
                ? "If you need to remove or add a collaborator, please " +
                  "delete and re-upload the song."
                : "Please review all details carefully before moving forward " +
                  "with the minting process." }
            </Typography>
          </Alert>
        </Box>
      ) }

      <Formik
        initialValues={ initialValues }
        validationSchema={ validationSchema }
        enableReinitialize={ true }
        onSubmit={ handleSubmitForm }
      >
        { ({ values, errors, touched, setFieldValue, handleSubmit, dirty }) => {
          // if minting has been initiated, only show save button if
          // collaborators have changed, otherwise only show if minting
          const isStepOneButtonVisible = isMintingInitiated
            ? dirty
            : values.isMinting;

          const handleChangeOwners = (values: ReadonlyArray<Owner>) => {
            setFieldValue("owners", values);
          };

          const handleChangeCreditors = (values: ReadonlyArray<Creditor>) => {
            setFieldValue("creditors", values);
          };

          const handleChangeFeatured = (values: ReadonlyArray<Featured>) => {
            setFieldValue("featured", values);
          };

          return (
            <>
              { stepIndex === 0 && (
                <Stack pt={ 3 }>
                  <Stack spacing={ 5 }>
                    <Box>
                      <SwitchInputField
                        name="isMinting"
                        title="MINT SONG"
                        disabled={ isMintingInitiated }
                        includeBorder={ false }
                        description={
                          "Minting a song will create an NFT that reflects " +
                          "ownership, making streaming royalties purchasable. " +
                          "Once a song is minted, it cannot be deleted."
                        }
                      />

                      { values.isMinting && (
                        <SelectCoCeators
                          owners={ values.owners }
                          creditors={ values.creditors }
                          featured={ values.featured }
                          isAddDeleteDisabled={ isMintingInitiated }
                          onChangeOwners={ handleChangeOwners }
                          onChangeCreditors={ handleChangeCreditors }
                          onChangeFeatured={ handleChangeFeatured }
                        />
                      ) }
                    </Box>

                    { !!touched.owners && !!errors.owners && (
                      <Box mt={ 0.5 }>
                        <ErrorMessage>{ errors.owners as string }</ErrorMessage>
                      </Box>
                    ) }

                    { values.isMinting && !isVerified && (
                      <Alert
                        severity="warning"
                        action={
                          <Button
                            aria-label="close"
                            variant="outlined"
                            color="yellow"
                            onClick={ handleVerifyProfile }
                            sx={ { textTransform: "none" } }
                          >
                            Verify profile
                          </Button>
                        }
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

                    { values.isMinting && !wallet && (
                      <Alert
                        sx={ { py: 2.5 } }
                        severity="warning"
                        action={
                          <Button
                            aria-label="close"
                            variant="outlined"
                            color="yellow"
                            onClick={ handleConnectWallet }
                            sx={ { textTransform: "none" } }
                          >
                            Connect wallet
                          </Button>
                        }
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

                  <Stack direction="row" columnGap={ 2 }>
                    <Button
                      color="music"
                      onClick={ () => navigate(-1) }
                      variant="secondary"
                      width={
                        windowWidth && windowWidth > theme.breakpoints.values.md
                          ? "compact"
                          : "default"
                      }
                    >
                      Cancel
                    </Button>

                    { isStepOneButtonVisible && (
                      <Button
                        onClick={ () => handleSubmit() }
                        isLoading={ isLoading }
                        disabled={ !isVerified || !wallet }
                        width={
                          windowWidth &&
                          windowWidth > theme.breakpoints.values.md
                            ? "compact"
                            : "default"
                        }
                      >
                        { isMintingInitiated ? "Update collaborators" : "Next" }
                      </Button>
                    ) }
                  </Stack>
                </Stack>
              ) }

              { stepIndex === 1 && (
                <Stack>
                  <Stack sx={ { my: 4, rowGap: 2 } }>
                    <Typography>ONE LAST THING</Typography>
                    <Typography variant="subtitle1">
                      You&apos;re almost ready to mint! To proceed please review
                      your ownership contract and follow the steps below.
                    </Typography>
                  </Stack>

                  <ConfirmContract
                    songTitle={ title }
                    isCoCreator={ values.owners.length > 1 }
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
                      onClick={ () => setStepIndex(0) }
                      variant="secondary"
                      width={
                        windowWidth && windowWidth > theme.breakpoints.values.md
                          ? "compact"
                          : "default"
                      }
                    >
                      Previous
                    </Button>

                    <Button
                      onClick={ () => handleSubmit() }
                      disabled={ !values.consentsToContract }
                      isLoading={ isLoading }
                      width={
                        windowWidth && windowWidth > theme.breakpoints.values.md
                          ? "compact"
                          : "default"
                      }
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
