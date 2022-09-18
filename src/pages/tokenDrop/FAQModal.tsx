import { Box, Stack, Typography } from "@mui/material";
import theme from "theme";

const FAQModal = () => (
  <Box sx={ { textAlign: "left" } }>
    <Typography component="h3" sx={ { marginTop: 0.5 } } variant="h3">
      F.A.Q
    </Typography>
    <Stack sx={ { gap: 1, mt: [4, 4, 5] } }>
      <Typography
        sx={ {
          color: theme.colors.grey100,
          fontFamily: "Raleway",
          fontSize: "16px",
          fontWeight: theme.typography.fontWeightBold,
        } }
      >
        What is your motto?
      </Typography>
      <Typography
        sx={ { fontSize: "16px", color: theme.colors.white } }
        variant="subtitle1"
      >
        Nothing matters. Nothing exists on purpose.
      </Typography>
    </Stack>
    <Stack sx={ { gap: 1, mt: [4, 4, 5] } }>
      <Typography
        sx={ {
          color: theme.colors.grey100,
          fontFamily: "Raleway",
          fontSize: "16px",
          fontWeight: theme.typography.fontWeightBold,
        } }
      >
        That is a bit dark is it not?
      </Typography>
      <Typography
        sx={ { fontSize: "16px", color: theme.colors.white } }
        variant="subtitle1"
      >
        Everything matters everything exists on purpose.
      </Typography>
    </Stack>
    <Stack sx={ { gap: 1, mt: [4, 4, 5] } }>
      <Typography
        sx={ {
          color: theme.colors.grey100,
          fontFamily: "Raleway",
          fontSize: "16px",
          fontWeight: theme.typography.fontWeightBold,
        } }
      >
        What is the longest question you have ever asked somebody that takes up
        to two lines
      </Typography>
      <Typography
        sx={ { fontSize: "16px", color: theme.colors.white } }
        variant="subtitle1"
      >
        Answer
      </Typography>
    </Stack>
  </Box>
);

export default FAQModal;
