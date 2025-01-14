import { FunctionComponent } from "react";
import { Link, Stack, Typography } from "@mui/material";
import { DiscordLogo, NEWMLogo, NEWMMonsterPercussion } from "@newm-web/assets";
import theme from "@newm-web/theme";
import { NEWM_DISCORD_URL, getImageSrc } from "@newm-web/utils";

const PageNotFound: FunctionComponent = () => {
  return (
    <Stack
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        minHeight: "100%",
        px: [0.5, 1, 2],
        textAlign: "center",
      } }
    >
      <Stack alignItems="center" gap={ 1.5 } pt={ 7.5 }>
        <NEWMLogo />
        <Typography color="white" component="h1" mt={ 10 } variant="h3">
          Whoops, that page doesn&apos;t exist. Let&apos;s get you back on the
          right track.
        </Typography>
        <Typography
          color={ theme.colors.grey100 }
          component="h2"
          fontWeight={ 500 }
          variant="h4"
        >
          404 error
        </Typography>
        <img
          alt={ "NEWM Monster" }
          height={ 250 }
          src={ getImageSrc(NEWMMonsterPercussion) }
          style={ { marginTop: "28px" } }
          width={ 250 }
        />
      </Stack>
      <Stack
        alignItems="center"
        color={ theme.colors.grey100 }
        flexDirection="row"
        gap={ 1 }
        mb={ 5 }
        mt="auto"
      >
        <Typography
          component="h2"
          fontSize="14px"
          fontWeight={ 500 }
          variant="h4"
        >
          Wanna chat with us? We&apos;re all here.
        </Typography>
        <Link
          color={ theme.colors.grey100 }
          href={ NEWM_DISCORD_URL }
          rel="noopener"
          target="_blank"
        >
          <DiscordLogo />
        </Link>
      </Stack>
    </Stack>
  );
};

export default PageNotFound;
