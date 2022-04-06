import { useField } from "formik";
import TextInput from "./TextInput";

interface DateTimePickerProps {
  name: string;
  label: string;
  options: string[];
  size?: "small" | "medium" | undefined;
}

const DatePickerInput = ({ name, ...otherProps }: DateTimePickerProps) => {
  const [field] = useField(name);

  return <TextInput type="date" { ...field } { ...otherProps } />;
};

export default DatePickerInput;
