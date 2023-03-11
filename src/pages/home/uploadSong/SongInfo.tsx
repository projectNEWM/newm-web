import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, HorizontalLine, Typography } from "elements";
import { Box, Stack, useTheme } from "@mui/material";
import { selectContent } from "modules/content";
import { Creditor, Owner, UploadSongRequest, selectSong } from "modules/song";
import {
  ErrorMessage,
  SwitchInputField,
  TextAreaField,
  TextInputField,
  UploadImageField,
  UploadSongField,
} from "components";
import { useWindowDimensions } from "common";
import SelectCoCeators from "components/minting/SelectCoCreators";
import { useFormikContext } from "formik";
import DropdownMultiSelectField from "components/form/DropdownMultiSelectField";

const SongInfo: FunctionComponent = () => {
  const theme = useTheme();

  const { genres } = useSelector(selectContent);
  const { isLoading } = useSelector(selectSong);
  const windowWidth = useWindowDimensions()?.width;

  const { values, errors, touched, setFieldValue } =
    useFormikContext<UploadSongRequest>();

  const handleChangeOwners = (owners: ReadonlyArray<Owner>) => {
    setFieldValue("owners", owners);
  };

  const handleChangeCreditors = (creditors: ReadonlyArray<Creditor>) => {
    setFieldValue("creditors", creditors);
  };

  const handleVerifyProfile = () => {
    // trigger iDenfy flow
  };

  const handleConnectWallet = () => {
    // trigger connect wallet modal
  };

  return (
    <Stack direction="column">
      <Stack
        sx={ {
          display: "grid",
          gridTemplateColumns: ["repeat(1, 1fr)", null, "repeat(2, 1fr)"],
          columnGap: [undefined, undefined, "20px"],
          maxWidth: [undefined, undefined, "700px"],
          rowGap: ["16px", null, "12px"],
        } }
      >
        <Stack spacing={ 0.5 }>
          <Typography color="grey100" fontWeight={ 500 }>
            MUSIC
          </Typography>

          <UploadSongField name="audio" />
        </Stack>

        <Stack spacing={ 0.5 } alignItems="center">
          <Typography color="grey100" fontWeight={ 500 }>
            SONG COVER ART
          </Typography>

          <UploadImageField name="image" />
        </Stack>
      </Stack>

      <Stack
        sx={ {
          marginY: 5,
          marginX: ["auto", "auto", "unset"],
          maxWidth: ["340px", "340px", "700px"],
        } }
      >
        <HorizontalLine />
      </Stack>

      <Stack
        spacing={ 2.5 }
        sx={ {
          marginX: ["auto", "auto", "unset"],
          maxWidth: ["340px", "340px", "700px"],
        } }
      >
        <TextInputField
          name="title"
          label="SONG TITLE"
          placeholder="Give your track a name..."
          widthType="full"
        />

        <Stack
          sx={ {
            display: "grid",
            gridTemplateColumns: ["repeat(1, 1fr)", null, "repeat(2, 1fr)"],
            rowGap: ["16px", null, "12px"],
            columnGap: [undefined, undefined, "20px"],
          } }
        >
          <DropdownMultiSelectField
            label="Genres"
            name="genres"
            placeholder="Select all that apply"
            options={ genres }
          />

          { /** TODO: get moods from back-end */ }
          <DropdownMultiSelectField
            label="Mood"
            name="mood"
            placeholder="Select all that apply"
            options={ [] }
          />
        </Stack>

        <TextAreaField
          name="description"
          label="SONG DESCRIPTION"
          placeholder="Tell us about your song"
        />

        <SwitchInputField
          name="isExplicit"
          title="DOES THE SONG CONTAIN EXPLICIT CONTENT?"
          description={
            "Explicit content includes strong or discriminatory language, " +
            "or depictions of sex, violence or substance abuse."
          }
        />

        <Box py={ 2.5 }>
          <HorizontalLine />
        </Box>

        <Stack mt={ 5 } spacing={ 5 }>
          <Box>
            <Box
              sx={ {
                backgroundColor: theme.colors.grey600,
                border: `2px solid ${theme.colors.grey400}`,
                borderRadius: "4px",
              } }
            >
              <SwitchInputField
                name="isMinting"
                title="MINT SONG"
                includeBorder={ false }
                description={
                  "Minting a song will create an NFT that reflects " +
                  "ownership, makes streaming royalties available for " +
                  "purchase, and enables royalty distribution to your account."
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
            </Box>

            { !!touched.owners && !!errors.owners && (
              <Box mt={ 0.5 }>
                <ErrorMessage>{ errors.owners }</ErrorMessage>
              </Box>
            ) }
          </Box>

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
              <Typography color="yellow">Verify your profile</Typography>
              <Typography color="yellow" fontWeight={ 400 } variant="subtitle1">
                Profile verification is required to mint. Please verify your
                profile.
              </Typography>
            </Alert>
          ) }

          { /** TODO: hide if wallet is already connected */ }
          { values.isMinting && (
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
              <Typography color="yellow" fontWeight={ 400 } variant="subtitle1">
                To continue, please connect a wallet.
              </Typography>
            </Alert>
          ) }
        </Stack>

        <Box py={ 2.5 }>
          <HorizontalLine />
        </Box>

        { /** TODO: disable button if verify or wallet warnings visible */ }
        <Button
          sx={ { mt: 5 } }
          type="submit"
          isLoading={ isLoading }
          width={
            windowWidth && windowWidth > theme.breakpoints.values.md
              ? "compact"
              : "default"
          }
        >
          { values.isMinting ? "Next" : "Upload" }
        </Button>
      </Stack>
    </Stack>
  );
};

export default SongInfo;
