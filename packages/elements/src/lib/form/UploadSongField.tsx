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
            errorMessage={ meta.touched ? meta.error : undefined }
            file={ field.value }
            onBlur={ () => form.setFieldTouched(field.name, true, false) }
            onChange={ (file) => form.setFieldValue(field.name, file) }
            onError={ (error) => form.setFieldError(field.name, error) }
          />
        );
      } }
    </Field>
  );
};

export default UploadSongField;
