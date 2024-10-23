import { ForwardRefRenderFunction, forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import StyledInput from "./styled/Input";

/**
 * Replacement for an input component with a type of "number"
 * that handles formatting the displayed value.
 */
export const NumericInput: ForwardRefRenderFunction<
  HTMLInputElement,
  NumericFormatProps
> = ({ type, ...props }, ref) => {
  return (
    <NumericFormat
      { ...props }
      customInput={ StyledInput }
      getInputRef={ ref }
      thousandSeparator=","
    />
  );
};

export default forwardRef(NumericInput);
