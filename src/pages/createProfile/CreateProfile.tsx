import { FunctionComponent } from "react";
import { FormikValues } from "formik";
import { Box, Container, useTheme } from "@mui/material";
import { updateInitialProfile } from "modules/session";
import { WizardForm } from "components";
import { commonYupValidation } from "common";
import { useDispatch, useSelector } from "react-redux";
import { selectContent } from "modules/content";
import * as Yup from "yup";
import Begin from "./Begin";
import SelectNickname from "./SelectNickname";
import SelectRole from "./SelectRole";
import Complete from "./Complete";

interface ProfileFormValues {
  readonly nickname: string;
  readonly role: string;
}

const CreateProfile: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { roles } = useSelector(selectContent);

  /**
   * Initial form values.
   */
  const initialValues: ProfileFormValues = {
    nickname: "",
    role: "",
  };

  /**
   * Yup validations for all form fields.
   */
  const validations = {
    nickname: commonYupValidation.nickname,
    role: commonYupValidation.role(roles),
  };

  /**
   * Submits the form when on the last route of the form.
   */
  const handleSubmit = (values: FormikValues) => {
    dispatch(updateInitialProfile({ ...values }));
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
                // genre: validations.genre,
              }),
            },
          ] }
        />
      </Container>
    </Box>
  );
};

export default CreateProfile;
