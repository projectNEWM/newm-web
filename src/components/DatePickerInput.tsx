import { useField } from "formik";
import { TextField } from "./TextField";

interface DateTimePickerProps {
  name: string;
  label: string;
  options: string[];
  size?: "small" | "medium" | undefined;
}

const DatePickerInput = ({ name, ...otherProps }: DateTimePickerProps) => {
  const [field] = useField(name);

  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      type="date"
      {...field}
      {...otherProps}
    />
  );
};

export default DatePickerInput
