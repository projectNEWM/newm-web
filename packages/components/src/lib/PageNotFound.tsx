import { FunctionComponent } from "react";
import { Link, Stack, Typography } from "@mui/material";
import { DiscordLogo, NEWMLogo, NEWMMonsterPercussion } from "@newm-web/assets";
import theme from "@newm-web/theme";
import { NEWM_DISCORD_URL, getImageSrc } from "@newm-web/utils";
import { Button } from "@newm-web/elements";

// TODO: Add in a custom style based on side bar or top bar navigation

interface PageNotFoundProps {
  onNavigate?: (url: string) => void;
  redirectUrl?: string;
}

const PageNotFound: FunctionComponent<PageNotFoundProps> = ({
  redirectUrl = "/",
  onNavigate,
}) => {
  const handleGoBack = () => {
    if (onNavigate) {
      // Use provided navigation function if available
      onNavigate(redirectUrl);
    } else {
      // Last resort fallback for environments with neither
      window.location.href = redirectUrl;
    }
  };

  return (
    <Stack
      sx={ {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        gap: 3,
        minWidth: "100%",
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

        <Button sx={ { mt: 4 } } width="compact" onClick={ handleGoBack }>
          Back to NEWM
        </Button>
        <img
          alt={ "NEWM Monster" }
          height={ 250 }
          src={ getImageSrc(NEWMMonsterPercussion) }
          style={ { marginTop: "156px" } }
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
