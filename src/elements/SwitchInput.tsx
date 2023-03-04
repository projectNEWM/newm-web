import { Switch, Typography } from "elements";
import { Stack, SwitchProps, SxProps, useTheme } from "@mui/material";
import { FunctionComponent } from "react";

export interface SwitchInputProps extends SwitchProps {
  readonly title: string;
  readonly description: string;
  readonly includeBorder?: boolean;
}

/**
 * Switch toggle with a title, description, and optional border.
 */
const SwitchInput: FunctionComponent<SwitchInputProps> = ({
  title,
  description,
  sx,
  includeBorder = true,
  ...props
}) => {
  const theme = useTheme();

  const baseStyles: SxProps = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    p: 2,
  };

  const borderStyles: SxProps = {
    backgroundColor: theme.colors.grey600,
    border: `2px solid ${theme.colors.grey400}`,
    borderRadius: "4px",
  };

  const styles = includeBorder
    ? {
        ...baseStyles,
        ...borderStyles,
      }
    : baseStyles;

  return (
    <Stack sx={ { ...styles, ...sx } }>
      <Stack>
        <Typography pr={ 1 }>{ title }</Typography>

        <Typography pr={ 1 } variant="subtitle2">
          { description }
        </Typography>
      </Stack>

      <Switch { ...props } />
    </Stack>
  );
};

export default SwitchInput;
