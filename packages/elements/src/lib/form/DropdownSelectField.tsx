import { ForwardRefRenderFunction, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import DropdownSelect, { DropdownSelectProps } from "../DropdownSelect";

const DropdownSelectField: ForwardRefRenderFunction<
  HTMLInputElement,
  DropdownSelectProps
> = (props, ref) => (
  <Field name={props.name}>
    {({ field, form, meta }: FieldProps) => (
      <DropdownSelect
        {...field}
        {...props}
        errorMessage={meta.touched ? meta.error : ""}
        handleBlur={form.handleBlur}
        handleChange={form.handleChange(props.name)}
        ref={ref}
      />
    )}
  </Field>
);

export default forwardRef(DropdownSelectField);
