import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, IconButton, Stack } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useGetSongsQuery } from "modules/song";
import { Button, HorizontalLine, Tooltip, Typography } from "elements";
import {
  DropdownSelectField,
  ProfileImage,
  SwitchInputField,
  TextAreaField,
  TextInputField,
} from "components";
import {
  commonYupValidation,
  getUpdatedValues,
  useWindowDimensions,
} from "common";

import { useGetRolesQuery } from "modules/content";
import {
  VerificationStatus,
  selectSession,
  updateProfile,
} from "modules/session";
import theme from "theme";
import { setIsIdenfyModalOpen } from "modules/ui";

const { Unverified, Pending, Verified } = VerificationStatus;

const Profile: FunctionComponent = () => {
  const dispatch = useDispatch();

  const windowWidth = useWindowDimensions()?.width;
  const { data: roles = [] } = useGetRolesQuery();

  const {
    isLoading,
    profile: {
      biography,
      companyName,
      email,
      firstName,
      instagramUrl,
      isIpRightsUnderCompany,
      lastName,
      nickname,
      pictureUrl,
      role,
      twitterUrl,
      verificationStatus,
      websiteUrl,
    } = {},
  } = useSelector(selectSession);

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

  const initialValues = {
    biography,
    companyName,
    email,
    firstName,
    genre,
    instagramUrl,
    isIpRightsUnderCompany,
    lastName,
    nickname,
    role,
    twitterUrl,
    websiteUrl,
  };

  const validationSchema = Yup.object({
    biography: Yup.string(),
    companyName: Yup.string().when("isIpRightsUnderCompany", {
      is: true,
      then: Yup.string().required("Company name is required"),
      otherwise: Yup.string(),
    }),
    firstName: commonYupValidation.firstName,
    instagramUrl: Yup.string().url("Please enter a valid url"),
    isIpRightsUnderCompany: Yup.bool(),
    lastName: commonYupValidation.lastName,
    nickname: commonYupValidation.nickname,
    role: commonYupValidation.role(roles),
    twitterUrl: Yup.string().url("Please enter a valid url"),
    websiteUrl: Yup.string().url("Please enter a valid url"),
  });

  /**
   * Update profile data with modifications made.
   */
  const handleSubmit = (values: FormikValues) => {
    const originalValues = {
      biography,
      companyName,
      firstName,
      instagramUrl,
      isIpRightsUnderCompany,
      lastName,
      nickname,
      pictureUrl,
      role,
      twitterUrl,
      websiteUrl,
    };

    const updatedValues = getUpdatedValues(originalValues, values);

    if (
      updatedValues.isIpRightsUnderCompany === false ||
      values.isIpRightsUnderCompany === false
    ) {
      updatedValues.companyName = "";
    }

    dispatch(updateProfile({ ...updatedValues }));
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
      <Stack direction="row" alignItems="center" columnGap={ 2 } mt={ 5 }>
        { pictureUrl && (
          <ProfileImage
            alt="Profile picture"
            src={ pictureUrl }
            sx={ { mb: 5 } }
            referrerPolicy="no-referrer"
          />
        ) }
        <Typography variant="h3" fontWeight="700">
          { nickname }
        </Typography>
        { isVerified ? <CheckCircleIcon color="success" /> : null }
      </Stack>
      <Formik
        enableReinitialize={ true }
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
        validationSchema={ validationSchema }
      >
        { ({ dirty, handleReset }) => {
          return (
            <Form>
              <Box
                sx={ { maxWidth: ["340px", "340px", "700px"], margin: "0 auto" } }
              >
                <Stack rowGap={ 10 }>
                  <Stack rowGap={ 2 }>
                    <Typography variant="h4" fontWeight="700">
                      YOUR PUBLIC PROFILE
                    </Typography>
                    <TextInputField
                      label="STAGE NAME"
                      name="nickname"
                      placeholder="Stage name"
                      type="text"
                    />
                    <Stack
                      sx={ {
                        flexDirection: ["column", "column", "row"],
                        justifyContent: "space-between",
                        rowGap: 2,
                      } }
                    >
                      <DropdownSelectField
                        label="MAIN ROLE"
                        name="role"
                        options={ roles }
                        placeholder="Main role"
                      />
                      <TextInputField
                        disabled={ true }
                        label="MUSIC GENRE"
                        name="genre"
                        placeholder="Music genre"
                        tooltipText="Your genre is determined by the songs you upload."
                        type="text"
                      />
                    </Stack>
                    <TextAreaField
                      isOptional={ true }
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
                        isOptional={ true }
                        label="WEBSITE"
                        name="websiteUrl"
                        placeholder="Your website link"
                        type="text"
                      />
                      <TextInputField
                        isOptional={ true }
                        label="TWITTER"
                        name="twitterUrl"
                        placeholder="Twitter link"
                        type="text"
                      />
                    </Stack>
                    <TextInputField
                      isOptional={ true }
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
                        label="FIRST NAME"
                        name="firstName"
                        placeholder="First name"
                        type="text"
                      />
                      <TextInputField
                        label="LAST NAME"
                        name="lastName"
                        placeholder="Last name"
                        type="text"
                      />
                    </Stack>
                    <TextInputField
                      disabled={ true }
                      label="PRIMARY EMAIL"
                      name="email"
                      placeholder="john@mail.com"
                      type="email"
                    />
                  </Stack>
                  <Stack rowGap={ 2 }>
                    <Typography variant="h4" fontWeight="700">
                      OTHER SETTINGS
                    </Typography>
                    <SwitchInputField
                      name="isIpRightsUnderCompany"
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
                        <img
                          alt="TODO: Replace this with reusable img component"
                          src={ pictureUrl }
                          style={ { height: "60px", width: "60px" } }
                        />
                        <TextInputField
                          aria-label="Your company name"
                          name="companyName"
                          placeholder="Your company name"
                          type="text"
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
              </Box>
            </Form>
          );
        } }
      </Formik>
    </Container>
  );
};

export default Profile;
