import { FunctionComponent } from "react";
import { Skeleton, Stack } from "@mui/material";
import theme from "@newm-web/theme";

const MarketplaceTabSkeleton: FunctionComponent = () => (
  <>
    <Skeleton height={ 100 } />
    <Stack
      sx={ {
        flexDirection: ["column", "column", "row"],
        flexWrap: "wrap",
        justifyContent: "space-between",
      } }
    >
      <Skeleton height={ 70 } sx={ { minWidth: theme.inputField.maxWidth } } />
      <Skeleton height={ 70 } sx={ { minWidth: theme.inputField.maxWidth } } />
      <Skeleton height={ 70 } sx={ { minWidth: theme.inputField.maxWidth } } />
      <Skeleton height={ 70 } sx={ { minWidth: theme.inputField.maxWidth } } />
    </Stack>
  </>
);
export default MarketplaceTabSkeleton;
