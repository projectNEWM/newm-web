import { Box, Stack, Typography, useTheme } from "@mui/material";
import { TextInput, TextInputProps } from "elements";
import { ForwardRefRenderFunction, forwardRef } from "react";
import {
  Field,
  FieldProps,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from "formik";
import ErrorMessage from "components/styled/ErrorMessage";

interface Props extends Omit<TextInputProps, "startAdornment"> {
  readonly yearFieldName: string;
  readonly ownerFieldName: string;
  readonly copyrightType?: "composition" | "phonographic";
}

/**
 * Displays a copyright year and owner name as two separate fields. Can
 * represent either a composition (©) or phonographic (℗) copyright.
 */
const CopyrightInputField: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  {
    label,
    endAdornment,
    yearFieldName,
    ownerFieldName,
    copyrightType = "composition",
    isOptional = true,
    ...rest
  },
  ref
) => {
  const theme = useTheme();

  const yearTouchedKey = yearFieldName as keyof FormikTouched<unknown>;
  const ownerTouchedKey = ownerFieldName as keyof FormikTouched<unknown>;
  const yearErrorsKey = yearFieldName as keyof FormikErrors<unknown>;
  const ownerErrorsKey = ownerFieldName as keyof FormikErrors<unknown>;

  const { touched, errors } = useFormikContext();
  const isTouched = touched[yearTouchedKey] && touched[ownerTouchedKey];
  const errorMessage = errors[yearErrorsKey] || errors[ownerErrorsKey];

  return (
    <Stack direction="column" spacing={ 1 } ref={ ref }>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          sx={ {
            textTransform: "uppercase",
            fontWeight: 500,
            color: theme.colors.grey100,
            opacity: rest.disabled ? 0.5 : 1,
          } }
        >
          { label }
        </Typography>

        { isOptional && (
          <Typography
            sx={ {
              opacity: rest.disabled ? 0.5 : 1,
              color: theme.colors.grey400,
            } }
            component="span"
            marginLeft="auto"
          >
            OPTIONAL
          </Typography>
        ) }
      </Stack>

      <Stack direction="row" spacing={ 1 }>
        <Box maxWidth="7.5em">
          <Field name={ yearFieldName }>
            { ({ field, meta }: FieldProps) => (
              <TextInput
                startAdornment={
                  <Box px={ 1 } justifyContent="center" alignItems="center">
                    <Typography fontSize={ 20 }>
                      { copyrightType === "composition" ? (
                        <span>&copy;</span>
                      ) : (
                        <span>&#8471;</span>
                      ) }
                    </Typography>
                  </Box>
                }
                errorMessage={ meta.touched ? meta.error : "" }
                mask="9999"
                maskChar={ null }
                placeholder={ new Date().getFullYear().toString() }
                tooltipText={ "" }
                isOptional={ false }
                shouldDisplayErrorMessage={ false }
                { ...field }
                { ...rest }
              />
            ) }
          </Field>
        </Box>

        <Field name={ ownerFieldName }>
          { ({ field, meta }: FieldProps) => (
            <TextInput
              errorMessage={ meta.touched ? meta.error : "" }
              endAdornment={ endAdornment }
              placeholder="Owner Name"
              isOptional={ false }
              shouldDisplayErrorMessage={ false }
              { ...field }
              { ...rest }
            />
          ) }
        </Field>
      </Stack>

      { isTouched && errorMessage && <ErrorMessage>{ errorMessage }</ErrorMessage> }
    </Stack>
  );
};

export default forwardRef(CopyrightInputField);
