import {
  ChangeEvent,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import { NumericFormat } from "react-number-format";
import StyledInput from "./styled/Input";

interface NumericInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue"
  > {
  readonly defaultValue: string | number | null | undefined;
  readonly value: string | number | null | undefined;
}

/**
 * Replacement for an input component with a type of "number"
 * that handles formatting the displayed value.
 */
export const NumericInput: ForwardRefRenderFunction<
  HTMLInputElement,
  NumericInputProps
> = ({ type, onChange, ...props }, ref) => {
  /**
   * Removes any commas that were added when formatting the
   * input value and then calls the onChange prop.
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const formattedValue = event.target.value.replace(/,/g, "");

      event.target.value = formattedValue;

      onChange(event);
    }
  };

  return (
    <NumericFormat
      { ...props }
      customInput={ StyledInput }
      getInputRef={ ref }
      thousandSeparator=","
      onChange={ handleChange }
    />
  );
};

export default forwardRef(NumericInput);
