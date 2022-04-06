import { FunctionComponent } from "react";
import { Field, FieldProps } from "formik";
import { GradientTextInput, GradientTextInputProps } from "elements";

const GradientTextInputField: FunctionComponent<GradientTextInputProps> = (
  props
) => {
  return (
    <Field name={ props.name }>
      { ({ field, meta }: FieldProps) => (
        <GradientTextInput
          errorMessage={ meta.touched ? meta.error : "" }
          { ...field }
          { ...props }
        />
      ) }
    </Field>
  );
};

export default GradientTextInputField;
