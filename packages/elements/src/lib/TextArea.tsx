import {
  FocusEvent,
  ForwardRefRenderFunction,
  ForwardedRef,
  TextareaHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "newm-theme";
import ErrorMessage from "./styled/ErrorMessage";
// import { WidthType } from "common"; TODO

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly label?: string;
  readonly errorMessage?: string;
  readonly startAdornment?: JSX.Element;
  readonly endAdornment?: JSX.Element;
  readonly widthType?: string;
  readonly isOptional?: boolean;
}

const StyledRootElement = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const StyledTextAreaElement = styled("textarea")`
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
    disabled = false,
    isOptional = true,
    widthType = "default",
    ...rest
  },
  ref
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
      sx={{
        opacity: disabled ? 0.5 : 1,
        width: "100%",
        textAlign: "left",
        [theme.breakpoints.down("md")]: {
          margin: "0 auto",
          maxWidth: widthType === "default" ? theme.inputField.maxWidth : null,
        },
      }}
    >
      {!!label && (
        <Typography
          color={theme.colors.grey100}
          columnGap={0.5}
          display="flex"
          fontWeight={500}
        >
          {label}

          {isOptional && (
            <Typography
              color={theme.colors.grey400}
              component="span"
              marginLeft="auto"
            >
              OPTIONAL
            </Typography>
          )}
        </Typography>
      )}

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          borderWidth: theme.inputField.borderWidth,
          borderStyle: "solid",
          borderColor: getBorderColor(
            !!errorMessage,
            disabled,
            isHovered,
            isFocused
          ),
          borderRadius: "4px",
          overflow: "hidden",
          background: theme.colors.grey500,
        }}
      >
        <StyledRootElement>
          {startAdornment}

          <StyledTextAreaElement
            rows={2}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            ref={ref}
            {...rest}
          />

          {endAdornment}
        </StyledRootElement>
      </Box>

      {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
