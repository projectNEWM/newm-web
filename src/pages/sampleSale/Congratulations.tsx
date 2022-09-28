import { FunctionComponent } from "react";
import { GradientTypography, Typography } from "elements";
import { ResponsiveNEWMLogo } from "components";
import MailchimpSubscribeForm from "components/MailchimpSubscribeForm";
import { Box, Stack, useTheme } from "@mui/material";
import DiscordIcon from "assets/images/DiscordIcon";
import TelegramIcon from "assets/images/TelegramIcon";
import TwitterIcon from "assets/images/TwitterIcon";

const Congratulations: FunctionComponent = () => {
  const theme = useTheme();
  return (
    <Box
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        maxWidth: "100%",
        pt: 7.5,
        px: 2,
        textAlign: "center",
      } }
    >
      <Box alignItems="center" display="flex" flexDirection="column">
        <ResponsiveNEWMLogo />

        <Typography variant="h1" mt={ 4 }>
          One small step for Artists;
        </Typography>
        <GradientTypography
          id="verificationLabel"
          mt={ 1.5 }
          style={ { ...theme.typography.emphasized } }
          variant="h1"
        >
          One giant leap for music!
        </GradientTypography>
        <Stack maxWidth="580px" mt={ 5 } px={ 2.5 } spacing={ 1.5 }>
          <Typography variant="h3">What now?</Typography>
          <Typography fontWeight={ 400 }>
            Time to kick back, relax and keep an eye on your inbox. When the
            Artist Portal is ready, we&apos;ll send you an email with your
            all-access pass for pre-launch. From there, you can finish setting
            up your artist profile, upload & mint music and get ready to watch
            the royalties roll in.
          </Typography>
          <label
            style={ {
              color: theme.colors.grey100,
              fontSize: "12px",
              textAlign: "left",
              marginTop: theme.spacing(5),
            } }
            htmlFor="460ff42d47"
          >
            GET NOTIFIED ABOUT LAUNCH
          </label>
          <MailchimpSubscribeForm
            fId="000e7ae2f0"
            groupName="group[380982][4]"
            hiddenInputName="b_3bf911620d8791d21fb973749_460ff42d47"
            id="460ff42d47"
            u="3bf911620d8791d21fb973749"
          />
        </Stack>
      </Box>

      <Stack pb={ 4 } mt={ 4 } direction="row" columnGap={ 4 }>
        <a
          aria-label="View our Telegram channel"
          href="https://t.me/NEWMofficial"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TelegramIcon />
        </a>
        <a
          aria-label="Follow us on Twitter"
          href="https://twitter.com/projectNEWM"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TwitterIcon />
        </a>
        <a
          aria-label="Join our Discord channel"
          href="https://discord.com/invite/z4sYqxqgvQ"
          rel="noopener noreferrer"
          target="_blank"
        >
          <DiscordIcon />
        </a>
      </Stack>
    </Box>
  );
};

export default Congratulations;
