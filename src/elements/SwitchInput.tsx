import { Switch, Tooltip, Typography } from "elements";
import {
  IconButton,
  Stack,
  SwitchProps,
  SxProps,
  useTheme,
} from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import HelpIcon from "@mui/icons-material/Help";

export interface SwitchInputProps extends SwitchProps {
  readonly title: string;
  readonly description?: string;
  readonly includeBorder?: boolean;
  readonly tooltipText?: string;
  readonly children?: ReactNode;
}

/**
 * Switch toggle with a title, description, and optional border.
 */
const SwitchInput: FunctionComponent<SwitchInputProps> = ({
  title,
  description,
  includeBorder = true,
  tooltipText = "",
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
        <Stack display="flex" flexDirection="row" gap={ 0.75 } pr={ [0, 0, 4] }>
          <Typography
            pr={ 1 }
            color="white"
            variant={ description ? "body1" : "subtitle1" }
          >
            { title }
          </Typography>

          { !!tooltipText && (
            <Tooltip title={ tooltipText }>
              <IconButton sx={ { padding: 0 } }>
                <HelpIcon
                  sx={ {
                    color: theme.colors.grey100,
                    height: "18px",
                    width: "18px",
                  } }
                />
              </IconButton>
            </Tooltip>
          ) }
        </Stack>

        <Typography pr={ 1 } variant="subtitle2">
          { description }
        </Typography>

        <Switch { ...props } />
      </Stack>
      { props.checked ? children : null }
    </Stack>
  );
};

export default SwitchInput;
