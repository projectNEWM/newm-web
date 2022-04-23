import { FunctionComponent } from "react";
import { FormikValues } from "formik";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { updateProfile } from "modules/session";
import { WizardForm } from "components";
import { useDispatch, useSelector } from "react-redux";
import { selectContent } from "modules/content";
import * as Yup from "yup";
import Begin from "./createProfileSteps/Begin";
import SelectNickname from "./createProfileSteps/SelectNickname";
import SelectRole from "./createProfileSteps/SelectRole";
import SelectGenre from "./createProfileSteps/SelectGenre";
import Complete from "./createProfileSteps/Complete";

interface ProfileFormValues {
  readonly nickname: string;
  readonly role: string;
  readonly genre: string;
}

const CreateProfile: FunctionComponent = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { roles, genres } = useSelector(selectContent);

  /**
   * Initial form values.
   */
  const initialValues: ProfileFormValues = {
    nickname: "",
    role: "",
    genre: "",
  };

  /**
   * Yup validations for all form fields.
   */
  const validations = {
    nickname: Yup.string()
      .required("This field is required")
      .matches(/^[aA-zZ\s]+$/, "Please only use letters"),

    role: Yup.string()
      .required("This field is required")
      .test(
        "is-role",
        "You need to type or select one of the ones below",
        (value) => (value ? roles.includes(value) : false)
      ),

    genre: Yup.string()
      .required("This field is required")
      .test(
        "is-genre",
        "You need to type or select one of the ones below",
        (value) => (value ? genres.includes(value) : false)
      ),
  };

  /**
   * Submits the form when on the last route of the form.
   */
  const handleSubmit = ({ genre, ...values }: FormikValues) => {
    dispatch(updateProfile({ ...values, genres: [genre] }));
  };

  return (
    <Box
      sx={ {
        px: 2,
        pt: 10,
        display: "flex",
        flex: 1,
        maxWidth: "100%",
        backgroundColor: theme.colors.black,
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
              path: "what-is-your-genre",
              element: <SelectGenre />,
              validationSchema: Yup.object().shape({
                genre: validations.genre,
              }),
            },
            {
              path: "complete",
              element: <Complete />,
              validationSchema: Yup.object().shape({
                nickname: validations.nickname,
                role: validations.role,
                genre: validations.genre,
              }),
            },
          ] }
        />
      </Container>
    </Box>
  );
};

export default CreateProfile;
