import {
  IconButton,
  Stack,
  SwitchProps,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import HelpIcon from "@mui/icons-material/Help";
import Switch from "./Switch";
import Tooltip from "./styled/Tooltip";

export interface SwitchInputProps extends SwitchProps {
  readonly children?: ReactNode;
  readonly description?: string;
  readonly includeBorder?: boolean;
  readonly title: string;
  readonly tooltipText?: string;
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
        <Stack pr={ [0, 0, 4] }>
          <Stack display="flex" flexDirection="row">
            <Typography
              color={ theme.colors.white }
              pr={ 1 }
              variant={ description ? "body1" : "subtitle1" }
            >
              { title }
            </Typography>

            { !!tooltipText && (
              <Tooltip title={ tooltipText }>
                <IconButton sx={ { padding: [1, 1, 0] } }>
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

          { !!description && (
            <Typography pr={ 1 } pt={ 0.75 } variant="subtitle2">
              { description }
            </Typography>
          ) }
        </Stack>
        <Switch { ...props } />
      </Stack>
      { props.checked ? children : null }
    </Stack>
  );
};

export default SwitchInput;
