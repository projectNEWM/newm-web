import {
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

interface TextInputProps extends Omit<InputUnstyledProps, "helperText"> {
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
  min-width: 312px;
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

const StyledErrorMessage = styled.p`
  font-size: 10px;
  font-family: 'Inter';
  color: ${theme.palette.error.main};
`;

const TextField: ForwardRefRenderFunction<HTMLDivElement, TextInputProps> = (
  { errorMessage, label, disabled = false, ...rest },
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(!!rest.autoFocus);

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
          borderWidth: "2px",
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
          onFocus={ () => setIsFocused(true) }
          onBlur={ () => setIsFocused(false) }
          disabled={ disabled }
          { ...rest }
          ref={ ref }
        />
      </Box>

      { !!errorMessage && (
        <StyledErrorMessage>{ errorMessage }</StyledErrorMessage>
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

export default forwardRef(TextField);
