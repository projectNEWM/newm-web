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
        return (
          <TextInput
            errorMessage={ meta.touched ? meta.error : "" }
            ref={ ref }
            { ...field }
            { ...props }
          />
        );
      } }
    </Field>
  );
};

export default forwardRef(TextInputField);
