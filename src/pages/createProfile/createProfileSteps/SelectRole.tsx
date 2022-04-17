import { FunctionComponent, KeyboardEvent, useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectRole } from "modules/role";
import NEWMLogo from "assets/images/NEWMLogo";
import { FilledButton, Typography } from "elements";
import { useFormikContext } from "formik";
import { FilteredTagsField, GradientTextInputField } from "components";
import { ProfileFormValues } from "../CreateProfile";

const SelectRole: FunctionComponent = () => {
  const navigate = useNavigate();

  const { roles } = useSelector(selectRole);

  const { errors, handleBlur } = useFormikContext<ProfileFormValues>();

  const isValid = !errors.role;

  /**
   * Blurs the form field to show any errors and calls the
   * navigation handler when the Enter key is pressed.
   */
  const handlePressEnter = () => {
    handleBlur("role");
    handleNavigate();
  };

  /**
   * Navigates if there aren't any
   * validation errors for the field.
   */
  const handleNavigate = () => {
    if (isValid) {
      navigate("/create-profile/what-is-your-genre");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 13) {
        handlePressEnter();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handlePressEnter]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mb={ 4 } alignSelf="center">
        <NEWMLogo />
      </Box>

      <Typography align="center" fontWeight="extra-bold" variant="xxxl">
        What is your main role?
      </Typography>

      <GradientTextInputField
        name="role"
        textAlign="center"
        helperText={ !isValid ? "Type or select a role" : "" }
        sx={ { fontFamily: "DM Serif Display", fontStyle: "italic" } }
        autoFocus
      />

      <Box mt={ 4 }>
        { isValid ? (
          <Box
            mt={ 3.25 }
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box mb={ 1 }>
              <FilledButton onClick={ handleNavigate }>Next</FilledButton>
            </Box>

            <Typography variant="xs" color="grey100">
              or press Enter
            </Typography>
          </Box>
        ) : (
          <FilteredTagsField name="role" tags={ roles } />
        ) }
      </Box>
    </Box>
  );
};

export default SelectRole;
