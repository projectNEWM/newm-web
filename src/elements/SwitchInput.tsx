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
  includeBorder = true,
  children,
  ...props
}) => {
  const theme = useTheme();

  const borderStyles: SxProps = includeBorder
    ? {
        backgroundColor: theme.colors.grey600,
        border: `2px solid ${theme.colors.grey400}`,
        borderRadius: "4px",
      }
    : {};

  return (
    <Stack sx={ { p: 2, ...borderStyles } }>
      <Stack
        sx={ {
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        } }
      >
        <Stack>
          <Typography pr={ 1 }>{ title }</Typography>

          <Typography pr={ 1 } variant="subtitle2">
            { description }
          </Typography>
        </Stack>

        <Switch { ...props } />
      </Stack>
      { props.checked ? children : null }
    </Stack>
  );
};

export default SwitchInput;
