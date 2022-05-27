import { FunctionComponent } from "react";
import { Typography } from "elements";

interface SideBarHeaderProps {
  readonly children: string;
}

const SideBarHeader: FunctionComponent<SideBarHeaderProps> = ({ children }) => {
  return (
    <Typography variant="h6" fontWeight="bold" color="grey300">
      { children }
    </Typography>
  );
};

export default SideBarHeader;
