import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import NEWMLogo from "assets/images/NEWMLogo";
import { Typography } from "elements";

const AddProfileInformation: FunctionComponent = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mb={ 4 } alignSelf="center">
        <NEWMLogo />
      </Box>

      <Typography align="center" fontWeight="extra-bold" variant="xxxl">
        Aaaaand we&apos;re done.
      </Typography>
    </Box>
  );
};

export default AddProfileInformation;
