import { ForwardRefRenderFunction, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import DropdownSelect, { DropdownSelectProps } from "../DropdownSelect";

const DropdownSelectField: ForwardRefRenderFunction<
  HTMLInputElement,
  DropdownSelectProps
> = (props, ref) => {
  return (
    <Field name={ props.name }>
      { ({ field, form, meta }: FieldProps) => (
        <DropdownSelect
          { ...field }
          { ...props }
          errorMessage={ meta.touched ? meta.error : "" }
          ref={ ref }
          onBlur={ form.handleBlur }
          onValueChange={ (newValue) => {
            // Call the onChange from the Dropdown Select Field
            if (typeof props.onValueChange === "function") {
              props.onValueChange(newValue);
            }
            // Call Formik's handleChange
            const handleFormChange = form.handleChange(props.name);
            handleFormChange(newValue);
          } }
        />
      ) }
    </Field>
  );
};

export default forwardRef(DropdownSelectField);
