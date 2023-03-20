import { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, IconButton, Stack } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Form, Formik, FormikValues } from "formik";
import { Button, HorizontalLine, Tooltip, Typography } from "elements";
import {
  DropdownSelectField,
  IdenfyModal,
  PasswordInputField,
  ProfileImage,
  TextInputField,
} from "components";
import { commonYupValidation, useWindowDimensions } from "common";
import { selectContent } from "modules/content";
import {
  VerificationStatus,
  selectSession,
  updateProfile,
} from "modules/session";
import * as Yup from "yup";
import theme from "theme";

const { Unverified, Pending, Verified } = VerificationStatus;

const Profile: FunctionComponent = () => {
  const dispatch = useDispatch();
  const windowWidth = useWindowDimensions()?.width;
  const { roles, genres } = useSelector(selectContent);
  const {
    profile: {
      email,
      firstName,
      genre,
      lastName,
      nickname,
      pictureUrl,
      role,
      verificationStatus,
    } = {},
  } = useSelector(selectSession);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasRequestedVerification, setHasRequestedVerification] =
    useState(false);
  const isUnverified = verificationStatus === Unverified;
  const isPendingVerification = verificationStatus === Pending;
  const isVerified = verificationStatus === Verified;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVerificationSession = () => {
    if (!hasRequestedVerification) {
      setHasRequestedVerification(true);
    }

    setIsModalOpen(!isModalOpen);
  };

  const initialValues = {
    firstName,
    lastName,
    email,
    nickname,
    role,
    genre,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: commonYupValidation.firstName,
    lastName: commonYupValidation.lastName,
    email: commonYupValidation.email,
    nickname: commonYupValidation.nickname,
    role: commonYupValidation.role(roles),
    genre: commonYupValidation.genre(genres).required("Genre is required"),
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
      ...(pictureUrl !== values.pictureUrl && {
        pictureUrl: values.pictureUrl,
      }),
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
            { hasRequestedVerification ? (
              <IdenfyModal isOpen={ isModalOpen } onClose={ handleCloseModal } />
            ) : null }
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
        { ({
          isValid,
          values: { currentPassword, newPassword, confirmPassword },
        }) => {
          const showEndAdornment = !!(
            currentPassword ||
            newPassword ||
            confirmPassword
          );
          return (
            <Form>
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
                  options={ roles }
                  placeholder="Main role"
                />
                <DropdownSelectField
                  label="MUSIC GENRE"
                  name="genre"
                  options={ genres }
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
                disabled={ !isValid }
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
