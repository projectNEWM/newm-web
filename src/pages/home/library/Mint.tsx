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
  selectSong,
} from "modules/song";
import { useState } from "react";
import { ConfirmContract, SwitchInputField } from "components";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectSession } from "modules/session";
import SelectCoCeators from "components/minting/SelectCoCreators";

interface FormValues {
  readonly hasAgreedToTerms: boolean;
  readonly isMinting: boolean;
  readonly owners: Array<Owner>;
  readonly creditors: Array<Creditor>;
}

const Mint = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const windowWidth = useWindowDimensions()?.width;
  const { title } = location.state as Song;

  const { profile } = useSelector(selectSession);
  const { isLoading } = useSelector(selectSong);

  const [stepIndex, setStepIndex] = useState<0 | 1>(0);
  const [showWarning, setShowWarning] = useState(true);

  const initialValues: FormValues = {
    hasAgreedToTerms: false,
    isMinting: false,
    owners: [],
    creditors: [],
  };

  const handleSubmit = () => {
    // do something
  };

  const handleCompleteStepOne = () => {
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

      <Formik initialValues={ initialValues } onSubmit={ handleSubmit }>
        { ({ values, setFieldValue }) => {
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
                <Stack pt={ 2 }>
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
                    <SelectCoCeators
                      owners={ values.owners }
                      creditors={ values.creditors }
                      onChangeOwners={ handleChangeOwners }
                      onChangeCreditors={ handleChangeCreditors }
                    />
                  ) }

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

                    { values.isMinting && (
                      <Button
                        disabled={ !values.owners.length }
                        isLoading={ isLoading }
                        onClick={ handleCompleteStepOne }
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
                      setFieldValue("hasAgreedToTerms", value)
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
                      disabled={ !values.hasAgreedToTerms }
                      onClick={ handleSubmit }
                      type="submit"
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

export default Mint;
