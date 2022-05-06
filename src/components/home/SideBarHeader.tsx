import { FunctionComponent } from "react";
import { Typography } from "elements";

interface SideBarHeaderProps {
  readonly children: string;
}

const SideBarHeader: FunctionComponent<SideBarHeaderProps> = ({ children }) => {
  return (
    <Typography variant="xxs" fontWeight="bold" color="grey300">
      { children }
    </Typography>
  );
};

export default SideBarHeader;
