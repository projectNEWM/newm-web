import { FunctionComponent } from "react";
import { Field, FieldProps } from "formik";
import { DropdownSelect, DropdownSelectProps } from "elements";

const DropdownSelectField: FunctionComponent<DropdownSelectProps> = (props) => {
  return (
    <Field name={ props.name }>
      { ({ field, meta }: FieldProps) => (
        <DropdownSelect
          errorMessage={ meta.touched ? meta.error : "" }
          { ...field }
          { ...props }
        />
      ) }
    </Field>
  );
};

export default DropdownSelectField;
