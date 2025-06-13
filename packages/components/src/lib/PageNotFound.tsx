import { FunctionComponent } from "react";
import { Box, Link, Stack, SxProps, Typography } from "@mui/material";
import { DiscordLogo, NEWMLogo, NEWMMonsterPercussion } from "@newm-web/assets";
import theme from "@newm-web/theme";
import { NEWM_DISCORD_URL, getImageSrc } from "@newm-web/utils";
import { Button } from "@newm-web/elements";

interface PageNotFoundProps {
  readonly layout?: "sidebar" | "topbar";
  readonly onNavigate?: (url: string) => void;
  readonly redirectUrl?: string;
}

const PageNotFound: FunctionComponent<PageNotFoundProps> = ({
  redirectUrl = "/",
  onNavigate,
  layout = "topbar",
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

  // Determine layout-specific styles
  const layoutStyles = {
    sidebar: {
      container: {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        gap: [2, 3],
        justifyContent: ["center", "start"],
        mb: [0, 5],
        minHeight: "100vh",
        px: 0.5,
        py: [4, 7.5],
        textAlign: "center" as const,
      } as SxProps,
      imageSpacing: {
        mt: { md: 18, xs: 0 },
      },
      newmLogo: { display: "block" },
      typographySpacing: {
        mt: [3, 8.5],
      },
    },
    topbar: {
      container: {
        alignItems: "center",
        backgroundColor: theme.colors.black,
        gap: 3,
        mb: [2, 5],
        mt: [2, 5],
        px: [5, 2],
        textAlign: "center" as const,
      } as SxProps,

      imageSpacing: {
        mt: [2, 0],
      },
      newmLogo: { display: ["none", "block"] },
      typographySpacing: {
        mt: [2, 0],
      },
    },
  };

  const currentStyles = layoutStyles[layout];

  return (
    <Stack sx={ currentStyles.container }>
      <Box display={ currentStyles.newmLogo.display }>
        <NEWMLogo />
      </Box>
      { /* Change the variant size down for mobile view so everything fits */ }
      <Stack gap={ 1.5 }>
        <Typography
          color="white"
          component="h3"
          fontSize={ { sm: "32px", xs: "24px" } }
          lineHeight={ { sm: "40px", xs: "24px" } }
          mt={ currentStyles.typographySpacing.mt }
          variant="h3"
        >
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
      </Stack>

      <Button sx={ { mt: 2.5 } } width="compact" onClick={ handleGoBack }>
        Back to NEWM
      </Button>
      <Box
        alt="NEWM Monster"
        component="img"
        src={ getImageSrc(NEWMMonsterPercussion) }
        sx={ {
          height: { md: 250, sm: 200, xs: 150 },
          maxWidth: "100%",
          mt: currentStyles.imageSpacing.mt,
          width: { md: 250, sm: 200, xs: 150 },
        } }
      />
      <Stack
        alignItems="center"
        color={ theme.colors.grey100 }
        flexDirection="row"
        gap={ 1 }
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
