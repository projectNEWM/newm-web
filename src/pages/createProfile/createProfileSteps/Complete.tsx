import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import NEWMLogo from "assets/images/NEWMLogo";
import { GradientTypography, Typography } from "elements";

const AddProfileInformation: FunctionComponent = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mb={ 4 } alignSelf="center">
        <NEWMLogo />
      </Box>

      <Typography
        align="center"
        fontWeight="extra-bold"
        variant="xxxl"
        fontFamily="Raleway"
      >
        Aaaaand we&apos;re done.
      </Typography>

      <Box mt={ 1 }>
        <GradientTypography
          variant="xxxl"
          fontFamily="DM Serif Text"
          fontWeight="regular"
          fontStyle="italic"
        >
          Shall we?
        </GradientTypography>
      </Box>
    </Box>
  );
};

export default AddProfileInformation;
