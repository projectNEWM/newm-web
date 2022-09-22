import { FunctionComponent } from "react";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "theme";

interface FilledButtonProps extends ButtonProps {
  isLoading?: boolean;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: number;
}

const FilledButtonMain = styled(Button)`
  border-radius: 7px;
  line-height: ${theme.button.lineHeight};
  color: white;
  font: ${theme.typography.button.font};
  text-transform: none;
  padding: 12px 16px;
  background-color: transparent;
`;

const FilledButton: FunctionComponent<FilledButtonProps> = ({
  children,
  type,
  isLoading = false,
  backgroundColor = theme.gradients.artist,
  fontSize = theme.button.fontSize,
  fontWeight = theme.button.fontWeight,
  disabled,
  sx,
  ...props
}) => {
  return (
    <FilledButtonMain
      type={ type }
      sx={ {
        background: backgroundColor,
        fontSize: fontSize,
        fontWeight: fontWeight,
        opacity: disabled ? 0.5 : 1,
        ...sx,
      } }
      { ...props }
    >
      { isLoading ? (
        <CircularProgress
          disableShrink
          sx={ { color: theme.colors.white } }
          size={ 20 }
        />
      ) : (
        children
      ) }
    </FilledButtonMain>
  );
};

export default FilledButton;
