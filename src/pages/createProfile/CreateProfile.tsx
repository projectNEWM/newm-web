import { FunctionComponent } from "react";
import { Box, Container, useTheme } from "@mui/material";
import {
  ProfileFormValues,
  useUpdateInitialProfileThunk,
} from "modules/session";
import { WizardForm } from "components";
import { commonYupValidation, extractProperty } from "common";
import * as Yup from "yup";
import { Role, useGetRolesQuery } from "modules/content";
import Begin from "./Begin";
import SelectNickname from "./SelectNickname";
import SelectRole from "./SelectRole";
import Complete from "./Complete";

const CreateProfile: FunctionComponent = () => {
  const theme = useTheme();
  const { data: roles = [] } = useGetRolesQuery();
  const roleOptions = extractProperty<Role, "name">(roles, "name");

  const [updateInitialProfile] = useUpdateInitialProfileThunk();

  /**
   * Initial form values.
   */
  const initialValues: Partial<ProfileFormValues> = {
    nickname: "",
    role: "",
  };

  /**
   * Yup validations for all form fields.
   */
  const validations = {
    nickname: commonYupValidation.nickname,
    role: commonYupValidation.role(roleOptions),
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
              validationSchema: Yup.object().shape({
                nickname: validations.nickname,
                role: validations.role,
              }),
            },
          ] }
        />
      </Container>
    </Box>
  );
};

export default CreateProfile;
