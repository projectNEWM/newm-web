import { FunctionComponent } from "react";
import { Box, Container, useTheme } from "@mui/material";
import {
  ProfileFormValues,
  useUpdateInitialProfileThunk,
} from "modules/session";
import { WizardForm } from "components";
import { commonYupValidation, useExtractProperty } from "common";
import * as Yup from "yup";
import { useGetRolesQuery } from "modules/content";
import Begin from "./Begin";
import SelectNickname from "./SelectNickname";
import SelectRole from "./SelectRole";
import Complete from "./Complete";
import AddFirstName from "./AddFirstName";
import AddLastName from "./AddLastName";

const CreateProfile: FunctionComponent = () => {
  const theme = useTheme();
  const { data: roles = [] } = useGetRolesQuery();
  const roleOptions = useExtractProperty(roles, "name", false);

  const [updateInitialProfile] = useUpdateInitialProfileThunk();

  /**
   * Initial form values.
   */
  const initialValues: ProfileFormValues = {
    role: "",
    firstName: "",
    lastName: "",
  };

  /**
   * Yup validations for all form fields.
   */
  const validations = {
    nickname: commonYupValidation.nickname,
    role: commonYupValidation.role(roleOptions),
    firstName: commonYupValidation.firstName,
    lastName: commonYupValidation.lastName,
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
          onSubmit={ handleSubmit }
          validateOnMount={ true }
          rootPath="create-profile"
          routes={ [
            {
              path: "",
              element: <Begin />,
            },
            {
              path: "what-is-your-first-name",
              element: <AddFirstName />,
              validationSchema: Yup.object().shape({
                firstName: validations.firstName,
              }),
            },
            {
              path: "what-is-your-last-name",
              element: <AddLastName />,
              validationSchema: Yup.object().shape({
                lastName: validations.lastName,
              }),
            },
            {
              path: "what-should-we-call-you",
              element: <SelectNickname />,
              validationSchema: Yup.object().shape({
                nickname: validations.nickname,
              }),
            },
            {
              path: "what-is-your-role",
              element: <SelectRole />,
              validationSchema: Yup.object().shape({
                role: validations.role,
              }),
            },
            {
              path: "complete",
              element: <Complete />,
            },
          ] }
        />
      </Container>
    </Box>
  );
};

export default CreateProfile;
