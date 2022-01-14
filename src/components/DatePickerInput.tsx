import { useField } from "formik";
import { StyledTextField } from "./StyledComponents";

interface DateTimePickerProps {
  name: string;
  label: string;
  options: string[];
  size?: "small" | "medium" | undefined;
}

const DatePickerInput = ({ name, ...otherProps }: DateTimePickerProps) => {
  const [field] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    InputLabelProps: {
      shrink: true,
    },
    type: "date",
  };

  return <StyledTextField { ...configDateTimePicker } />;
};

export default DatePickerInput;
