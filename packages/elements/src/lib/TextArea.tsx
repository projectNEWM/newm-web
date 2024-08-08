import {
  FocusEvent,
  ForwardRefRenderFunction,
  ForwardedRef,
  TextareaHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import { Box, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import theme from "@newm-web/theme";
import { WidthType } from "@newm-web/utils";
import ErrorMessage from "./styled/ErrorMessage";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly characterCountLimit?: number;
  readonly currentCharacterCount?: number;
  readonly endAdornment?: JSX.Element;
  readonly errorMessage?: string;
  readonly isOptional?: boolean;
  readonly label?: string;
  readonly startAdornment?: JSX.Element;
  readonly widthType?: WidthType;
}

const StyledRootElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const StyledTextAreaElement = styled.textarea`
  display: flex;
  flex-grow: 1;
  background: ${theme.colors.grey600};
  color: white;
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
`;

export const TextArea: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = (
  {
    errorMessage,
    label,
    onFocus,
    onBlur,
    startAdornment,
    endAdornment,
    characterCountLimit,
    currentCharacterCount,
    disabled = false,
    isOptional = true,
    widthType = "default",
    ...rest
  },
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  /**
   * Calls any onFocus prop being passed and then updates local state
   */
  const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (onFocus) {
      onFocus(event);
    }

    setIsFocused(true);
  };

  /**
   * Calls any onBlur prop being passed and then updates local state
   */
  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(event);
    }

    setIsFocused(false);
  };

  return (
    <Stack
      direction="column"
      spacing="4px"
      sx={ {
        opacity: disabled ? 0.5 : 1,
        textAlign: "left",
        width: "100%",
        [theme.breakpoints.down("md")]: {
          margin: "0 auto",
          maxWidth: widthType === "default" ? theme.inputField.maxWidth : null,
        },
      } }
    >
      { !!label && (
        <Typography
          color={ theme.colors.grey100 }
          columnGap={ 0.5 }
          display="flex"
          fontWeight={ 500 }
        >
          { label }

          { isOptional && (
            <Typography
              color={ theme.colors.grey400 }
              component="span"
              marginLeft="auto"
            >
              OPTIONAL
            </Typography>
          ) }
        </Typography>
      ) }

      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
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

          <StyledTextAreaElement
            disabled={ disabled }
            ref={ ref }
            rows={ 2 }
            onBlur={ handleBlur }
            onFocus={ handleFocus }
            { ...rest }
          />

          { endAdornment }
        </StyledRootElement>
      </Box>

      <Stack
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        { !!errorMessage && <ErrorMessage>{ errorMessage }</ErrorMessage> }
        { currentCharacterCount !== undefined &&
          characterCountLimit !== undefined && (
            <Typography
              color={
                currentCharacterCount > characterCountLimit
                  ? theme.colors.red
                  : theme.colors.grey100
              }
              component="span"
              style={ {
                fontWeight:
                  currentCharacterCount > characterCountLimit
                    ? theme.typography.fontWeightBold
                    : theme.typography.fontWeightMedium,
                marginLeft: "auto",
                marginTop: "4px",
              } }
              variant="subtitle2"
            >
              { `${currentCharacterCount}/${characterCountLimit}` }
            </Typography>
          ) }
      </Stack>
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
    return theme.colors.grey500;
  }

  if (hasError) {
    return theme.colors.red;
  }

  if (isHovered || isFocused) {
    return theme.colors.white;
  }

  return theme.colors.grey500;
};

export default forwardRef(TextArea);
