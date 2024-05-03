import { FunctionComponent } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { WizardForm } from "@newm-web/elements";
import * as Yup from "yup";
import Begin from "./Begin";
import SelectNickname from "./SelectNickname";
import SelectRole from "./SelectRole";
import Complete from "./Complete";
import AddFirstName from "./AddFirstName";
import AddLastName from "./AddLastName";
import SelectLocation from "./SelectLocation";
import { useGetRolesQuery } from "../../modules/content";
import { commonYupValidation } from "../../common";
import {
  ProfileFormValues,
  emptyProfile,
  useGetProfileQuery,
  useUpdateInitialProfileThunk,
} from "../../modules/session";

const CreateProfile: FunctionComponent = () => {
  const theme = useTheme();
  const { data: roles = [] } = useGetRolesQuery();
  const { data: { firstName, lastName, role, location } = emptyProfile } =
    useGetProfileQuery();

  const [updateInitialProfile] = useUpdateInitialProfileThunk();

  /**
   * Initial form values.
   */
  const initialValues: ProfileFormValues = {
    firstName,
    lastName,
    location,
    role,
  };

  /**
   * Yup validations for all form fields.
   */
  const validations = {
    firstName: commonYupValidation.firstName,
    lastName: commonYupValidation.lastName,
    location: commonYupValidation.location,
    nickname: commonYupValidation.nickname,
    role: commonYupValidation.role(roles),
  };

  /**
   * Submits the form when on the last route of the form.
   */
  const handleSubmit = (values: ProfileFormValues) => {
    updateInitialProfile({ ...values });
  };

  return (
    <Box
      sx={ {
        backgroundColor: theme.colors.black,
        display: "flex",
        flex: 1,
        maxWidth: "100%",
        pt: 7.5,
        px: 2,
        textAlign: "center",
      } }
    >
      <Container maxWidth="xl">
        <WizardForm
          initialValues={ initialValues }
          rootPath="create-profile"
          routes={ [
            {
              element: <Begin />,
              path: "",
            },
            {
              element: <AddFirstName />,
              path: "what-is-your-first-name",
              validationSchema: Yup.object().shape({
                firstName: validations.firstName,
              }),
            },
            {
              element: <AddLastName />,
              path: "what-is-your-last-name",
              validationSchema: Yup.object().shape({
                lastName: validations.lastName,
              }),
            },
            {
              element: <SelectNickname />,
              path: "what-should-we-call-you",
              validationSchema: Yup.object().shape({
                nickname: validations.nickname,
              }),
            },
            {
              element: <SelectRole />,
              path: "what-is-your-role",
              validationSchema: Yup.object().shape({
                role: validations.role,
              }),
            },
            {
              element: <SelectLocation />,
              path: "what-is-your-location",
              validationSchema: Yup.object().shape({
                location: validations.location,
              }),
            },
            {
              element: <Complete />,
              path: "complete",
            },
          ] }
          validateOnMount={ true }
          onSubmit={ handleSubmit }
        />
      </Container>
    </Box>
  );
};

export default CreateProfile;
