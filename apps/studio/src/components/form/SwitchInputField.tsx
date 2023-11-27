import { SwitchProps } from "@mui/material";
import { Field, FieldProps } from "formik";
import { FunctionComponent, ReactNode } from "react";
import SwitchInput from "@newm.io/studio/elements/SwitchInput";

interface SwitchInputFieldProps extends SwitchProps {
  readonly name: string;
  readonly title: string;
  readonly description?: string;
  readonly includeBorder?: boolean;
  readonly tooltipText?: string;
  readonly children?: ReactNode;
}

const SwitchInputField: FunctionComponent<SwitchInputFieldProps> = ({
  name,
  ...props
}) => {
  return (
    <Field name={name}>
      {({ form, field }: FieldProps) => (
        <SwitchInput
          checked={field.value}
          onChange={() => form.setFieldValue(field.name, !field.value)}
          {...props}
        />
      )}
    </Field>
  );
};

export default SwitchInputField;
