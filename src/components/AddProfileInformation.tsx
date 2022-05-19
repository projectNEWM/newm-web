import { FunctionComponent, useEffect, useRef } from "react";
import { Box, useTheme } from "@mui/material";
import { FilledButton, Typography } from "elements";
import { useFormikContext } from "formik";
import {
  FilteredTagsField,
  GradientTextInputField,
  ResponsiveNEWMLogo,
} from "components";
import { useUserDevice } from "common";

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
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isValid, setFieldTouched, handleSubmit } = useFormikContext();
  const { isMobileOrTablet } = useUserDevice();

  /**
   * Validate the field on mount (setting the blur status to false validates
   * the field and leaves it unblurred so that the error isn't shown).
   */
  useEffect(() => {
    setFieldTouched(fieldName, false);
  }, [setFieldTouched, fieldName]);

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

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleSubmit]);

  /**
   * Focus the field on mount.
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mb={ 4 }>
        <ResponsiveNEWMLogo />
      </Box>
      <Typography
        align="center"
        sx={ { ...theme.typography.heading, display: "block" } }
      >
        { prompt }
      </Typography>

      <GradientTextInputField
        helperText={ !isValid ? helperText : "" }
        name={ fieldName }
        placeholder={ isMobileOrTablet ? placeholder : undefined }
        ref={ inputRef }
        sx={ { ...theme.typography.gradient } }
        textAlign="center"
      />

      <Box sx={ { mt: [2, 2, 4], width: "100%" } }>
        { isValid || !tags ? (
          <Box
            sx={ {
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              mt: [2, 2, 3.25],
            } }
          >
            <Box mb={ 1 } width="100%">
              <FilledButton
                disabled={ !isValid }
                sx={ { maxWidth: ["352px", "352px", null], width: "100%" } }
                type="submit"
              >
                Next
              </FilledButton>
            </Box>

            <Typography
              variant="xs"
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
