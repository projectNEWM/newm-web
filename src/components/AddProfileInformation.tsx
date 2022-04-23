import { FunctionComponent, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import NEWMLogo from "assets/images/NEWMLogo";
import { FilledButton, Typography } from "elements";
import { useFormikContext } from "formik";
import { FilteredTagsField, GradientTextInputField } from "components";

interface AddProfileInformationProps {
  readonly fieldName: string;
  readonly prompt: string;
  readonly helperText?: string;
  readonly tags?: ReadonlyArray<string>;
}

const AddProfileInformation: FunctionComponent<AddProfileInformationProps> = ({
  fieldName,
  prompt,
  tags,
  helperText = "",
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isValid, setFieldTouched, handleSubmit } = useFormikContext();

  /**
   * Validate the field on mount (setting the blur status to false validates
   * the field and leaves it unblurred so that the error isn't shown).
   */
  useEffect(() => {
    setFieldTouched(fieldName, false);
  }, [setFieldTouched, fieldName]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

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

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mb={ 4 } alignSelf="center">
        <NEWMLogo />
      </Box>

      <Typography
        align="center"
        fontWeight="extra-bold"
        variant="xxxl"
        fontFamily="Raleway"
      >
        { prompt }
      </Typography>

      <GradientTextInputField
        name={ fieldName }
        textAlign="center"
        helperText={ !isValid ? helperText : "" }
        sx={ { fontFamily: "DM Serif Text", fontStyle: "italic" } }
        ref={ inputRef }
      />

      <Box mt={ 4 }>
        { isValid || !tags ? (
          <Box
            mt={ 3.25 }
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box mb={ 1 }>
              <FilledButton type="submit" disabled={ !isValid }>
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
