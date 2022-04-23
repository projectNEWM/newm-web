import { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { updateProfile } from "modules/session";
import { useDispatch, useSelector } from "react-redux";
import { selectContent } from "modules/content";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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

  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { roles, genres } = useSelector(selectContent);

  const initialValues: ProfileFormValues = {
    nickname: "",
    role: "",
    genre: "",
  };

  /**
   * Yup validations for all fields in the form.
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
   * Returns a validation schema depending on what
   * the current route is.
   */
  const getValidationSchema = () => {
    switch (location.pathname) {
      case "/create-profile/what-should-we-call-you":
        return Yup.object().shape({ nickname: validations.nickname });
      case "/create-profile/what-is-your-role":
        return Yup.object().shape({ role: validations.role });
      case "/create-profile/what-is-your-genre":
        return Yup.object().shape({ genre: validations.genre });
      case "/create-profile/complete":
        return Yup.object().shape({
          nickname: validations.nickname,
          role: validations.role,
          genre: validations.genre,
        });
      default:
        return Yup.object().shape({});
    }
  };

  /**
   * Calls submit functionality depending on
   * what the current route is.
   */
  const handleSubmit = ({ genre, ...values }: ProfileFormValues) => {
    switch (location.pathname) {
      case "/create-profile/what-should-we-call-you":
        navigate("/create-profile/what-is-your-role");
        break;
      case "/create-profile/what-is-your-role":
        navigate("/create-profile/what-is-your-genre");
        break;
      case "/create-profile/what-is-your-genre":
        navigate("/create-profile/complete");
        break;
      case "/create-profile/complete":
        dispatch(updateProfile({ ...values, genres: [genre] }));
        break;
      default:
        return;
    }
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
        <Formik
          initialValues={ initialValues }
          validationSchema={ getValidationSchema }
          onSubmit={ handleSubmit }
          validateOnMount={ true }
        >
          { () => (
            <Form>
              <Routes>
                <Route path="" element={ <Begin /> } />

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
