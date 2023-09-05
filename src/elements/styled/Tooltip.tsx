import { styled } from "@mui/material/styles";
import MuiTooltip, {
  TooltipProps,
  tooltipClasses,
} from "@mui/material/Tooltip";

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip
    arrow={ true }
    classes={ { popper: className } }
    enterTouchDelay={ 0 }
    leaveDelay={ 200 }
    placement="top"
    { ...props }
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.grey500,
  },
  [`& .${tooltipClasses.tooltipArrow}`]: {
    backgroundColor: theme.colors.grey500,
    borderRadius: "8px",
    fontSize: "14px",
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    a: {
      color: theme.colors.music,
      textDecoration: "none",
    },
  },
}));

export default Tooltip;
