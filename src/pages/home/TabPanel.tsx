import { Box } from "@mui/material";
import { Page } from "common";

interface TabPanelProps {
  value: Page;
  page: Page;
  children: React.ReactNode;
}

const TabPanel = ({
  children,
  value,
  page,
  ...other
}: TabPanelProps) => {
  return (
    <Box { ...other }>
      { value === page && (
        <Box px={ 3 } pt={ 1 }>
          { children }
        </Box>
      ) }
    </Box>
  );
};

export default TabPanel;
