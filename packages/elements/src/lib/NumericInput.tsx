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
   * Converts the event target's value to a number
   * and calls the onChange prop.
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const value = event.target.value;
      const numberValue = value ? Number(value.replace(/,/g, "")) : null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newTarget = event.target as any;
      newTarget.value = numberValue;
      event.target = newTarget;

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
