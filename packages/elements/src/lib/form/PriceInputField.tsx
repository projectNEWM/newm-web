import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { ForwardRefRenderFunction, forwardRef } from "react";
import HelpIcon from "@mui/icons-material/Help";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import TextInputField from "./TextInputField";
import DropdownSelectField from "./DropdownSelectField";
import { TextInputProps } from "../TextInput";
import Tooltip from "../styled/Tooltip";
import ErrorMessage from "../styled/ErrorMessage";

interface Props extends Omit<TextInputProps, "name"> {
  readonly currencyFieldName: string;
  readonly priceFieldName: string;
}

/**
 * Displays a copyright year and owner name as two separate fields. Can
 * represent either a composition (©) or phonographic (℗) copyright.
 */
const PriceInputField: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  {
    label,
    priceFieldName,
    currencyFieldName,
    tooltipText,
    helperText,
    placeholder,
    isOptional = true,
    ...rest
  },
  ref
) => {
  const theme = useTheme();

  const priceTouchedKey = priceFieldName as keyof FormikTouched<unknown>;
  const priceErrorsKey = priceFieldName as keyof FormikErrors<unknown>;

  const { touched, errors } = useFormikContext();
  const isTouched = touched[priceTouchedKey];
  const errorMessage = errors[priceErrorsKey];
  const shouldShowErrorMessage = isTouched && errorMessage;

  const renderSubtext = () => {
    if (shouldShowErrorMessage) {
      return <ErrorMessage>{ errorMessage }</ErrorMessage>;
    }

    if (helperText) {
      return <Typography variant="subtitle2">{ helperText }</Typography>;
    }
  };

  return (
    <Stack direction="column" ref={ ref } spacing={ 0.5 }>
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
        <TextInputField
          isOptional={ false }
          name={ priceFieldName }
          placeholder={ placeholder }
          shouldDisplayErrorMessage={ false }
        />

        <Box maxWidth="7.5em">
          <DropdownSelectField
            isOptional={ false }
            name={ currencyFieldName }
            options={ ["USD", "NEWM"] }
            shouldDisplayErrorMessage={ false }
          />
        </Box>
      </Stack>

      { renderSubtext() }
    </Stack>
  );
};

export default forwardRef(PriceInputField);
