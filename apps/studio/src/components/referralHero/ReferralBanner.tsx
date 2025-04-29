import { FunctionComponent } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button } from "@newm-web/elements";
import { referralBannerBackground } from "@newm-web/assets";

/**
 * Referral banner component for the sidebar
 * Shows either a button to trigger referral modal or stats about successful referrals
 */
const ReferralBanner: FunctionComponent = () => {
  const theme = useTheme();
  const REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID = "xxxxxxxxx";
  const referralHeroObj =
    window[REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID as keyof typeof window];

  const { people_referred: referralCount } = referralHeroObj?.optin_data ?? {};

  const hasReferral = referralCount > 0;

  return (
    <Box
      sx={ {
        "&::after": {
          backgroundColor: "#00000099",
          bottom: 0,
          content: "\"\"",
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: -1,
        },
        "&::before": {
          background: `url(${referralBannerBackground})`,
          backgroundSize: "cover",
          borderRadius: 2,
          bottom: 0,
          content: "\"\"",
          left: 0,
          opacity: 1,
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: -2,
        },
        border: `2px solid ${theme.colors.grey500}`,
        borderRadius: 2,
        px: 1,
        py: 2,
      } }
    >
      { hasReferral ? (
        <Stack spacing={ 1.5 }>
          <Stack alignItems="center" direction="row" spacing={ 1 }>
            <Typography variant="subtitle1">Your Referrals</Typography>
          </Stack>

          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="body2">Successful Invites:</Typography>
            <Typography
              color={ theme.colors.music }
              fontWeight={ 700 }
              variant="h4"
            >
              { referralCount }
            </Typography>
          </Stack>

          <Button color="music" variant="secondary" width="full">
            Invite an Artist
          </Button>
        </Stack>
      ) : (
        <Stack alignItems="center" spacing={ 2 }>
          <Typography align="center" fontWeight={ 600 } variant="body2">
            Refer Artists,
            <br />
            Earn Rewards!
          </Typography>
          <Typography
            align="center"
            color={ theme.colors.white }
            fontWeight={ 500 }
            variant="subtitle2"
          >
            Get rewarded when the artists you refer distribute their music!
          </Typography>
          <Button color="music" width="full">
            Invite an Artist
          </Button>
        </Stack>
      ) }
    </Box>
  );
};

export default ReferralBanner;
