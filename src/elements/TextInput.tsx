import {
  FocusEvent,
  ForwardRefRenderFunction,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import { useInput } from "@mui/base";
import { Box, Stack } from "@mui/material";
import styled from "styled-components";
import theme from "theme";
import Typography from "./Typography";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label?: string;
  readonly errorMessage?: string;
  readonly startAdornment?: JSX.Element;
  readonly endAdornment?: JSX.Element;
}

const StyledRootElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding: ${theme.inputField.padding};
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
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
  padding: ${theme.inputField.padding};
  padding-right: 0;

  &::placeholder {
    color: ${theme.colors.grey100};
  }

  &:focus {
    outline: none;
  }
`;

export const TextInput: ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = (props, ref: ForwardedRef<HTMLInputElement>) => {
  const { getRootProps, getInputProps } = useInput(props, ref);

  const {
    errorMessage,
    label,
    onFocus,
    onBlur,
    startAdornment,
    endAdornment,
    disabled = false,
    ...rest
  } = props;

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
        } }
      >
        <StyledRootElement { ...getRootProps() }>
          { startAdornment }

          <StyledInputElement
            { ...getInputProps() }
            { ...rest }
            onFocus={ handleFocus }
            onBlur={ handleBlur }
            disabled={ disabled }
          />

          { endAdornment }
        </StyledRootElement>
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
