import { ForwardRefRenderFunction, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import { TextInput, TextInputProps } from "@newm.io/studio/elements";

const TextInputField: ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = (props, ref) => {
  return (
    <Field name={props.name}>
      {({ field, meta }: FieldProps) => (
        <TextInput
          errorMessage={meta.touched ? meta.error : ""}
          ref={ref}
          {...field}
          {...props}
        />
      )}
    </Field>
  );
};

export default forwardRef(TextInputField);
