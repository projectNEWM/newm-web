import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import theme from "theme";
import { SxProps } from "@mui/material";
import { FunctionComponent } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabbedContainerProps {
  sx?: SxProps;
  label1: string;
  label2: string;
  Component1: FunctionComponent;
  Component2: FunctionComponent;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `tabpanel-${index}` }
      aria-labelledby={ `tab-${index}` }
      { ...other }
    >
      { value === index && (
        <Box sx={ { p: 3 } }>
          <Typography>{ children }</Typography>
        </Box>
      ) }
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export function TabbedContainer({
  sx,
  label1,
  label2,
  Component1,
  Component2,
}: TabbedContainerProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={ sx }>
      <Box
        sx={ {
          color: theme.colors.blue,
        } }
      >
        <Tabs
          textColor="inherit"
          TabIndicatorProps={ {
            style: { backgroundColor: theme.colors.blue },
          } }
          value={ value }
          onChange={ handleChange }
        >
          <Tab label={ label1 } { ...a11yProps(0) } />
          <Tab label={ label2 } { ...a11yProps(1) } />
        </Tabs>
      </Box>
      <TabPanel value={ value } index={ 0 }>
        <Component1 />
      </TabPanel>
      <TabPanel value={ value } index={ 1 }>
        <Component2 />
      </TabPanel>
    </Box>
  );
}

export default TabbedContainer;
