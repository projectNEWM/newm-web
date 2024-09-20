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
import StyledInput, { inputStyles } from "./styled/Input";
import NumericInput from "./NumericInput";

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
    type,
    ...rest
  },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const shouldShowErrorMessage = !!errorMessage && shouldDisplayErrorMessage;

  // eslint-disable-next-line
  const InputElement = getInputElement(mask, type) as any;
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
            <Typography
              component="span"
              sx={ { fontWeight: 500, textTransform: "uppercase" } }
            >
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
          maxWidth: widthType === "default" ? theme.inputField.maxWidth : null,
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
            type={ type }
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

const getInputElement = (
  mask: TextInputProps["mask"],
  type: TextInputProps["type"]
) => {
  if (mask) {
    return StyledMaskedInput;
  } else if (type === "number") {
    return NumericInput;
  } else {
    return StyledInput;
  }
};

export default forwardRef(TextInput);
