import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { TextInputField } from "components";

interface PasswordInputFieldProps {
  readonly ariaLabel?: string;
  readonly endAdornmentHandler?: () => void;
  readonly externalMaskPassword?: boolean;
  readonly name: string;
  readonly placeholder?: string;
  readonly showEndAdornment?: boolean;
}

const PasswordInputField: FunctionComponent<PasswordInputFieldProps> = ({
  ariaLabel = "Password input field",
  endAdornmentHandler,
  externalMaskPassword = true,
  name,
  placeholder = "Password",
  showEndAdornment = true,
}) => {
  const theme = useTheme();
  const [internalMaskPassword, setInternalMaskPassword] = useState(true);

  const isMasked = endAdornmentHandler ? externalMaskPassword : internalMaskPassword;
  const PasswordIcon = isMasked ? VisibilityIcon : VisibilityOffIcon;

  /**
   * If no endAdornmentHandler is passed, this will handle the show/hide password
   */
  const togglePasswordMask = () => {
    setInternalMaskPassword(!internalMaskPassword);
  };

  return (
    <TextInputField
      aria-label={ ariaLabel }
      endAdornment={
        showEndAdornment ? (
          <IconButton
            aria-label="Change password field visible status"
            onClick={ endAdornmentHandler || togglePasswordMask }
          >
            <PasswordIcon sx={ { color: theme.colors.white } } />
          </IconButton>
        ) : undefined
      }
      name={ name }
      placeholder={ placeholder }
      type={ isMasked ? "password" : "text" }
    />
  );
};

export default PasswordInputField;
