import { Box } from "@mui/material";
import { Page } from "common";

interface TabPanelProps {
  children: React.ReactNode;
  page: Page;
  value: Page;
}

const TabPanel = ({
  children,
  value,
  page,
  ...other
}: TabPanelProps) => {
  return (
    <Box { ...other } px={ { sm: 0, md: 3 } }>
      { value === page && (
        <Box pt={ 1 }>
          { children }
        </Box>
      ) }
    </Box>
  );
};

export default TabPanel;
