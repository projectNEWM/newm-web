import { FunctionComponent, useEffect, useRef } from "react";
import { Box, Stack, useTheme } from "@mui/material";
import { FormikValues, useFormikContext } from "formik";
import {
  Button,
  FilteredTagsField,
  GradientTextInputField,
  Typography,
} from "@newm-web/elements";
import { useUserDevice, useWindowDimensions } from "@newm-web/utils";
import { ResponsiveNEWMLogo } from "../../components";

interface AddProfileInformationProps {
  readonly fieldName: string;
  readonly helperText?: string;
  readonly placeholder?: string;
  readonly prompt: string;
  readonly subText?: string;
  readonly tags?: ReadonlyArray<string>;
}

const AddProfileInformation: FunctionComponent<AddProfileInformationProps> = ({
  fieldName,
  helperText = "",
  placeholder,
  prompt,
  subText,
  tags,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const skipButtonRef = useRef<HTMLButtonElement | null>(null);
  const { isValid, setFieldTouched, handleSubmit, values } =
    useFormikContext<FormikValues>();
  const { isMobileOrTablet } = useUserDevice();
  const windowWidth = useWindowDimensions()?.width;
  const theme = useTheme();

  const isSkipButtonVisible = isValid && !values[fieldName];

  const centerButtonOffset =
    isSkipButtonVisible && skipButtonRef.current
      ? skipButtonRef.current?.offsetWidth +
        Number(theme.spacing(2).slice(0, -2))
      : null;

  /**
   * Validate the field on mount (setting the blur status to false validates
   * the field and leaves it unblurred so that the error isn't shown).
   */
  useEffect(() => {
    setFieldTouched(fieldName, false);
  }, [setFieldTouched, fieldName]);
  /**
   * Focus the field on mount.
   */
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
        event.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Box mb={ 4 }>
        <ResponsiveNEWMLogo />
      </Box>
      <Typography sx={ { textAlign: "center" } } variant="h1">
        { prompt }
      </Typography>
      <Typography sx={ { textAlign: "center" } } variant="subtitle1">
        { subText }
      </Typography>

      <GradientTextInputField
        helperText={ !isValid ? helperText : "" }
        name={ fieldName }
        placeholder={ isMobileOrTablet ? placeholder : undefined }
        ref={ inputRef }
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
              width: "100%",
            } }
          >
            <Stack
              sx={ {
                alignItems: "center",
                display: ["flex", "flex", "block"],
                flexDirection: ["column", "column", "row"],
                gap: 2,
                mb: 1,
                width: "100%",
              } }
            >
              { isSkipButtonVisible && (
                <Button
                  color="music"
                  ref={ skipButtonRef }
                  sx={ {
                    mb: 1,
                    position: ["relative", "relative", "absolute"],
                  } }
                  variant="secondary"
                  width={
                    windowWidth && windowWidth > theme.breakpoints.values.md
                      ? "compact"
                      : "default"
                  }
                  onClick={ () => handleSubmit() }
                >
                  Skip
                </Button>
              ) }

              <Button
                sx={ {
                  left: [null, null, centerButtonOffset],
                } }
                type="submit"
                width={
                  windowWidth && windowWidth > theme.breakpoints.values.md
                    ? "compact"
                    : "default"
                }
              >
                Next
              </Button>
            </Stack>
            <Typography
              color="grey100"
              sx={ { opacity: isValid ? 1 : 0.5 } }
              variant="h5"
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
