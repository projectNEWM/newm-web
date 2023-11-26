import { ForwardRefRenderFunction, forwardRef } from 'react';
import { Field, FieldProps } from 'formik';
import { Checkbox } from '@newm.io/studio/elements';
import { CheckboxProps } from '@newm.io/studio/elements/Checkbox';

const CheckboxField: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = (
  props,
  ref: any // eslint-disable-line
) => {
  return (
    <Field name={props.name}>
      {({ field, meta }: FieldProps) => {
        return (
          <Checkbox
            ref={ref}
            errorMessage={meta.touched ? meta.error : ''}
            {...field}
            {...props}
          />
        );
      }}
    </Field>
  );
};

export default forwardRef(CheckboxField);
