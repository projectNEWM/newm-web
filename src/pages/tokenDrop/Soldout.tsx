import { Box, Stack } from "@mui/material";
import { FunctionComponent } from "react";
import { GradientTypography, Typography } from "elements";
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
        There&apos;s more where that came from! This Sample Sale was a
        successful first step towards our bigger vision of building a fair music
        ecosystem for artists and music lovers. To get the latest updates on our
        project and future drops (like this one), sign up to our newsletter.
      </Typography>
    </Box>

    <Stack spacing={ 1 } mb={ 4 } mt={ 4 }>
      <SectionHeading>TELL ME MORE ABOUT THIS DROP!</SectionHeading>
      <MailchimpSubscribeForm
        fId="000e7ae2f0"
        groupValue="4"
        groupName="group[380982][4]"
        hiddenInputName="b_3bf911620d8791d21fb973749_460ff42d47"
        id="460ff42d47"
        u="3bf911620d8791d21fb973749"
      />
    </Stack>
  </Box>
);

export default Soldout;
