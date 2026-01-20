import { FunctionComponent, ReactNode } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Button, ButtonProps } from "@newm-web/elements";
import theme from "@newm-web/theme";

export interface ActionMenuTriggerProps
  extends Omit<ButtonProps, "children" | "variant" | "width"> {
  readonly ariaLabel?: string;
  readonly icon?: ReactNode;
}

const ActionMenuTrigger: FunctionComponent<ActionMenuTriggerProps> = ({
  ariaLabel = "Open actions",
  icon = <MoreVertIcon sx={ { color: theme.colors.music } } />,
  onClick,
  sx,
}) => {
  return (
    <Button
      aria-label={ ariaLabel }
      sx={ sx }
      variant="secondary"
      width="icon"
      onClick={ onClick }
    >
      { icon }
    </Button>
  );
};

export default ActionMenuTrigger;
