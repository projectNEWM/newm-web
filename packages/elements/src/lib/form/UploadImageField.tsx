import { FunctionComponent } from "react";
import { Field, FieldProps } from "formik";
import UploadImage, { UploadImageProps } from "../UploadImage";

interface UploadImageFieldProps
  extends Omit<
    UploadImageProps,
    "file" | "onChange" | "onError" | "onBlur" | "errorMessage"
  > {
  readonly name: string;
}

const UploadImageField: FunctionComponent<UploadImageFieldProps> = ({
  name,
  ...rest
}) => {
  return (
    <Field name={ name }>
      { ({ form, field, meta }: FieldProps) => {
        return (
          <UploadImage
            { ...rest }
            errorMessage={ meta.touched ? meta.error : undefined }
            file={ field.value }
            onBlur={ () => form.setFieldTouched(field.name, true, false) }
            onChange={ (file) => form.setFieldValue(field.name, file) }
            onError={ (error: string) => form.setFieldError(field.name, error) }
          />
        );
      } }
    </Field>
  );
};

export default UploadImageField;
