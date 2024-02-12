import { Telegram } from "@mui/icons-material";
import { Box, Grid, Link, Typography, useTheme } from "@mui/material";
import { DiscordLogo, NEWMLogo, XLogo } from "@newm-web/assets";
import { FunctionComponent } from "react";
import {
  NEWM_DISCORD_URL,
  NEWM_IO_URL,
  NEWM_MARKETPLACE_FAQ_URL,
  NEWM_MARKETPLACE_SUPPORT_URL,
  NEWM_MARKETPLACE_TERMS_OF_SERVICE_URL,
  NEWM_TELEGRAM_URL,
  NEWM_X_URL,
} from "../../common/constants";

const Footer: FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Grid
      component="footer"
      px={ [2, 5, 10] }
      py={ [2.5, 3] }
      sx={ {
        alignItems: "center",
        borderTop: `1px solid ${theme.colors.grey500}`,
        display: "flex",
        flexDirection: ["column", "row"],
        gap: 2,
        justifyContent: "space-between",
      } }
    >
      <Box
        sx={ {
          alignItems: "center",
          display: "flex",
          flexDirection: ["column", "row"],
          gap: [2, 4],
        } }
      >
        <Link href={ NEWM_IO_URL } rel="noopener" target="_blank">
          <NEWMLogo height="40" width="40" />
        </Link>
        <Typography
          component="div"
          sx={ {
            alignItems: "center",
            display: "flex",
            flexDirection: ["column", "row"],
            gap: [2, 4],
          } }
          variant="externalLinks"
        >
          <Link
            href={ NEWM_MARKETPLACE_SUPPORT_URL }
            rel="noopener"
            target="_blank"
          >
            Support
          </Link>
          <Link
            href={ NEWM_MARKETPLACE_TERMS_OF_SERVICE_URL }
            rel="noopener"
            target="_blank"
          >
            Terms of Service
          </Link>
          <Link href={ NEWM_MARKETPLACE_FAQ_URL } rel="noopener" target="_blank">
            FAQ
          </Link>
        </Typography>
      </Box>
      <Box
        sx={ {
          alignItems: "center",
          display: "flex",
          gap: 4,
          justifyContent: "center",
        } }
      >
        <Link href={ NEWM_TELEGRAM_URL } rel="noopener" target="_blank">
          <Telegram sx={ { color: "#34ACE1" } } />
        </Link>
        <Link href={ NEWM_DISCORD_URL } rel="noopener" target="_blank">
          <DiscordLogo sx={ { color: " #5865F2" } } />
        </Link>
        <Link href={ NEWM_X_URL } rel="noopener" target="_blank">
          <XLogo />
        </Link>
      </Box>
    </Grid>
  );
};

export default Footer;
