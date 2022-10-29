import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import theme from "theme";
import { SxProps, styled } from "@mui/material";
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
        <Box>
          <Typography>{ children }</Typography>
        </Box>
      ) }
    </div>
  );
}

const StyledTab = styled(Tab)(() => ({
  background: theme.gradients.crypto,
  "-webkit-background-clip": "text;",
  "-webkit-text-fill-color": "transparent",
}));

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
          maxWidth: "656px",
          borderBottom: `1px solid ${theme.colors.grey600}`,
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
          <StyledTab label={ label1 } { ...a11yProps(0) } />
          <StyledTab label={ label2 } { ...a11yProps(1) } />
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
