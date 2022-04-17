import { FormEvent, FunctionComponent } from "react";
import { FastField, FieldProps } from "formik";
import { GradientTextInput, GradientTextInputProps } from "elements";

const GradientTextInputField: FunctionComponent<GradientTextInputProps> = (
  props
) => {
  return (
    <FastField name={ props.name }>
      { ({ field: { onBlur, ...field }, meta }: FieldProps) => {
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
            errorMessage={ meta.touched ? meta.error : "" }
            onBlur={ handleBlur }
            { ...field }
            { ...props }
          />
        );
      } }
    </FastField>
  );
};

export default GradientTextInputField;
