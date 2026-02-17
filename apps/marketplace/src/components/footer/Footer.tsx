import { Telegram } from "@mui/icons-material";
import { Box, Grid, useTheme } from "@mui/material";
import { DiscordLogo, NEWMLogo, XLogo } from "@newm-web/assets";
import { NEWM_DISCORD_URL } from "@newm-web/utils";
import { FunctionComponent } from "react";
import FooterLink from "./FooterLink";
import {
  NEWM_IO_URL,
  NEWM_MARKETPLACE_FAQ_URL,
  NEWM_MARKETPLACE_SUPPORT_URL,
  NEWM_MARKETPLACE_TERMS_OF_SERVICE_URL,
  NEWM_TELEGRAM_URL,
  NEWM_X_URL,
} from "../../common";

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
        <FooterLink href={ NEWM_IO_URL }>
          <NEWMLogo height="40" width="40" />
        </FooterLink>
        <Box
          sx={ {
            alignItems: "center",
            display: "flex",
            flexDirection: ["column", "row"],
            gap: [2, 4],
          } }
        >
          <FooterLink href={ NEWM_MARKETPLACE_SUPPORT_URL }>Support</FooterLink>
          <FooterLink href={ NEWM_MARKETPLACE_TERMS_OF_SERVICE_URL }>
            Terms of Service
          </FooterLink>
          <FooterLink href={ NEWM_MARKETPLACE_FAQ_URL }>FAQ</FooterLink>
        </Box>
      </Box>
      <Box
        sx={ {
          alignItems: "center",
          display: "flex",
          gap: 4,
          justifyContent: "center",
        } }
      >
        <FooterLink href={ NEWM_TELEGRAM_URL }>
          <Telegram sx={ { color: "#34ACE1" } } />
        </FooterLink>
        <FooterLink href={ NEWM_DISCORD_URL }>
          <DiscordLogo sx={ { color: "#5865F2" } } />
        </FooterLink>
        <FooterLink href={ NEWM_X_URL }>
          <XLogo />
        </FooterLink>
      </Box>
    </Grid>
  );
};

export default Footer;
