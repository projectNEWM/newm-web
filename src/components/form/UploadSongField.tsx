import { FunctionComponent, useEffect, useState } from "react";
import { Field, FieldProps, useFormikContext } from "formik";
import UploadSong from "../UploadSong";

interface UploadSongFieldProps {
  readonly name: string;
}

const UploadSongField: FunctionComponent<UploadSongFieldProps> = ({ name }) => {
  //isValidationTriggered is used to work between required and custom errors
  const [isValidationTriggered, setIsValidationTriggered] = useState(false);

  const form = useFormikContext();

  useEffect(() => {
    if (!isValidationTriggered && (form.isSubmitting || form.isValidating)) {
      setIsValidationTriggered(true);
    }
  }, [form.isSubmitting, form.isValidating, isValidationTriggered]);

  return (
    <Field name={ name }>
      { ({ form, field, meta }: FieldProps) => {
        return (
          <UploadSong
            file={ field.value }
            onChange={ (file) => form.setFieldValue(field.name, file) }
            onBlur={ () => form.setFieldTouched(field.name) }
            errorMessage={ meta.touched ? meta.error : undefined }
            isValidationTriggered={ isValidationTriggered }
            resetValidationTrigger={ () => setIsValidationTriggered(false) }
          />
        );
      } }
    </Field>
  );
};

export default UploadSongField;
