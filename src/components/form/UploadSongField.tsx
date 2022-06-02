import { FunctionComponent } from "react";
import { Field, FieldProps } from "formik";
import UploadSong from "../UploadSong";

interface UploadSongFieldProps {
  readonly name: string;
}

const UploadImageField: FunctionComponent<UploadSongFieldProps> = (props) => {
  return (
    <Field name={ props.name }>
      { ({ form, field, meta }: FieldProps) => {
        return (
          <UploadSong
            file={ field.value }
            onChange={ (file) => form.setFieldValue(field.name, file) }
            onError={ (error: string) => form.setFieldError(field.name, error) }
            errorMessage={ meta.touched ? meta.error : undefined }
            onBlur={ () => form.setFieldTouched(field.name) }
          />
        );
      } }
    </Field>
  );
};

export default UploadImageField;
