import { FunctionComponent, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Alert, Button, HorizontalLine, Typography } from "elements";
import { Box, Stack, useTheme } from "@mui/material";
import { useGetGenresQuery, useGetMoodsQuery } from "modules/content";
import { Creditor, Featured, Owner, UploadSongRequest } from "modules/song";
import {
  DropdownMultiSelectField,
  ErrorMessage,
  SwitchInputField,
  TextAreaField,
  TextInputField,
  UploadImageField,
  UploadSongField,
} from "components";
import { scrollToError, useWindowDimensions } from "common";
import SelectCoCeators from "components/minting/SelectCoCreators";
import { useFormikContext } from "formik";
import {
  VerificationStatus,
  emptyProfile,
  useGetProfileQuery,
} from "modules/session";
import { setIsConnectWalletModalOpen, setIsIdenfyModalOpen } from "modules/ui";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";

const SongInfo: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { wallet } = useConnectWallet();

  const audioRef = useRef<HTMLDivElement>(null);
  const coverArtUrlRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const genresRef = useRef<HTMLDivElement>(null);
  const ownersRef = useRef<HTMLDivElement>(null);

  const { data: { verificationStatus } = emptyProfile } = useGetProfileQuery();
  const { data: genreOptions = [] } = useGetGenresQuery();
  const { data: moodOptions = [] } = useGetMoodsQuery();

  const windowWidth = useWindowDimensions()?.width;

  const isVerified = verificationStatus === VerificationStatus.Verified;

  const { values, errors, touched, setFieldValue, isSubmitting } =
    useFormikContext<UploadSongRequest>();

  // TODO: Also disable submit if minting and wallet is not connected, once
  // connecting wallet has been implemented. Allow for now for testing purposes.
  const isSubmitDisabled = values.isMinting && !isVerified;

  const handleChangeOwners = (owners: ReadonlyArray<Owner>) => {
    setFieldValue("owners", owners);
  };

  const handleChangeCreditors = (creditors: ReadonlyArray<Creditor>) => {
    setFieldValue("creditors", creditors);
  };

  const handleChangeFeatured = (featured: ReadonlyArray<Featured>) => {
    setFieldValue("featured", featured);
  };

  const handleVerifyProfile = () => {
    dispatch(setIsIdenfyModalOpen(true));
  };

  useEffect(() => {
    scrollToError(errors, isSubmitting, [
      { error: errors.audio, ref: audioRef },
      { error: errors.coverArtUrl, ref: coverArtUrlRef },
      { error: errors.title, ref: titleRef },
      { error: errors.genres, ref: genresRef },
      { error: errors.owners, ref: ownersRef },
    ]);
  }, [errors, isSubmitting, scrollToError]);

  return (
    <Stack direction="column">
      <Stack
        sx={ {
          display: "flex",
          flexDirection: ["column", "column", "row"],
          columnGap: [undefined, undefined, "20px"],
          rowGap: ["16px", null, "12px"],
          maxWidth: [undefined, undefined, "700px"],
        } }
      >
        <Stack ref={ audioRef } spacing={ 0.5 } width="100%">
          <Typography color="grey100" fontWeight={ 500 }>
            MUSIC
          </Typography>

          <UploadSongField name="audio" />
        </Stack>

        <Stack ref={ coverArtUrlRef } spacing={ 0.5 } width="100%">
          <Typography color="grey100" fontWeight={ 500 }>
            SONG COVER ART
          </Typography>

          <UploadImageField
            rootSx={ { width: "100%", alignSelf: "center" } }
            name="coverArtUrl"
            emptyMessage="Drag and drop or browse your image"
            minDimensions={ { width: 2048, height: 2048 } }
          />
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
          isOptional={ false }
          name="title"
          label="SONG TITLE"
          ref={ titleRef }
          placeholder="Give your track a name..."
          widthType="full"
        />

        <Stack
          ref={ genresRef }
          sx={ {
            display: "grid",
            gridTemplateColumns: ["repeat(1, 1fr)", null, "repeat(2, 1fr)"],
            rowGap: ["16px", null, "12px"],
            columnGap: [undefined, undefined, "20px"],
          } }
        >
          <DropdownMultiSelectField
            label="Genres"
            isOptional={ false }
            name="genres"
            placeholder="Select all that apply"
            options={ genreOptions }
          />

          { /** TODO: get moods from back-end */ }
          <DropdownMultiSelectField
            label="Moods"
            name="moods"
            placeholder="Select all that apply"
            options={ moodOptions }
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
              ref={ ownersRef }
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
                  featured={ values.featured }
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
          </Box>

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
              <Typography color="yellow">Verify your profile</Typography>
              <Typography color="yellow" fontWeight={ 400 } variant="subtitle1">
                Profile verification is required to mint. Please verify your
                profile.
              </Typography>
            </Alert>
          ) }

          { /** TODO: hide if wallet is already connected */ }
          { values.isMinting && !wallet && (
            <Alert
              sx={ { py: 2.5 } }
              severity="warning"
              action={
                <Button
                  aria-label="close"
                  variant="outlined"
                  color="yellow"
                  onClick={ () => {
                    dispatch(setIsConnectWalletModalOpen(true));
                  } }
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
          disabled={ isSubmitDisabled }
          isLoading={ isSubmitting }
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
