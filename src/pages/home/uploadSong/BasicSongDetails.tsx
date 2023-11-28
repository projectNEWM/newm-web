import { FunctionComponent, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, HorizontalLine, Typography } from "elements";
import { Box, Stack, useTheme } from "@mui/material";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import {
  useGetGenresQuery,
  useGetLanguagesQuery,
  useGetMoodsQuery,
} from "modules/content";
import { Creditor, Featured, Owner, UploadSongRequest } from "modules/song";
import {
  DropdownMultiSelectField,
  DropdownSelectField,
  ErrorMessage,
  PlaySong,
  SolidOutline,
  SwitchInputField,
  TextAreaField,
  TextInputField,
  UploadImageField,
  UploadSongField,
} from "components";
import {
  scrollToError,
  useAppDispatch,
  useExtractProperty,
  useWindowDimensions,
} from "common";
import SelectCoCeators from "components/minting/SelectCoCreators";
import { useFormikContext } from "formik";
import {
  VerificationStatus,
  emptyProfile,
  useGetProfileQuery,
} from "modules/session";
import { setIsConnectWalletModalOpen, setIsIdenfyModalOpen } from "modules/ui";
import { SongRouteParams } from "../library/types";

interface BasicDonDetailsProps {
  readonly isInEditMode?: boolean;
}

const BasicSongDetails: FunctionComponent<BasicDonDetailsProps> = ({
  isInEditMode,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();

  const audioRef = useRef<HTMLDivElement>(null);
  const coverArtUrlRef = useRef<HTMLDivElement>(null);
  const songDetailsRef = useRef<HTMLDivElement>(null);
  const ownersRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { data: { verificationStatus } = emptyProfile } = useGetProfileQuery();
  const { data: genres = [] } = useGetGenresQuery();
  const { data: moodOptions = [] } = useGetMoodsQuery();
  const { data: languages = [] } = useGetLanguagesQuery();
  const { songId } = useParams<"songId">() as SongRouteParams;

  const languageOptions = useExtractProperty(languages, "language_name");

  const windowWidth = useWindowDimensions()?.width;

  const isVerified = verificationStatus === VerificationStatus.Verified;

  const { values, errors, touched, setFieldValue, isSubmitting } =
    useFormikContext<UploadSongRequest>();

  const isSubmitDisabled = values.isMinting && (!wallet || !isVerified);

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
      { error: errors.audio, element: audioRef.current },
      { error: errors.coverArtUrl, element: coverArtUrlRef.current },
      {
        error: errors.title || errors.genres || errors.moods,
        element: songDetailsRef.current,
      },
      {
        error: errors.description,
        element: descriptionRef.current,
      },
      { error: errors.owners, element: ownersRef.current },
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
          alignItems: ["center", "center", "unset"],
        } }
      >
        <Stack
          ref={ audioRef }
          spacing={ 0.5 }
          width="100%"
          maxWidth={ theme.inputField.maxWidth }
        >
          { isInEditMode ? (
            <>
              <Typography color="grey100" fontWeight={ 500 }>
                SONG
              </Typography>

              <SolidOutline
                sx={ {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1,
                  height: "100px",
                } }
              >
                <PlaySong id={ songId } />
              </SolidOutline>
            </>
          ) : (
            <>
              <Typography color="grey100" fontWeight={ 500 }>
                SONG FILE
              </Typography>

              <UploadSongField name="audio" />
            </>
          ) }
        </Stack>

        <Stack
          maxWidth={ theme.inputField.maxWidth }
          ref={ coverArtUrlRef }
          spacing={ 0.5 }
          width="100%"
        >
          <Typography color="grey100" fontWeight={ 500 }>
            SONG COVER ART
          </Typography>

          <UploadImageField
            changeImageButtonText="Change cover"
            emptyMessage="Drag and drop or browse your image"
            isAspectRatioOneToOne
            hasPreviewOption
            maxFileSizeMB={ 10 }
            minDimensions={ { width: 1400, height: 1400 } }
            name="coverArtUrl"
            rootSx={ { width: "100%", alignSelf: "center" } }
          />
        </Stack>
      </Stack>

      <Stack
        spacing={ 3 }
        sx={ {
          marginX: ["auto", "auto", "unset"],
          maxWidth: [
            theme.inputField.maxWidth,
            theme.inputField.maxWidth,
            "700px",
          ],
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
            options={ genres }
          />

          <DropdownSelectField
            label="LANGUAGE"
            name="language"
            options={ languageOptions }
            placeholder="Select a language"
          />

          <DropdownMultiSelectField
            label="MOOD"
            name="moods"
            options={ moodOptions }
            placeholder="Select all that apply"
          />
        </Stack>

        <TextAreaField
          label="DESCRIPTION"
          name="description"
          placeholder="Tell us about your song"
          ref={ descriptionRef }
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
                title="DISTRIBUTE & MINT SONG"
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
            { values.isMinting ? "Next" : isInEditMode ? "Save" : "Upload" }
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default BasicSongDetails;
