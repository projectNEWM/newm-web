import { FunctionComponent } from "react";
import { Field, FieldProps } from "formik";
import UploadImage from "../UploadImage";

interface UploadImageFieldProps {
  readonly name: string;
}

const UploadImageField: FunctionComponent<UploadImageFieldProps> = ({
  name,
}) => {
  return (
    <Field name={ name }>
      { ({ form, field, meta }: FieldProps) => {
        return (
          <UploadImage
            file={ field.value }
            onChange={ (file) => form.setFieldValue(field.name, file) }
            onError={ (error: string) => form.setFieldError(field.name, error) }
            onBlur={ () => form.setFieldTouched(field.name) }
            errorMessage={ meta.touched ? meta.error : undefined }
          />
        );
      } }
    </Field>
  );
};

export default UploadImageField;
