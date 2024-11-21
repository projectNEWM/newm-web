import { SwitchProps } from "@mui/material";
import { Field, FieldProps } from "formik";
import { FunctionComponent, ReactNode } from "react";
import SwitchInput from "../SwitchInput";

interface SwitchInputFieldProps extends SwitchProps {
  readonly children?: ReactNode;
  readonly description?: string;
  readonly includeBorder?: boolean;
  readonly name: string;
  readonly title: string;
  readonly toggleTooltipText?: string;
  readonly tooltipText?: string;
}

const SwitchInputField: FunctionComponent<SwitchInputFieldProps> = ({
  name,
  ...props
}) => {
  return (
    <Field name={ name }>
      { ({ form, field }: FieldProps) => (
        <SwitchInput
          checked={ field.value }
          onChange={ () => form.setFieldValue(field.name, !field.value) }
          { ...props }
        />
      ) }
    </Field>
  );
};

export default SwitchInputField;
