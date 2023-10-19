import { ForwardRefRenderFunction, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import { DropdownSelect, DropdownSelectProps } from "elements";

const DropdownSelectField: ForwardRefRenderFunction<
  HTMLInputElement,
  DropdownSelectProps
> = (props, ref) => (
  <Field name={ props.name }>
    { ({ field, form, meta }: FieldProps) => (
      <DropdownSelect
        { ...field }
        { ...props }
        errorMessage={ meta.touched ? meta.error : "" }
        handleChange={ form.handleChange(props.name) }
        handleFieldBlur={ form.handleBlur }
        ref={ ref }
      />
    ) }
  </Field>
);

export default forwardRef(DropdownSelectField);
