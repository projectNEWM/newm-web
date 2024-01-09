import { ForwardRefRenderFunction, forwardRef } from "react";
import { Field, FieldProps } from "formik";
import TextArea, { TextAreaProps } from "../TextArea";

const TextAreaField: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = (props, ref) => {
  return (
    <Field name={ props.name }>
      { ({ field, meta }: FieldProps) => {
        return (
          <TextArea
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

export default forwardRef(TextAreaField);
