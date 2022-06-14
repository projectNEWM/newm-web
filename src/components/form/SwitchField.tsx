import { Switch } from "elements";
import { SwitchProps } from "@mui/material";
import { Field, FieldProps } from "formik";
import { FunctionComponent } from "react";

interface SwitchFieldProps extends SwitchProps {
  readonly name: string;
}

const SwitchField: FunctionComponent<SwitchFieldProps> = ({
  name,
  ...props
}) => {
  return (
    <Field name={ name }>
      { ({ form, field }: FieldProps) => (
        <Switch
          checked={ field.value }
          onChange={ () => form.setFieldValue(field.name, !field.value) }
          { ...props }
        />
      ) }
    </Field>
  );
};

export default SwitchField;

// const TextInputField: ForwardRefRenderFunction<
//   HTMLInputElement,
//   TextInputProps
// > = (props, ref) => {
//   return (
//     <Field name={ props.name }>
//       { ({ field, meta }: FieldProps) => (
//         <TextInput
//           errorMessage={ meta.touched ? meta.error : "" }
//           ref={ ref }
//           { ...field }
//           { ...props }
//         />
//       ) }
//     </Field>
//   );
// };
