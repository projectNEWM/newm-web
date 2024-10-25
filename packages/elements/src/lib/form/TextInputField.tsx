import { ChangeEvent, ForwardRefRenderFunction, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import TextInput, { TextInputProps } from "../TextInput";

const TextInputField: ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = (props, ref) => {
  return (
    <Field name={ props.name }>
      { ({ field, form, meta }: FieldProps) => {
        const convertNumberStringToNumber = (value: string) => {
          const isNumStr = value.length > 0 && /^[0-9,.]*$/.test(value);

          return isNumStr ? Number(value.replace(/,/g, "")) : value;
        };

        /**
         * Necessary for the "react-number-format" library's
         * NumericInput component in order to store number input
         * values as numbers instead of strings.
         */
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          const formattedValue = convertNumberStringToNumber(
            event.target.value
          );

          form.setFieldValue(field.name, formattedValue);
        };

        return (
          <TextInput
            errorMessage={ meta.touched ? meta.error : "" }
            ref={ ref }
            { ...field }
            { ...props }
            onChange={ handleChange }
          />
        );
      } }
    </Field>
  );
};

export default forwardRef(TextInputField);
