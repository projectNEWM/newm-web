import { CircularProgress } from "@mui/material";
import theme from "theme";
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
        minHeight: "44px",
      } }
    >
      { isLoading ? (
        <CircularProgress
          disableShrink
          sx={ { color: theme.colors.white } }
          size={ 20 }
        />
      ) : (
        label
      ) }
    </FilledButton>
  );
};

export default LoadingButton;
