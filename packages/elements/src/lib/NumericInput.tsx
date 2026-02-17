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
> = ({ type, onChange, ...props }, ref) => {
  return (
    <NumericFormat
      { ...props }
      customInput={ StyledInput }
      getInputRef={ ref }
      thousandSeparator=","
      onChange={ (event) => {
        const value = event.target.value;
        const numberValue = value ? Number(value.replace(/,/g, "")) : "";

        if (onChange) {
          onChange({
            ...event,
            target: {
              ...event.target,
              name: event.target.name,
              value: numberValue as any, // eslint-disable-line
            },
          });
        }
      } }
    />
  );
};

export default forwardRef(NumericInput);
