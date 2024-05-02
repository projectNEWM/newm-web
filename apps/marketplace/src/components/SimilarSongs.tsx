import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import Songs from "./Songs";
import { mockSales } from "../temp/data";

const MoreSongs: FunctionComponent = () => {
  return (
    <Box mb={ 8 } mt={ 16 }>
      <Songs sales={ mockSales } title="SIMILAR SONGS" />
    </Box>
  );
};

export default MoreSongs;
