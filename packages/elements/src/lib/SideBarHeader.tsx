import { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import theme from "@newm-web/theme";
interface SideBarHeaderProps {
  readonly children: string;
}

const SideBarHeader: FunctionComponent<SideBarHeaderProps> = ({ children }) => {
  return (
    <Typography color={ theme.colors.grey300 } variant="h6">
      { children }
    </Typography>
  );
};

export default SideBarHeader;
