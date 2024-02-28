import {
  FocusEvent,
  ForwardRefRenderFunction,
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useState,
} from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import InputMask from "react-input-mask";
import styled from "styled-components";
import theme from "@newm-web/theme";
import { WidthType } from "@newm-web/utils";
import ErrorMessage from "./styled/ErrorMessage";
import Tooltip from "./styled/Tooltip";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly endAdornment?: JSX.Element;
  readonly errorMessage?: string;
  readonly helperText?: string;
  readonly isOptional?: boolean;
  readonly label?: string;
  readonly mask?: string | Array<string | RegExp>;
  readonly maskChar?: string | null;
  readonly shouldDisplayErrorMessage?: boolean;
  readonly startAdornment?: JSX.Element;
  readonly tooltipText?: ReactNode;
  readonly widthType?: WidthType;
}

const StyledRootElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const inputStyles = `
  width: 100%;
  display: flex;
  flex-grow: 1;
  background: ${theme.colors.grey600};
  color-scheme: dark;
  border-width: 0;
  font-family: ${theme.inputField.fontFamily};
  font-size: ${theme.inputField.fontSize};
  font-weight: ${theme.inputField.fontWeight};
  line-height: ${theme.inputField.lineHeight};
  padding: ${theme.inputField.padding};

  &::placeholder {
    color: ${theme.colors.grey100};
  }

  &:focus {
    outline: none;
  }

  /* Hide number arrows - Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide number arrows - Firefox */
  &: [type=number] {
    -moz-appearance: textfield;
  }

  /* Change date "placeholder" text color to match other fields*/
  &[type="date"]:not([value*="-"])::-webkit-datetime-edit {
    color: ${theme.colors.grey100};
  }
`;

const StyledInput = styled.input`
  ${inputStyles}
`;
const StyledMaskedInput = styled(InputMask)`
  ${inputStyles}
`;

export const TextInput: ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = (
  {
    disabled = false,
    endAdornment,
    errorMessage,
    isOptional = true,
    label,
    mask,
    maskChar,
    onBlur,
    onFocus,
    startAdornment,
    tooltipText = "",
    widthType = "default",
    shouldDisplayErrorMessage = true,
    helperText,
    ...rest
  },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const shouldShowErrorMessage = !!errorMessage && shouldDisplayErrorMessage;

  // eslint-disable-next-line
  const InputElement = (mask ? StyledMaskedInput : StyledInput) as any;
  const maskedProps = mask ? { inputRef: ref, mask, maskChar } : {};

  /**
   * Calls any onFocus prop being passed and then updates local state
   */
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event);
    }

    setIsFocused(true);
  };

  /**
   * Calls any onBlur prop being passed and then updates local state
   */
  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event);
    }

    setIsFocused(false);
  };

  const renderHelperOrErrorMessage = () => {
    if (shouldShowErrorMessage) {
      return <ErrorMessage>{ errorMessage }</ErrorMessage>;
    } else if (helperText && !shouldShowErrorMessage) {
      return <Typography variant="subtitle2">{ helperText }</Typography>;
    }
    return null;
  };

  return (
    <Stack
      direction="column"
      spacing="4px"
      sx={ {
        margin: ["0 auto", "0 auto", "0"],
        maxWidth: widthType === "default" ? theme.inputField.maxWidth : null,
        opacity: disabled ? 0.5 : 1,
        textAlign: "left",
        width: "100%",
      } }
    >
      { !!label && (
        <Typography
          color={ theme.colors.grey100 }
          columnGap={ 0.5 }
          display="flex"
          fontWeight={ 500 }
        >
          <>
            <Typography sx={ { fontWeight: 500, textTransform: "uppercase" } }>
              { label }
            </Typography>

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

            { isOptional && (
              <Typography
                color={ theme.colors.grey400 }
                component="span"
                marginLeft="auto"
              >
                OPTIONAL
              </Typography>
            ) }
          </>
        </Typography>
      ) }

      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        maxWidth={ theme.inputField.maxWidth }
        sx={ {
          background: theme.colors.grey500,
          borderColor: getBorderColor(
            !!errorMessage,
            disabled,
            isHovered,
            isFocused
          ),
          borderRadius: "4px",
          borderStyle: "solid",
          borderWidth: theme.inputField.borderWidth,
          overflow: "hidden",
        } }
        onMouseEnter={ () => setIsHovered(true) }
        onMouseLeave={ () => setIsHovered(false) }
      >
        <StyledRootElement>
          { startAdornment }

          <InputElement
            { ...rest }
            { ...maskedProps }
            disabled={ disabled }
            ref={ ref }
            onBlur={ handleBlur }
            onFocus={ handleFocus }
          />

          { endAdornment }
        </StyledRootElement>
      </Box>

      { renderHelperOrErrorMessage() }
    </Stack>
  );
};

const getBorderColor = (
  hasError: boolean,
  isDisabled: boolean,
  isHovered: boolean,
  isFocused: boolean
) => {
  if (isDisabled) {
    return theme.colors.grey400;
  }

  if (hasError) {
    return theme.colors.red;
  }

  if (isHovered || isFocused) {
    return theme.colors.white;
  }

  return theme.colors.grey400;
};

export default forwardRef(TextInput);
