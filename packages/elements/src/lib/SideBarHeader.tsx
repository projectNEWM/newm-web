import { FunctionComponent } from "react";
import Typography from "./Typography";

interface SideBarHeaderProps {
  readonly children: string;
}

const SideBarHeader: FunctionComponent<SideBarHeaderProps> = ({ children }) => {
  return (
    <Typography variant="h6" color="grey300">
      {children}
    </Typography>
  );
};

export default SideBarHeader;
