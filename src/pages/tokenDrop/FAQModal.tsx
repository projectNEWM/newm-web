import { Box, Stack, Typography } from "@mui/material";
import theme from "theme";
import { projectDetails } from "buildParams";

const FAQModal = () => {
  const { faq } = projectDetails;

  return (
    <Box sx={ { textAlign: "left" } }>
      <Typography component="h3" sx={ { marginTop: 0.5 } } variant="h3">
        F.A.Q
      </Typography>
      { faq.map(({ answer, question }, idx) => (
        <Stack key={ `question-${idx}` } sx={ { gap: 1, mt: [4, 4, 5] } }>
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
    </Box>
  );
};

export default FAQModal;
