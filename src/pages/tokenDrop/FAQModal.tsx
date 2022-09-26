import { Box, Stack, Typography } from "@mui/material";
import theme from "theme";
import { projectDetails } from "buildParams";
import { MailchimpSubscribeForm } from "components";

const FAQModal = () => {
  const { faq } = projectDetails;

  return (
    <Box sx={ { textAlign: "left" } }>
      <Typography component="h3" sx={ { marginTop: 0.5 } } variant="h3">
        F.A.Q
      </Typography>
      { faq.map(({ answer, question }, idx) => (
        <Stack key={ `question-${idx}` } sx={ { gap: 1, mt: 4 } }>
          <Typography
            sx={ {
              color: theme.colors.grey100,
              fontFamily: "Raleway",
              fontSize: "16px",
              fontWeight: theme.typography.fontWeightBold,
            } }
          >
            { question }
          </Typography>
          <Typography
            sx={ { fontSize: "16px", color: theme.colors.white } }
            variant="subtitle1"
          >
            { answer }
          </Typography>
        </Stack>
      )) }
      <Stack mt={ 1.5 }>
        <MailchimpSubscribeForm
          u="3bf911620d8791d21fb973749"
          id="52df6705d1"
          fId="006275e2f0"
          hiddenInputName="b_3bf911620d8791d21fb973749_52df6705d1"
          groupName="group[383765][2]"
        />
      </Stack>
    </Box>
  );
};

export default FAQModal;
