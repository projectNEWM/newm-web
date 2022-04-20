import { FunctionComponent } from "react";
import { Box } from "@mui/material";
import NEWMLogo from "assets/images/NEWMLogo";
import { FilledButton, GradientTypography, Link, Typography } from "elements";

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

      <Box mt={ 1 } mb={ 6 }>
        <GradientTypography
          variant="xxxl"
          fontFamily="DM Serif Text"
          fontWeight="regular"
          fontStyle="italic"
        >
          Shall we?
        </GradientTypography>
      </Box>

      <FilledButton type="submit">Enter NEWM</FilledButton>

      <Box mt={ 2 }>
        <Typography fontWeight="medium" color="grey200">
          By proceeding forward you agree to&nbsp;
          <Link to="#" color="grey200" fontWeight="medium">
            projectNEWM’s Terms of Service
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default AddProfileInformation;
