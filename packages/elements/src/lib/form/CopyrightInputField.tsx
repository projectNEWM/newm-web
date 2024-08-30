import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { ForwardRefRenderFunction, forwardRef } from "react";
import HelpIcon from "@mui/icons-material/Help";
import {
  Field,
  FieldProps,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from "formik";
import TextInput, { TextInputProps } from "../TextInput";
import Tooltip from "../styled/Tooltip";
import ErrorMessage from "../styled/ErrorMessage";

interface Props extends Omit<TextInputProps, "startAdornment"> {
  readonly copyrightType?: "composition" | "phonographic";
  readonly ownerFieldName: string;
  readonly yearFieldName: string;
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
    tooltipText,
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
    <Stack
      direction="column"
      maxWidth={ theme.inputField.maxWidth }
      ref={ ref }
      spacing={ 0.5 }
      width="100%"
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography
          component="div"
          sx={ {
            color: theme.colors.grey100,
            fontWeight: 500,
            opacity: rest.disabled ? 0.5 : 1,
            textTransform: "uppercase",
          } }
        >
          <Stack direction="row" spacing="4px">
            <Box component="label">{ label }</Box>

            { !!tooltipText && (
              <Tooltip title={ tooltipText }>
                <IconButton sx={ { padding: 0 } }>
                  <HelpIcon
                    sx={ {
                      color: theme.colors.grey100,
                      height: "18px",
                      width: "18px",
                    } }
                  />
                </IconButton>
              </Tooltip>
            ) }
          </Stack>
        </Typography>

        { isOptional && (
          <Typography
            component="span"
            marginLeft="auto"
            sx={ {
              color: theme.colors.grey400,
              opacity: rest.disabled ? 0.5 : 1,
            } }
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
                errorMessage={ meta.touched ? meta.error : "" }
                isOptional={ false }
                mask="9999"
                maskChar={ null }
                placeholder={ new Date().getFullYear().toString() }
                shouldDisplayErrorMessage={ false }
                startAdornment={
                  <Box alignItems="center" justifyContent="center" px={ 1 }>
                    <Typography fontSize={ 20 }>
                      { copyrightType === "composition" ? (
                        <span>&copy;</span>
                      ) : (
                        <span>&#8471;</span>
                      ) }
                    </Typography>
                  </Box>
                }
                { ...field }
                { ...rest }
              />
            ) }
          </Field>
        </Box>

        <Field name={ ownerFieldName }>
          { ({ field, meta }: FieldProps) => (
            <TextInput
              endAdornment={ endAdornment }
              errorMessage={ meta.touched ? meta.error : "" }
              isOptional={ false }
              placeholder="Owner Name"
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
