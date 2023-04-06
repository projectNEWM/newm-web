import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, IconButton, Stack } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Form, Formik, FormikValues } from "formik";
import { Button, HorizontalLine, Tooltip, Typography } from "elements";
import {
  DropdownSelectField,
  PasswordInputField,
  TextInputField,
  UploadImageField,
} from "components";
import { commonYupValidation, useWindowDimensions } from "common";
import * as Yup from "yup";
import { useGetGenresQuery, useGetRolesQuery } from "modules/content";
import {
  ProfileFormValues,
  VerificationStatus,
  selectSession,
  updateProfile,
} from "modules/session";
import theme from "theme";
import { setIsIdenfyModalOpen } from "modules/ui";
import countries from "country-list";

const { Unverified, Pending, Verified } = VerificationStatus;

const Profile: FunctionComponent = () => {
  const dispatch = useDispatch();

  const windowWidth = useWindowDimensions()?.width;
  const { data: roleOptions = [] } = useGetRolesQuery();
  const { data: genreOptions = [] } = useGetGenresQuery();

  const {
    profile: {
      email,
      firstName,
      genre,
      lastName,
      nickname,
      pictureUrl,
      bannerUrl,
      location,
      role,
      verificationStatus,
    } = {},
  } = useSelector(selectSession);
  const isUnverified = verificationStatus === Unverified;
  const isPendingVerification = verificationStatus === Pending;
  const isVerified = verificationStatus === Verified;

  const { isLoading } = useSelector(selectSession);

  const countryOptions = countries.getNames();

  const handleVerificationSession = () => {
    dispatch(setIsIdenfyModalOpen(true));
  };

  const initialValues: ProfileFormValues = {
    firstName,
    lastName,
    email,
    nickname,
    role,
    genre,
    profileImage: pictureUrl,
    bannerImage: bannerUrl,
    location,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: commonYupValidation.firstName,
    lastName: commonYupValidation.lastName,
    email: commonYupValidation.email,
    nickname: commonYupValidation.nickname,
    role: commonYupValidation.role(roleOptions),
    genre: commonYupValidation.genre(genreOptions),
    currentPassword: Yup.string().when("newPassword", {
      is: (currentValue: string) => currentValue,
      then: Yup.string().required("Current password is required"),
    }),
    newPassword: commonYupValidation.newPassword,
    confirmPassword: commonYupValidation.confirmPassword.when("newPassword", {
      is: (currentValue: string) => currentValue,
      then: Yup.string().required("Confirm new password is required"),
    }),
  });

  /**
   * Update profile data with modifications made.
   */
  const handleSubmit = (values: FormikValues) => {
    const updatedValues = {
      ...(email !== values.email && { email: values.email }),
      ...(firstName !== values.firstName && { firstName: values.firstName }),
      ...(genre !== values.genre && { genre: values.genre }),
      ...(lastName !== values.lastName && { lastName: values.lastName }),
      ...(nickname !== values.nickname && { nickname: values.nickname }),
      ...(pictureUrl !== values.profileImage && {
        profileImage: values.profileImage,
      }),
      ...(bannerUrl !== values.bannerImage && {
        bannerImage: values.bannerImage,
      }),
      ...(location !== values.location && { location: values.location }),
      ...(role !== values.role && { role: values.role }),
      ...(values.currentPassword && {
        currentPassword: values.currentPassword,
      }),
      ...(values.newPassword && { newPassword: values.newPassword }),
      ...(values.confirmPassword && {
        confirmPassword: values.confirmPassword,
      }),
    };

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

      <Formik
        enableReinitialize={ true }
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
        validationSchema={ validationSchema }
      >
        { ({
          dirty,
          values: { currentPassword, newPassword, confirmPassword },
        }) => {
          const showEndAdornment = !!(
            currentPassword ||
            newPassword ||
            confirmPassword
          );

          return (
            <Form>
              <UploadImageField
                name="bannerImage"
                message="Drag & drop to upload or browse"
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

              <Stack
                display="flex"
                flexDirection={ ["column", "column", "row"] }
                justifyContent="flex-start"
                alignItems="center"
                position="relative"
                zIndex={ 10 }
                gap={ 5 }
                mt={ 29.5 }
                mb={ 8 }
              >
                <UploadImageField
                  name="profileImage"
                  message="Upload an image"
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

                <Stack gap={ 1 } width="100%">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={ ["center", "center", "flex-start"] }
                    gap={ 2 }
                  >
                    <Typography variant="h3" fontWeight="700">
                      { nickname?.toUpperCase() }
                    </Typography>
                    { isVerified ? <CheckCircleIcon color="success" /> : null }
                  </Stack>

                  <DropdownSelectField
                    label="LOCATION"
                    name="location"
                    placeholder="Select your country of residence"
                    options={ countryOptions }
                    widthType="default"
                  />
                </Stack>
              </Stack>

              <Stack
                sx={ {
                  display: "grid",
                  gridTemplateColumns: [
                    "repeat(1, 1fr)",
                    null,
                    "repeat(2, 1fr)",
                  ],
                  columnGap: [undefined, undefined, "20px"],
                  maxWidth: [undefined, undefined, "700px"],
                  rowGap: ["16px", null, "12px"],
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
                <TextInputField
                  label="EMAIL"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <TextInputField
                  label="STAGE NAME"
                  name="nickname"
                  placeholder="Stage name"
                  type="text"
                />
                <DropdownSelectField
                  label="MAIN ROLE"
                  name="role"
                  options={ roleOptions }
                  placeholder="Main role"
                />
                <DropdownSelectField
                  label="MUSIC GENRE"
                  name="genre"
                  options={ genreOptions }
                  placeholder="Music genre"
                />
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
              <Typography variant="subtitle1" fontWeight={ 700 }>
                CHANGE PASSWORD
              </Typography>
              <Stack
                sx={ {
                  marginTop: 2.5,
                  marginBottom: 7.5,
                  display: "grid",
                  gridTemplateColumns: [
                    "repeat(1, 1fr)",
                    null,
                    "repeat(2, 1fr)",
                  ],
                  rowGap: ["16px", null, "12px"],
                  columnGap: [undefined, undefined, "20px"],
                  maxWidth: [undefined, undefined, "700px"],
                } }
              >
                <PasswordInputField
                  label="CURRENT PASSWORD"
                  name="currentPassword"
                  placeholder="Password"
                  showEndAdornment={ showEndAdornment }
                />
                <PasswordInputField
                  label="NEW PASSWORD"
                  name="newPassword"
                  placeholder="New password"
                  showEndAdornment={ showEndAdornment }
                />
                <PasswordInputField
                  label="RETYPE NEW PASSWORD"
                  name="confirmPassword"
                  placeholder="New password"
                  showEndAdornment={ showEndAdornment }
                />
              </Stack>

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
            </Form>
          );
        } }
      </Formik>
    </Container>
  );
};

export default Profile;
