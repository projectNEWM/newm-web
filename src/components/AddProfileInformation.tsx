import {
  FunctionComponent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NEWMLogo from "assets/images/NEWMLogo";
import { FilledButton, Typography } from "elements";
import { useFormikContext } from "formik";
import { FilteredTagsField, GradientTextInputField } from "components";

interface StringMap {
  readonly [key: string]: string;
}

interface AddProfileInformationProps {
  readonly fieldName: string;
  readonly nextRoute: string;
  readonly prompt: string;
  readonly helperText?: string;
  readonly tags?: ReadonlyArray<string>;
}

const AddProfileInformation: FunctionComponent<AddProfileInformationProps> = ({
  fieldName,
  nextRoute,
  prompt,
  tags,
  helperText = "",
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const { errors, handleBlur } = useFormikContext<StringMap>();

  const isValid = !errors[fieldName];

  /**
   * Navigates if there aren't any
   * validation errors for the field.
   */
  const handleNavigate = () => {
    if (isValid) {
      navigate(nextRoute);
    }
  };

  const memoizedHandleNavigate = useCallback(handleNavigate, [
    isValid,
    navigate,
    nextRoute,
  ]);

  useEffect(() => {
    /**
     * Formik seems to have issues with triggering the input to blur if
     * it is focused too early. Delaying the auto focus resolves this.
     */
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [inputRef]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (event: any) => {
      if ((event.charCode || event.keyCode) === 13) {
        handlePressEnter(event);
      }
    };

    /**
     * Blurs the form field to show any errors and calls the
     * navigation handler when the Enter key is pressed.
     */
    const handlePressEnter = (event: KeyboardEvent) => {
      handleBlur(event);
      memoizedHandleNavigate();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [memoizedHandleNavigate, handleBlur, fieldName]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mb={ 4 } alignSelf="center">
        <NEWMLogo />
      </Box>

      <Typography align="center" fontWeight="extra-bold" variant="xxxl">
        { prompt }
      </Typography>

      <GradientTextInputField
        name={ fieldName }
        textAlign="center"
        helperText={ !isValid ? helperText : "" }
        sx={ { fontFamily: "DM Serif Display", fontStyle: "italic" } }
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
              <FilledButton onClick={ handleNavigate } disabled={ !isValid }>
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
          <FilteredTagsField name={ fieldName } tags={ tags } />
        ) }
      </Box>
    </Box>
  );
};

export default AddProfileInformation;
