import theme from "theme";
import { Box, Stack, Typography } from "@mui/material";
import { MailchimpSubscribeForm } from "components";

const faqItems = [
  {
    question: "1. How does it work?",
    answer:
      "When you purchase a bundle of a Stream Tokens on NEWM, " +
      "you're buying the rights to claim a percentage of future " +
      "streaming royalties next to your favourite artist(s).",
  },
  {
    question: "2. How many bundles can I purchase?",
    answer:
      "Whatever amount your sweet heart desires! However, you can only " +
      "purchase one bundle per session to give a fair chance to other " +
      "prospective buyers.",
  },
  {
    question: "3. Where can I listen or stream the song(s)?",
    answer:
      "You can listen to the song(s) on most of the major streaming " +
      "platforms, including Soundcloud, Youtube Music, Spotify, Tidal, " +
      "Amazon Music, Apple Music (if it has lyrics), etc. Eventually, NEWM " +
      "will have a music streaming platform in-app that will offer higher " +
      "and faster royalty payouts than the traditional platforms.",
  },
  {
    question: "4. How and when can I claim royalties?",
    answer:
      "Royalty payout times can vary widely, depending on the streaming " +
      "platform. Normally, payouts can take 6 months or more, so please be " +
      "patient and join our communities where we'll notify you when " +
      "claiming becomes available.",
  },
  {
    question: "5. How do I get important info about my purchase?",
    answer:
      "Sign up to our 'NEWMusic Owner' email list and join our support " +
      "channels on Discord and Telegram!",
  },
];

const FAQModal = () => {
  return (
    <Box sx={ { textAlign: "left", overflow: "auto" } }>
      <Typography component="h3" sx={ { marginTop: 0.5 } } variant="h3">
        F.A.Q
      </Typography>
      { faqItems.map(({ answer, question }, idx) => (
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
          groupValue="2"
          groupName="group[383765][2]"
        />
      </Stack>
    </Box>
  );
};

export default FAQModal;
