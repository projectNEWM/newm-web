/**
 * Styled tab component for use with MUI Tabs component.
 */

import { Tab as MuiTab, styled } from "@mui/material";

const Tab = styled(MuiTab)(({ theme }) => ({
  backgroundColor: "transparent",
  border: "none",
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.tabs.fontFamily,
  fontWeight: theme.typography.tabs.fontWeight,
  textTransform: "capitalize"
}));

export default Tab;
