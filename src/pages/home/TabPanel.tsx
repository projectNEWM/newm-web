import { Box } from "@mui/material";
import { TabName } from "modules/ui";

interface TabPanelProps {
  children: React.ReactNode;
  tab: TabName;
  value: TabName;
}

const TabPanel = ({
  children,
  value,
  tab,
  ...other
}: TabPanelProps) => {
  return (
    <Box { ...other }>
      { value === tab && (
        <Box pt={ 1 }>
          { children }
        </Box>
      ) }
    </Box>
  );
};

export default TabPanel;
