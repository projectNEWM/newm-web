import { FunctionComponent, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Button, Typography } from "elements";
import { useFormikContext } from "formik";
import {
  FilteredTagsField,
  GradientTextInputField,
  ResponsiveNEWMLogo,
} from "components";
import { useUserDevice, useWindowDimensions } from "common";
import theme from "theme";

interface AddProfileInformationProps {
  readonly fieldName: string;
  readonly helperText?: string;
  readonly placeholder?: string;
  readonly prompt: string;
  readonly tags?: ReadonlyArray<string>;
}

const AddProfileInformation: FunctionComponent<AddProfileInformationProps> = ({
  fieldName,
  helperText = "",
  placeholder,
  prompt,
  tags,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isValid, handleSubmit } = useFormikContext();
  const { isMobileOrTablet } = useUserDevice();
  const windowWidth = useWindowDimensions()?.width;

  // TODO: When the field is touched or focused the form submits causing
  // the optional field to submit and route on load within WizardForms. The
  // required fields just show their validation error. This is probably because
  // the field is being validated on mount.

  /**
   * Validate the field on mount (setting the blur status to false validates
   * the field and leaves it unblurred so that the error isn't shown).
   */
  // useEffect(() => {
  //   setFieldTouched(fieldName, false);
  // }, [setFieldTouched, fieldName]);
  /**
   * Focus the field on mount.
   */
  // useEffect(() => {
  //   inputRef.current?.focus();
  //   console.log(inputRef.current);

  //   return () => {
  //     console.log("input ref cleared");
  //     inputRef.current = null;
  //   };
  // }, [inputRef]);

  /**
   * Add an event listener to submit the form when enter is pressed.
   * Without this Formik will only submit the form when enter is pressed
   * while an input is focused.
   */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mb={ 4 }>
        <ResponsiveNEWMLogo />
      </Box>
      <Typography variant="h1" sx={ { textAlign: "center" } }>
        { prompt }
      </Typography>

      <GradientTextInputField
        ref={ inputRef }
        helperText={ !isValid ? helperText : "" }
        name={ fieldName }
        placeholder={ isMobileOrTablet ? placeholder : undefined }
        textAlign="center"
      />

      <Box sx={ { mt: [2, 2, 4], width: "100%" } }>
        { isValid || !tags ? (
          <Box
            sx={ {
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              mt: 2,
            } }
          >
            <Button
              disabled={ !isValid }
              sx={ { mb: 1 } }
              type="submit"
              width={
                windowWidth && windowWidth > theme.breakpoints.values.md
                  ? "compact"
                  : "default"
              }
            >
              Next
            </Button>

            <Typography
              variant="h5"
              color="grey100"
              sx={ { opacity: isValid ? 1 : 0.5 } }
            >
              or press Enter
            </Typography>
          </Box>
        ) : (
          <>
            <FilteredTagsField name={ fieldName } tags={ tags } />
          </>
        ) }
      </Box>
    </Box>
  );
};

export default AddProfileInformation;
