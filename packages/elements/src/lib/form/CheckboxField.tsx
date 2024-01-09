import { ForwardRefRenderFunction, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import Checkbox, { CheckboxProps } from "../Checkbox";

const CheckboxField: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = (
  props,
  ref: any // eslint-disable-line
) => {
  return (
    <Field name={ props.name }>
      { ({ field, meta }: FieldProps) => {
        return (
          <Checkbox
            errorMessage={ meta.touched ? meta.error : "" }
            ref={ ref }
            { ...field }
            { ...props }
          />
        );
      } }
    </Field>
  );
};

export default forwardRef(CheckboxField);
