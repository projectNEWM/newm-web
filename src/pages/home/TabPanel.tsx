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
    <div { ...other }>
      { value === page && (
        <Box p={ 3 }>
          { children }
        </Box>
      ) }
    </div>
  );
};

export default TabPanel;
