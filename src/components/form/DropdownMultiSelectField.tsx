import { ForwardRefRenderFunction, SyntheticEvent, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import { DropdownMultiSelect, DropdownSelectProps } from "elements";

const DropdownMultiSelectField: ForwardRefRenderFunction<
  HTMLInputElement,
  DropdownSelectProps
> = (props, ref) => (
  <Field name={ props.name }>
    { ({ field, form, meta }: FieldProps) => (
      <DropdownMultiSelect
        { ...field }
        { ...props }
        errorMessage={ meta.touched ? meta.error : "" }
        handleChange={ (event: SyntheticEvent, value: ReadonlyArray<string>) => {
          form.setFieldValue(field.name, value);
        } }
        handleBlur={ form.handleBlur }
        ref={ ref }
      />
    ) }
  </Field>
);

export default forwardRef(DropdownMultiSelectField);
