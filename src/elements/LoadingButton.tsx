import LoadingSpinner from "assets/images/LoadingSpinner";
import { SxProps } from "@mui/material";
import FilledButton from "./styled/FilledButton";

interface LoadingButtonProps {
  label: string;
  isLoading?: boolean;
}

const LoadingButton = ({ label, isLoading = false }: LoadingButtonProps) => {
  return (
    <FilledButton
      type="submit"
      sx={ {
        maxWidth: ["340px", "340px", null],
        minWidth: "100px",
      } }
    >
      { isLoading ? <LoadingSpinner /> : label }
    </FilledButton>
  );
};

export default LoadingButton;
