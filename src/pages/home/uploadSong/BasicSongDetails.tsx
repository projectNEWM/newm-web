import { FunctionComponent, useEffect, useRef } from "react";
import { Alert, Button, HorizontalLine, Typography } from "elements";
import { Box, Stack, useTheme } from "@mui/material";
import {
  Genre,
  Language,
  extractProperty,
  useGetGenresQuery,
  useGetLanguagesQuery,
  useGetMoodsQuery,
} from "modules/content";
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
import { scrollToError, useAppDispatch, useWindowDimensions } from "common";
import SelectCoCeators from "components/minting/SelectCoCreators";
import { useFormikContext } from "formik";
import {
  VerificationStatus,
  emptyProfile,
  useGetProfileQuery,
} from "modules/session";
import { setIsConnectWalletModalOpen, setIsIdenfyModalOpen } from "modules/ui";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";

const BasicSongDetails: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();

  const audioRef = useRef<HTMLDivElement>(null);
  const coverArtUrlRef = useRef<HTMLDivElement>(null);
  const songDetailsRef = useRef<HTMLDivElement>(null);
  const ownersRef = useRef<HTMLDivElement>(null);

  const { data: { verificationStatus } = emptyProfile } = useGetProfileQuery();
  const { data: genres = [] } = useGetGenresQuery();
  const { data: moodOptions = [] } = useGetMoodsQuery();
  const { data: languages = [] } = useGetLanguagesQuery();

  const genreOptions = extractProperty<Genre, "name">(genres, "name");
  const languageOptions = extractProperty<Language, "language_name">(
    languages,
    "language_name"
  );

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
      { error: errors.title || errors.genres, ref: songDetailsRef },
      { error: errors.owners, ref: ownersRef },
    ]);
  }, [errors, isSubmitting]);

  return (
    <Stack direction="column" spacing={ 5 }>
      <Stack
        sx={ {
          display: "flex",
          flexDirection: ["column", "column", "row"],
          columnGap: [undefined, undefined, 1.5],
          rowGap: [2, null, 3],
          maxWidth: [undefined, undefined, "700px"],
          marginBottom: 3,
        } }
      >
        <Stack ref={ audioRef } spacing={ 0.5 } width="100%">
          <Typography color="grey100" fontWeight={ 500 }>
            SONG FILE
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
            changeImageButtonText="Change cover"
            minDimensions={ { width: 2048, height: 2048 } }
            isMultiButtonLayout
          />
        </Stack>
      </Stack>

      <Stack
        spacing={ 3 }
        sx={ {
          marginX: ["auto", "auto", "unset"],
          maxWidth: ["340px", "340px", "700px"],
          alignSelf: ["center", "center", "unset"],
        } }
      >
        <Stack
          ref={ songDetailsRef }
          sx={ {
            display: "grid",
            gridTemplateColumns: ["repeat(1, 1fr)", null, "repeat(2, 1fr)"],
            rowGap: [2, null, 3],
            columnGap: [undefined, undefined, 1.5],
          } }
        >
          <TextInputField
            isOptional={ false }
            name="title"
            label="SONG TITLE"
            placeholder="Give your track a name..."
            widthType="full"
          />

          <DropdownMultiSelectField
            label="GENRE"
            isOptional={ false }
            name="genres"
            placeholder="Select all that apply"
            options={ genreOptions }
          />

          <DropdownMultiSelectField
            label="LANGUAGE"
            name="language"
            placeholder="Select all that apply"
            options={ languageOptions }
          />

          <DropdownMultiSelectField
            label="MOOD"
            name="moods"
            placeholder="Select all that apply"
            options={ moodOptions }
          />
        </Stack>

        <TextAreaField
          name="description"
          label="DESCRIPTION"
          placeholder="Tell us about your song"
        />

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

        <Box>
          <HorizontalLine mb={ 5 } />

          { /** TODO: disable button if verify or wallet warnings visible */ }
          <Button
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
        </Box>
      </Stack>
    </Stack>
  );
};

export default BasicSongDetails;
