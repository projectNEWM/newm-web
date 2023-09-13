import { FunctionComponent } from "react";
import { Field, FieldProps } from "formik";
import UploadSong from "../UploadSong";

interface UploadSongFieldProps {
  readonly name: string;
}

const UploadSongField: FunctionComponent<UploadSongFieldProps> = ({ name }) => {
  return (
    <Field name={ name }>
      { ({ form, field, meta }: FieldProps) => {
        return (
          <UploadSong
            file={ field.value }
            onChange={ (file) => form.setFieldValue(field.name, file) }
            onError={ (error: string) => form.setFieldError(field.name, error) }
            onBlur={ () => form.setFieldTouched(field.name, true, false) }
            errorMessage={ meta.touched ? meta.error : undefined }
          />
        );
      } }
    </Field>
  );
};

export default UploadSongField;
