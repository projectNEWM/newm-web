import { FunctionComponent } from "react";
import Typography from "./Typography";

interface SideBarHeaderProps {
  readonly children: string;
}

const SideBarHeader: FunctionComponent<SideBarHeaderProps> = ({ children }) => {
  return (
    <Typography color="grey300" variant="h6">
      { children }
    </Typography>
  );
};

export default SideBarHeader;
