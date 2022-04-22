import { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { updateProfile } from "modules/session";
import { useDispatch, useSelector } from "react-redux";
import { selectContent } from "modules/content";
import { Route, Routes } from "react-router-dom";
import * as Yup from "yup";
import { useGetContentQuery } from "modules/content";
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
  useGetContentQuery();

  const theme = useTheme();

  const dispatch = useDispatch();

  const { roles, genres } = useSelector(selectContent);

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
   * Prevent submitting form when pressing enter. This is because
   * the form already has custom functionality when pressing enter.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (event: any) => {
    if ((event.charCode || event.keyCode) === 13) {
      event.preventDefault();
    }
  };

  const handleSubmit = ({ genre, ...values }: ProfileFormValues) => {
    dispatch(
      updateProfile({
        ...values,
        genres: [genre],
      })
    );
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
