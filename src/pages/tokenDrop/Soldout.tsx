import { Box, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import { GradientTypography, Typography } from "elements";
import { projectDetails } from "buildParams";
import { MailchimpSubscribeForm } from "components";
import SectionHeading from "components/tokenDrop/SectionHeading";
import theme from "theme";

const Soldout: FunctionComponent = () => (
  <Box display="flex" flexDirection="column">
    <GradientTypography
      sx={ {
        ...theme.typography.emphasized,
        fontSize: 100,
        fontWeight: 400,
        mt: [4, 4, 10],
        p: 0,
      } }
      gradient="company"
      variant="h1"
    >
      Sold out!{ " " }
      <span
        style={ {
          backgroundClip: "inherit",
          backgroundImage:
            "linear-gradient(53.48deg, #FF6E32 0%, #FFC33C 100%)",
        } }
      >
        But...
      </span>
    </GradientTypography>
    <Box mb={ 3.5 } mt={ 1.5 } sx={ { maxWidth: [9999, 9999, 450] } }>
      <Typography variant="subtitle1" color="white">
        { projectDetails.soldout.description }
      </Typography>
    </Box>
    <Stack spacing={ 1 } mb={ 4 } mt={ [4, 4, 10] }>
      <SectionHeading>TELL ME MORE ABOUT THIS DROP!</SectionHeading>
      <MailchimpSubscribeForm
        fId="006275e2f0"
        groupName="group[383765][2]"
        hiddenInputName="b_3bf911620d8791d21fb973749_52df6705d1"
        id="52df6705d1"
        u="3bf911620d8791d21fb973749"
      />
    </Stack>
  </Box>
);

export default Soldout;
