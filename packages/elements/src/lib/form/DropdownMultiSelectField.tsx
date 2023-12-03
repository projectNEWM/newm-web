import { ForwardRefRenderFunction, SyntheticEvent, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import {
  DropdownMultiSelect,
  DropdownSelectProps
} from "@newm-web/elements";

const DropdownMultiSelectField: ForwardRefRenderFunction<
  HTMLInputElement,
  DropdownSelectProps
> = (props, ref) => (
  <Field name={props.name}>
    {({ field, form, meta }: FieldProps) => (
      <DropdownMultiSelect
        {...field}
        {...props}
        errorMessage={meta.touched ? meta.error : ""}
        handleBlur={form.handleBlur}
        handleChange={(event: SyntheticEvent, value: ReadonlyArray<string>) => {
          form.setFieldValue(field.name, value);
        }}
        ref={ref}
      />
    )}
  </Field>
);

export default forwardRef(DropdownMultiSelectField);
