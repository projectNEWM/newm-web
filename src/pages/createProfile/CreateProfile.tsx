import { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectRole } from "modules/role";
import { selectGenre } from "modules/genre";
import { Navigate, Route, Routes } from "react-router-dom";
import * as Yup from "yup";
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

  const { roles } = useSelector(selectRole);
  const { genres } = useSelector(selectGenre);

  const initialValues: ProfileFormValues = {
    nickname: "",
    role: "",
    genre: "",
  };

  const ValidationSchema = Yup.object().shape({
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
  });

  /**
   * Don't try to submit form when pressing enter. This is because
   * the form already has custom functionality when pressing enter.
   */
  const handleKeyDown = (event: any) => {
    if ((event.charCode || event.keyCode) === 13) {
      event.preventDefault();
    }
  };

  const handleSubmit = () => {
    // logic to submit form data here
  };

  return (
    <Box
      px={ 2 }
      pt={ 10 }
      sx={ {
        display: "flex",
        flex: 1,
        maxWidth: "100%",
        backgroundColor: theme.colors.black,
      } }
    >
      <Container maxWidth="xl">
        <Formik
          initialValues={ initialValues }
          validationSchema={ ValidationSchema }
          onSubmit={ handleSubmit }
          validateOnMount={ true }
        >
          { () => (
            <Form onKeyDown={ handleKeyDown }>
              <Routes>
                <Route
                  path=""
                  element={ <Navigate to="what-should-we-call-you" replace /> }
                />

                <Route
                  path="what-should-we-call-you"
                  element={ <SelectNickname /> }
                />
                <Route path="what-is-your-role" element={ <SelectRole /> } />
                <Route path="what-is-your-genre" element={ <SelectGenre /> } />
                <Route path="complete" element={ <Complete /> } />
              </Routes>
            </Form>
          ) }
        </Formik>
      </Container>
    </Box>
  );
};

export default CreateProfile;
