import { FunctionComponent } from "react";
import { Field, FieldProps } from "formik";
import { TextInput, TextInputProps } from "elements";

const TextInputField: FunctionComponent<TextInputProps> = (props) => {
  return (
    <Field name={ props.name }>
      { ({ field, meta }: FieldProps) => (
        <TextInput
          errorMessage={ meta.touched ? meta.error : "" }
          { ...field }
          { ...props }
        />
      ) }
    </Field>
  );
};

export default TextInputField;
