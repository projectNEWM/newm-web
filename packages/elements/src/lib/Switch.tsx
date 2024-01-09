import { Box, Switch as MuiSwitch, SwitchProps, styled } from "@mui/material";
import { CheckIcon, CloseIcon } from "@newm-web/assets";
import { FunctionComponent } from "react";
import theme from "@newm-web/theme";

interface ToggleIconProps {
  readonly checked: boolean;
}

const StyledSwitch = styled((props: SwitchProps) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    { ...props }
  />
))(() => ({
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      "& + .MuiSwitch-track": {
        background: theme.gradients.music,
        border: 0,
        opacity: 1,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
      color: theme.colors.white,
      transform: "translateX(20px)",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.colors.grey100,
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      border: `6px solid ${theme.colors.white}`,
      color: theme.colors.green,
    },
    margin: 2,
    padding: 0,
    transitionDuration: "300ms",
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
  },
  "& .MuiSwitch-track": {
    background: theme.colors.grey400,
    borderRadius: 26 / 2,
    opacity: 1,
  },
  height: 24,
  padding: 0,
  width: 44,
}));

const ToggleIcon: FunctionComponent<ToggleIconProps> = ({ checked }) => {
  return (
    <Box
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.white,
        borderRadius: "50%",
        display: "flex",
        height: 20,
        justifyContent: "center",
        width: 20,
      } }
    >
      { checked ? <CheckIcon /> : <CloseIcon /> }
    </Box>
  );
};

const Switch: FunctionComponent<SwitchProps> = (props) => {
  return (
    <StyledSwitch
      checkedIcon={ <ToggleIcon checked={ true } /> }
      icon={ <ToggleIcon checked={ false } /> }
      { ...props }
    />
  );
};

export default Switch;
