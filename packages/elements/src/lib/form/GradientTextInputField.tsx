import { FormEvent, ForwardRefRenderFunction, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import {
  GradientTextInput,
  GradientTextInputProps
} from "@newm-web/elements";

const GradientTextInputField: ForwardRefRenderFunction<
  HTMLInputElement,
  GradientTextInputProps
> = (props, ref) => {
  return (
    <Field name={props.name}>
      {({ field: { onBlur, ...field }, meta }: FieldProps) => {
        /**
         * Add a slight delay to the on blur functionality because
         * validations used in the app for this field can be slow.
         * This ensures any resolved errors can be cleared before
         * the input is marked as blurred.
         */
        const handleBlur = (event: FormEvent) => {
          setTimeout(() => {
            onBlur(event);
          }, 100);
        };

        return (
          <GradientTextInput
            errorMessage={meta.touched ? meta.error : ""}
            onBlur={handleBlur}
            ref={ref}
            {...field}
            {...props}
          />
        );
      }}
    </Field>
  );
};

export default forwardRef(GradientTextInputField);
