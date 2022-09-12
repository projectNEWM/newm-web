import {
  ForwardRefRenderFunction,
  ForwardedRef,
  HTMLProps,
  forwardRef,
} from "react";
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";
import Typography from "./Typography";

export interface GradientTextInputProps
  extends Omit<HTMLProps<HTMLInputElement>, "as" | "ref"> {
  readonly errorMessage?: string;
  readonly helperText?: string;
  readonly textAlign?: "left" | "center" | "right";
}

interface StyledInputElementProps
  extends Omit<HTMLProps<HTMLInputElement>, "as" | "ref"> {
  readonly hasError: boolean;
  readonly textAlign: "left" | "center" | "right";
}

const mdBreakpoint = theme.breakpoints.down("md");
const mdBreakpointStyles = theme.typography.h1[
  mdBreakpoint
] as typeof theme.typography.h1;

const StyledRootElement = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

/**
 * Styled input element with text that has a gradient, or the
 * color red if an error is present.
 */
const StyledInputElement = styled("input")<StyledInputElementProps>`
  position: relative;
  display: flex;
  flex-grow: 1;
  max-width: 100%;
  border-width: 0;
  color: ${(props) =>
    props.hasError ? theme.palette.error.main : "transparent"};
  background-color: ${(props) => (props.hasError ? "none" : theme.colors.red)};
  background: ${(props) => (props.hasError ? "none" : theme.gradients.artist)};
  background-clip: text;
  text-fill-color: ${(props) =>
    props.hasError ? "currentcolor" : "transparent"};
  caret-color: ${(props) =>
    props.hasError ? theme.palette.error.main : theme.colors.purple};
  text-align: ${(props) => props.textAlign};
  font-size: ${theme.typography.h1.fontSize};
  line-height: ${theme.typography.h1.lineHeight};
  font-family: ${theme.typography.emphasized.fontFamily};
  font-style: ${theme.typography.emphasized.fontStyle};
  font-weight: ${theme.typography.emphasized.fontWeight};
  text-shadow: 0 0 transparent;

  &::placeholder {
    color: ${theme.colors.grey300};
    text-fill-color: ${theme.colors.grey300};
  }

  input {
    padding: 0;
  }

  &:focus {
    outline: none;
  }
`;

const GradientTextInput: ForwardRefRenderFunction<
  HTMLInputElement,
  GradientTextInputProps
> = (
  { errorMessage, helperText, textAlign = "left", ...rest },
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <Stack direction="column" spacing="0">
      <StyledRootElement>
        <StyledInputElement
          hasError={ !!errorMessage }
          textAlign={ textAlign }
          autoCorrect="off"
          spellCheck="false"
          autoComplete="off"
          { ...rest }
          ref={ ref }
        />
      </StyledRootElement>

      { errorMessage ? (
        <Typography
          variant="h5"
          textAlign={ textAlign }
          sx={ { color: theme.palette.error.main } }
        >
          { errorMessage }
        </Typography>
      ) : helperText ? (
        <Typography variant="h5" textAlign={ textAlign } color="grey100">
          { helperText }
        </Typography>
      ) : undefined }
    </Stack>
  );
};

export default forwardRef(GradientTextInput);
