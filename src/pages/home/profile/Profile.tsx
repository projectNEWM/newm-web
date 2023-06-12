import { FunctionComponent, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box, Container, IconButton, Stack } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useGetSongsQuery } from "modules/song";
import { Button, HorizontalLine, Tooltip, Typography } from "elements";
import {
  DropdownSelectField,
  SwitchInputField,
  TextAreaField,
  TextInputField,
  UploadImageField,
} from "components";
import {
  commonYupValidation,
  getUpdatedValues,
  scrollToError,
  useWindowDimensions,
} from "common";
import { useGetGenresQuery, useGetRolesQuery } from "modules/content";
import {
  ProfileFormValues,
  UpdateProfileRequest,
  VerificationStatus,
  emptyProfile,
  useGetProfileQuery,
  useUpdateProfileThunk,
} from "modules/session";
import theme from "theme";
import { setIsIdenfyModalOpen } from "modules/ui";

const { Unverified, Pending, Verified } = VerificationStatus;

const Profile: FunctionComponent = () => {
  const dispatch = useDispatch();

  const companyNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  const windowWidth = useWindowDimensions()?.width;
  const { data: roleOptions = [] } = useGetRolesQuery();
  const { data: genreOptions = [] } = useGetGenresQuery();

  const {
    data: {
      biography,
      companyName,
      email,
      firstName,
      instagramUrl,
      companyIpRights,
      lastName,
      nickname,
      pictureUrl,
      bannerUrl,
      companyLogoUrl,
      location,
      role,
      twitterUrl,
      verificationStatus,
      websiteUrl,
    } = emptyProfile,
  } = useGetProfileQuery();

  const [updateProfile, { isLoading }] = useUpdateProfileThunk();

  const { data: songData = [] } = useGetSongsQuery({
    ownerIds: ["me"],
    limit: 1,
  });

  const genre = songData?.[0]?.genres?.[0] ?? "";

  const isUnverified = verificationStatus === Unverified;
  const isPendingVerification = verificationStatus === Pending;
  const isVerified = verificationStatus === Verified;

  const handleVerificationSession = () => {
    dispatch(setIsIdenfyModalOpen(true));
  };

  const initialValues: ProfileFormValues = {
    biography,
    companyName,
    email,
    firstName,
    genre,
    instagramUrl,
    companyIpRights,
    lastName,
    nickname,
    role,
    pictureUrl,
    bannerUrl,
    companyLogoUrl,
    location,
    twitterUrl,
    websiteUrl,
  };

  const validationSchema = Yup.object({
    biography: Yup.string().max(250, "Must be 250 characters or less"),
    companyName: Yup.string().when("companyIpRights", {
      is: true,
      then: Yup.string().required("Company name is required"),
      otherwise: Yup.string(),
    }),
    firstName: commonYupValidation.firstName,
    instagramUrl: Yup.string().url("Please enter a valid url"),
    companyIpRights: Yup.bool(),
    lastName: commonYupValidation.lastName,
    nickname: commonYupValidation.nickname,
    role: commonYupValidation.role(roleOptions),
    genre: commonYupValidation.genre(genreOptions),
    twitterUrl: Yup.string().url("Please enter a valid url"),
    websiteUrl: Yup.string().url("Please enter a valid url"),
  });

  /**
   * Update profile data with modifications made.
   */
  const handleSubmit = (values: UpdateProfileRequest) => {
    const updatedValues = getUpdatedValues(initialValues, values);

    if (
      updatedValues.companyIpRights === false ||
      values.companyIpRights === false
    ) {
      updatedValues.companyName = "";
    }

    updateProfile(updatedValues);
  };

  return (
    <Container
      maxWidth={ false }
      sx={ {
        marginX: [null, null, 3],
        paddingBottom: 8,
        overflow: "auto",
        textAlign: ["center", "center", "initial"],
      } }
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3" fontWeight={ 800 }>
          PROFILE
        </Typography>

        { isUnverified || isPendingVerification ? (
          <Stack direction="row">
            <Button
              color="partners"
              variant="outlined"
              width="compact"
              onClick={ handleVerificationSession }
            >
              { isUnverified ? "Verify your profile" : "Pending Verification" }
            </Button>

            <Tooltip title="Verification process takes about 20 minutes.">
              <IconButton>
                <HelpIcon sx={ { color: theme.colors.grey100 } } />
              </IconButton>
            </Tooltip>
          </Stack>
        ) : null }
      </Stack>

      <Formik
        enableReinitialize={ true }
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
        validationSchema={ validationSchema }
      >
        { ({ dirty, errors, handleReset, isSubmitting }) => {
          scrollToError(errors, isSubmitting, [
            { error: errors.nickname, ref: nicknameRef },
            { error: errors.role, ref: roleRef },
            { error: errors.firstName, ref: firstNameRef },
            { error: errors.lastName, ref: lastNameRef },
            { error: errors.companyName, ref: companyNameRef },
          ]);

          return (
            <Form>
              <UploadImageField
                name="bannerUrl"
                emptyMessage="Drag & drop to upload or browse"
                minDimensions={ { width: 1200, height: 200 } }
                errorMessageLocation="inside"
                isSuccessIconDisplayed={ false }
                rootSx={ {
                  position: "absolute",
                  left: [0, 0, "15rem"],
                  right: "2px",
                  top: "10rem",
                  zIndex: 0,
                  maxWidth: "99999px",
                } }
                contentSx={ {
                  height: "200px",
                } }
              />

              <Box
                display="flex"
                justifyContent={ ["center", "center", "flex-start"] }
              >
                <Stack maxWidth={ ["340px", "340px", "700px"] } flexGrow={ 1 }>
                  <Stack
                    display="flex"
                    flexDirection={ ["column", "column", "row"] }
                    justifyContent={ ["center", "center", "flex-start"] }
                    alignItems="center"
                    position="relative"
                    zIndex={ 10 }
                    gap={ 5 }
                    mt={ 29.5 }
                    mb={ 8 }
                  >
                    <UploadImageField
                      name="pictureUrl"
                      emptyMessage="Upload an image"
                      minDimensions={ { width: 200, height: 200 } }
                      minimumSizeLabel="Min"
                      isSuccessIconDisplayed={ false }
                      contentSx={ {
                        borderRadius: "50%",
                        width: 200,
                        height: 200,
                        padding: 1,
                        marginTop: "-1.5rem",
                        backgroundColor: theme.colors.grey700,
                      } }
                    />

                    <Stack
                      gap={ 1 }
                      width="100%"
                      alignItems={ ["center", "center", "flex-start"] }
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent={ ["center", "center", "flex-start"] }
                        gap={ 2 }
                      >
                        <Typography variant="h3" fontWeight="700">
                          { nickname?.toUpperCase() }
                        </Typography>
                        { isVerified ? (
                          <CheckCircleIcon color="success" />
                        ) : null }
                      </Stack>

                      { location ? (
                        <TextInputField
                          disabled={ true }
                          isOptional={ false }
                          label="LOCATION"
                          name="location"
                          readOnly={ true }
                          type="text"
                        />
                      ) : null }
                    </Stack>
                  </Stack>

                  <Stack rowGap={ 10 }>
                    <Stack rowGap={ 2 }>
                      <Typography variant="h4" fontWeight="700">
                        YOUR PUBLIC PROFILE
                      </Typography>
                      <TextInputField
                        isOptional={ false }
                        label="STAGE NAME"
                        name="nickname"
                        placeholder="Stage name"
                        type="text"
                        ref={ nicknameRef }
                      />
                      <Stack
                        ref={ roleRef }
                        sx={ {
                          flexDirection: ["column", "column", "row"],
                          justifyContent: "space-between",
                          rowGap: 2,
                        } }
                      >
                        <DropdownSelectField
                          isOptional={ false }
                          label="MAIN ROLE"
                          name="role"
                          options={ roleOptions }
                          placeholder="Main role"
                        />
                        <TextInputField
                          isOptional={ false }
                          disabled={ true }
                          label="MUSIC GENRE"
                          name="genre"
                          tooltipText="Your genre is determined by the songs you upload."
                          type="text"
                        />
                      </Stack>
                      <TextAreaField
                        label="DESCRIPTION"
                        name="biography"
                        placeholder="Tell us about yourself"
                      />
                    </Stack>
                    <Stack rowGap={ 2 }>
                      <Stack rowGap={ 0.5 }>
                        <Typography variant="h4" fontWeight="700">
                          SOCIAL MEDIA
                        </Typography>
                        <Typography variant="subtitle2">
                          Link your preferred profiles so fans can follow and
                          connect with you.
                        </Typography>
                      </Stack>
                      <Stack
                        sx={ {
                          flexDirection: ["column", "column", "row"],
                          justifyContent: "space-between",
                          rowGap: 2,
                        } }
                      >
                        <TextInputField
                          label="WEBSITE"
                          name="websiteUrl"
                          placeholder="Your website link"
                          type="text"
                        />
                        <TextInputField
                          label="TWITTER"
                          name="twitterUrl"
                          placeholder="Twitter link"
                          type="text"
                        />
                      </Stack>
                      <TextInputField
                        label="INSTAGRAM"
                        name="instagramUrl"
                        placeholder="Instagram link"
                        type="text"
                      />
                    </Stack>
                    <Stack rowGap={ 2 }>
                      <Stack rowGap={ 0.5 }>
                        <Typography variant="h4" fontWeight="700">
                          ABOUT YOU
                        </Typography>
                        <Typography variant="subtitle2">
                          This info will not be made public on your profile.
                        </Typography>
                      </Stack>
                      <Stack
                        sx={ {
                          flexDirection: ["column", "column", "row"],
                          justifyContent: "space-between",
                          rowGap: 2,
                        } }
                      >
                        <TextInputField
                          isOptional={ false }
                          label="FIRST NAME"
                          name="firstName"
                          placeholder="First name"
                          type="text"
                          ref={ firstNameRef }
                        />
                        <TextInputField
                          isOptional={ false }
                          label="LAST NAME"
                          name="lastName"
                          placeholder="Last name"
                          type="text"
                          ref={ lastNameRef }
                        />
                      </Stack>
                      <TextInputField
                        disabled={ true }
                        label="PRIMARY EMAIL"
                        isOptional={ false }
                        name="email"
                        placeholder="john@mail.com"
                        type="email"
                        ref={ emailRef }
                      />
                    </Stack>
                    <Stack rowGap={ 2 }>
                      <Typography variant="h4" fontWeight="700">
                        OTHER SETTINGS
                      </Typography>
                      <SwitchInputField
                        name="companyIpRights"
                        title="DO YOU HAVE A COMPANY?"
                        description={
                          "If your IP Rights are held under your Company, please select this option."
                        }
                      >
                        <Stack
                          alignItems="center"
                          columnGap={ 1.5 }
                          flexDirection="row"
                          mt={ 2 }
                        >
                          <UploadImageField
                            name="companyLogoUrl"
                            minDimensions={ { width: 100, height: 100 } }
                            minimumSizeLabel="Min"
                            emptyMessage=""
                            replaceMessage=""
                            isSuccessIconDisplayed={ false }
                            isMinimumSizeDisplayed={ false }
                            contentSx={ {
                              borderRadius: "50%",
                              width: 60,
                              height: 60,
                            } }
                          />
                          <TextInputField
                            aria-label="Your company name"
                            name="companyName"
                            placeholder="Your company name"
                            type="text"
                            ref={ companyNameRef }
                          />
                        </Stack>
                      </SwitchInputField>
                    </Stack>
                  </Stack>

                  <HorizontalLine
                    sx={ {
                      maxWidth: ["340px", "340px", "700px"],
                      mx: ["auto", "auto", "unset"],
                      my: 5,
                    } }
                  />
                  <Stack
                    sx={ {
                      columnGap: 2,
                      flexDirection: [null, null, "row"],
                      mt: 5,
                      rowGap: 2,
                    } }
                  >
                    <Button
                      color="music"
                      disabled={ !dirty }
                      onClick={ handleReset }
                      variant="secondary"
                      width={
                        windowWidth && windowWidth > theme.breakpoints.values.md
                          ? "compact"
                          : "default"
                      }
                    >
                      Cancel
                    </Button>

                    <Button
                      disabled={ !dirty }
                      isLoading={ isLoading }
                      width={
                        windowWidth && windowWidth > theme.breakpoints.values.md
                          ? "compact"
                          : "default"
                      }
                      type="submit"
                    >
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Form>
          );
        } }
      </Formik>
    </Container>
  );
};

export default Profile;
