import { FunctionComponent, useMemo } from "react";
import { Box, Container, useTheme } from "@mui/material";
import { WizardForm } from "@newm-web/elements";
import * as Yup from "yup";
import { getUpdatedValues, removeTrailingSlash } from "@newm-web/utils";
import { useLocation } from "react-router-dom";
import { PageNotFound } from "@newm-web/components";
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

const rootPath = "create-profile";

const CreateProfile: FunctionComponent = () => {
  const theme = useTheme();
  const currentPathLocation = useLocation();

  const { data: roles = [] } = useGetRolesQuery();
  const {
    data: { firstName, lastName, role, location, nickname } = emptyProfile,
  } = useGetProfileQuery();

  const [updateInitialProfile] = useUpdateInitialProfileThunk();

  /**
   * Initial form values.
   */
  const initialValues: ProfileFormValues = {
    firstName,
    lastName,
    location,
    nickname,
    role: role || "",
  };

  const wizardRoutes = useMemo(
    () => [
      {
        element: <Begin />,
        path: "",
      },
      {
        element: <AddFirstName />,
        path: "what-is-your-first-name",
        validationSchema: Yup.object().shape({
          firstName: commonYupValidation.firstName,
        }),
      },
      {
        element: <AddLastName />,
        path: "what-is-your-last-name",
        validationSchema: Yup.object().shape({
          lastName: commonYupValidation.lastName,
        }),
      },
      {
        element: <SelectNickname />,
        path: "what-should-we-call-you",
        validationSchema: Yup.object().shape({
          nickname: commonYupValidation.nickname,
        }),
      },
      {
        element: <SelectRole />,
        path: "what-is-your-role",
        validationSchema: Yup.object().shape({
          role: commonYupValidation.role(roles),
        }),
      },
      {
        element: <SelectLocation />,
        path: "what-is-your-location",
        validationSchema: Yup.object().shape({
          location: commonYupValidation.location,
        }),
      },
      {
        element: <Complete />,
        path: "complete",
      },
    ],
    [roles]
  );

  /**
   * Submits the form when on the last route of the form.
   */
  const handleSubmit = (values: ProfileFormValues) => {
    const updatedValues = getUpdatedValues(initialValues, values);

    updateInitialProfile(updatedValues);
  };

  /**
   * Check if the current path is a valid path, if not, show a 404 page.
   */
  const currentPathName = removeTrailingSlash(currentPathLocation.pathname);
  const validPaths = useMemo(
    () =>
      wizardRoutes.map((route) =>
        removeTrailingSlash(`/${rootPath}/${route.path}`)
      ),
    [wizardRoutes]
  );
  const isValidPath = validPaths.includes(currentPathName);

  if (!isValidPath) {
    return <PageNotFound />;
  }

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
          enableReinitialize={ true }
          initialValues={ initialValues }
          rootPath={ rootPath }
          routes={ wizardRoutes }
          validateOnMount={ true }
          onSubmit={ handleSubmit }
        />
      </Container>
    </Box>
  );
};

export default CreateProfile;
