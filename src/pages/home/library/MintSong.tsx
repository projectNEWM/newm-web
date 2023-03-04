import { Box, Button as MUIButton, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useWindowDimensions } from "common";
import { Alert, Button, HorizontalLine, Typography } from "elements";
import theme from "theme";
import {
  Creditor,
  Owner,
  Song,
  generateArtistAgreement,
  patchSong,
  selectSong,
} from "modules/song";
import { useState } from "react";
import { ConfirmContract, ErrorMessage, SwitchInputField } from "components";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectSession } from "modules/session";
import SelectCoCeators from "components/minting/SelectCoCreators";
import * as Yup from "yup";

interface FormValues {
  readonly isMinting: boolean;
  readonly owners: Array<Owner>;
  readonly creditors: Array<Creditor>;
  readonly consentsToContract: boolean;
}

const MintSong = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const windowWidth = useWindowDimensions()?.width;
  const { id, title } = location.state as Song;

  const { profile } = useSelector(selectSession);
  const { isLoading } = useSelector(selectSong);

  const [stepIndex, setStepIndex] = useState<0 | 1>(0);
  const [showWarning, setShowWarning] = useState(true);

  const initialValues: FormValues = {
    isMinting: false,
    owners: [],
    creditors: [],
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

  const handleSubmitStep = (values: FormValues) => {
    if (stepIndex === 0) {
      handleCompleteFirstStep();
    } else {
      dispatch(patchSong({ id, ...values }));
    }
  };

  const handleCompleteFirstStep = () => {
    const songName = title;
    // TODO: reference company name when exists in profile
    const companyName = "ACME";
    const artistName = `${profile.firstName} ${profile.lastName}`;
    const stageName = profile.nickname;

    dispatch(
      generateArtistAgreement({
        body: {
          songName,
          companyName,
          artistName,
          stageName,
        },
        callback: () => setStepIndex(1),
      })
    );
  };

  const handleVerifyProfile = () => {
    // trigger iDenfy flow
  };

  const handleConnectWallet = () => {
    // trigger connect wallet modal
  };

  return (
    <Box sx={ { maxWidth: "700px" } }>
      { showWarning && (
        <Box sx={ { mt: 2 } }>
          <Alert
            action={
              <MUIButton
                aria-label="close"
                color="info"
                onClick={ () => {
                  setShowWarning(false);
                } }
                sx={ { textTransform: "none" } }
              >
                Dismiss
              </MUIButton>
            }
          >
            <Typography color="baseBlue" fontWeight={ 500 } variant="subtitle1">
              These details cannot be changed after minting.
            </Typography>
          </Alert>
        </Box>
      ) }

      <Formik
        initialValues={ initialValues }
        onSubmit={ handleSubmitStep }
        validationSchema={ validationSchema }
      >
        { ({ values, errors, touched, setFieldValue, handleSubmit }) => {
          const handleChangeOwners = (owners: ReadonlyArray<Owner>) => {
            setFieldValue("owners", owners);
          };

          const handleChangeCreditors = (
            creditors: ReadonlyArray<Creditor>
          ) => {
            setFieldValue("creditors", creditors);
          };

          return (
            <>
              { stepIndex === 0 && (
                <Stack pt={ 2.5 }>
                  <SwitchInputField
                    name="isMinting"
                    title="Mint song"
                    description={
                      "Minting a song will create an NFT that reflects " +
                      "ownership, making streaming royalties purchasable. Once " +
                      "a song is minted, it cannot be deleted."
                    }
                  />

                  { values.isMinting && (
                    <Stack spacing={ 0.5 }>
                      <SelectCoCeators
                        owners={ values.owners }
                        creditors={ values.creditors }
                        onChangeOwners={ handleChangeOwners }
                        onChangeCreditors={ handleChangeCreditors }
                      />

                      { !!touched.owners && !!errors.owners && (
                        <ErrorMessage>{ errors.owners }</ErrorMessage>
                      ) }
                    </Stack>
                  ) }

                  <Stack spacing={ 2.5 } mt={ 2.5 }>
                    { /** TODO: hide if user is already verified */ }
                    { values.isMinting && (
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
                          These details cannot be changed after minting.
                        </Typography>
                      </Alert>
                    ) }

                    { /** TODO: hide if wallet is already connected */ }
                    { values.isMinting && (
                      <Alert
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

                  <Stack direction="row" columnGap={ 2 } mt={ 5 }>
                    <Button
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

                    { /** TODO: disable button if verify or wallet warnings visible */ }
                    { values.isMinting && (
                      <Button
                        onClick={ () => handleSubmit() }
                        isLoading={ isLoading }
                        width={
                          windowWidth &&
                          windowWidth > theme.breakpoints.values.md
                            ? "compact"
                            : "default"
                        }
                      >
                        Next
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

                  <HorizontalLine sx={ { my: 4 } } />

                  <Stack
                    alignItems="center"
                    columnGap={ 2 }
                    direction="row"
                    mt={ 5 }
                  >
                    <Button
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
