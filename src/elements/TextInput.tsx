import {
  FocusEvent,
  ForwardRefRenderFunction,
  ForwardedRef,
  forwardRef,
  useState,
} from "react";
import InputUnstyled, { InputUnstyledProps } from "@mui/base/InputUnstyled";
import { Box, Stack } from "@mui/material";
import styled from "styled-components";
import theme from "theme";
import Typography from "./Typography";

export interface TextInputProps extends Omit<InputUnstyledProps, "helperText"> {
  readonly label?: string;
  readonly errorMessage?: string;
}

const StyledRootElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const StyledInputElement = styled.input`
  display: flex;
  flex-grow: 1;
  background: transparent;
  color: white;
  border-width: 0;
  fontfamily: ${theme.inputField.fontFamily};
  font-size: ${theme.inputField.fontSize};
  font-weight: ${theme.inputField.fontWeight};
  line-height: ${theme.inputField.lineHeight};

  input {
    padding: 0;
  }

  &::placeholder {
    color: ${theme.colors.grey100};
  }

  &:focus {
    outline: none;
  }
`;

const TextInput: ForwardRefRenderFunction<HTMLDivElement, TextInputProps> = (
  { errorMessage, label, onFocus, onBlur, disabled = false, ...rest },
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(!!rest.autoFocus);

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

  return (
    <Stack
      direction="column"
      spacing="4px"
      sx={ { opacity: disabled ? 0.5 : 1 } }
    >
      { !!label && (
        <Typography variant="sm" fontWeight="medium" color="grey100">
          { label }
        </Typography>
      ) }

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        onMouseEnter={ () => setIsHovered(true) }
        onMouseLeave={ () => setIsHovered(false) }
        sx={ {
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
          padding: theme.inputField.padding,
        } }
      >
        <InputUnstyled
          components={ {
            Root: StyledRootElement,
            Input: StyledInputElement,
          } }
          onFocus={ handleFocus }
          onBlur={ handleBlur }
          disabled={ disabled }
          { ...rest }
          ref={ ref }
        />
      </Box>

      { !!errorMessage && (
        <Typography variant="xs" sx={ { color: theme.palette.error.main } }>
          { errorMessage }
        </Typography>
      ) }
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
    return theme.palette.error.main;
  }

  if (isHovered || isFocused) {
    return theme.colors.white;
  }

  return theme.colors.grey400;
};

export default forwardRef(TextInput);
