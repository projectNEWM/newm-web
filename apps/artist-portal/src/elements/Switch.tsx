import { Box, Switch as MuiSwitch, SwitchProps, styled } from "@mui/material";
import CheckIcon from "@newm.io/studio/assets/images/CheckIcon";
import CloseIcon from "@newm.io/studio/assets/images/CloseIcon";
import { FunctionComponent } from "react";
import theme from "@newm.io/theme";

interface ToggleIconProps {
  readonly checked: boolean;
}

const StyledSwitch = styled((props: SwitchProps) => (
  <MuiSwitch focusVisibleClassName=".Mui-focusVisible" disableRipple { ...props } />
))(() => ({
  width: 44,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      color: theme.colors.white,
      transform: "translateX(20px)",
      "& + .MuiSwitch-track": {
        background: theme.gradients.music,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: theme.colors.green,
      border: `6px solid ${theme.colors.white}`,
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.colors.grey100,
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    background: theme.colors.grey400,
    opacity: 1,
  },
}));

const ToggleIcon: FunctionComponent<ToggleIconProps> = ({ checked }) => {
  return (
    <Box
      sx={ {
        display: "flex",
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: theme.colors.white,
      } }
    >
      { checked ? <CheckIcon /> : <CloseIcon /> }
    </Box>
  );
};

const Switch: FunctionComponent<SwitchProps> = (props) => {
  return <StyledSwitch icon={ <ToggleIcon checked={ false } /> } checkedIcon={ <ToggleIcon checked={ true } /> } { ...props } />;
};

export default Switch;
