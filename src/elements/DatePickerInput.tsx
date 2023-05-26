import { useField } from "formik";
import TextInput, { TextInputProps } from "./TextInput";

interface DateTimePickerProps extends TextInputProps {
  name: string;
  label: string;
  options: string[];
}

const DatePickerInput = ({ name, ...otherProps }: DateTimePickerProps) => {
  const [field] = useField(name);

  return <TextInput type="date" { ...field } { ...otherProps } />;
};

export default DatePickerInput;
