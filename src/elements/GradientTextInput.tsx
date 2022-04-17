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
  readonly textAlign?: "left" | "center" | "right";
}

interface StyledInputElementProps
  extends Omit<HTMLProps<HTMLInputElement>, "as" | "ref"> {
  readonly hasError: boolean;
  readonly textAlign: "left" | "center" | "right";
}

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
  display: flex;
  flex-grow: 1;
  max-width: 100%;
  border-width: 0;
  color: ${(props) =>
    props.hasError ? theme.palette.error.main : "transparent"};
  background-color: ${(props) => (props.hasError ? "none" : theme.colors.red)};
  background: ${(props) => (props.hasError ? "none" : theme.gradients.artist)};
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  text-fill-color: ${(props) =>
    props.hasError ? "currentcolor" : "transparent"};
  -webkit-text-fill-color: ${(props) =>
    props.hasError ? "currentcolor" : "transparent"};
  -moz-text-fill-color: ${(props) =>
    props.hasError ? "currentcolor" : "transparent"};
  caret-color: ${(props) =>
    props.hasError ? theme.palette.error.main : theme.colors.red};
  text-align: ${(props) => props.textAlign};
  font-family: "DM Serif Text";
  font-style: ${theme.typography.xxxl.fontStyle};
  font-weight: 400;
  font-size: ${theme.typography.xxxl.fontSize};
  line-height: ${theme.typography.xxxl.lineHeight};

  &::placeholder {
    color: ${theme.colors.grey100};
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
  { errorMessage, textAlign = "left", ...rest },
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <Stack direction="column" spacing="0">
      <StyledRootElement>
        <StyledInputElement
          hasError={ !!errorMessage }
          textAlign={ textAlign }
          { ...rest }
          ref={ ref }
        />
      </StyledRootElement>

      { !!errorMessage && (
        <Typography
          variant="xs"
          sx={ { color: theme.palette.error.main, textAlign } }
        >
          { errorMessage }
        </Typography>
      ) }
    </Stack>
  );
};

export default forwardRef(GradientTextInput);
