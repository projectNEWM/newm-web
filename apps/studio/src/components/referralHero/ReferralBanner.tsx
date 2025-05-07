import { FunctionComponent } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Button } from "@newm-web/elements";
import { referralBannerBackground } from "@newm-web/assets";
import { REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID } from "@newm-web/env";
import { Link } from "react-router-dom";
import { getReferralHeroUserCampaignData } from "../../common";

/**
 * Referral Hero campaign banner component for the artist referral campaign.
 */
const ReferralBanner: FunctionComponent = () => {
  const theme = useTheme();
  const referralUserData = getReferralHeroUserCampaignData(
    REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID
  );

  const usersSuccessfullyReferred = referralUserData?.people_referred ?? 0;
  const hasSuccessfulReferral = usersSuccessfullyReferred > 0;

  if (hasSuccessfulReferral) {
    return (
      <Box
        sx={ {
          backgroundColor: theme.colors.grey700,
          border: `2px solid ${theme.colors.grey500}`,
          borderRadius: 2,
          px: 1,
          py: 2,
        } }
      >
        <Typography fontSize={ 12 } fontWeight={ 500 } mb={ 1 } textAlign="center">
          You&apos;ve referred{ " " }
          <Typography
            component="span"
            fontSize={ 14 }
            fontWeight={ theme.typography.fontWeightBold }
            variant="body2"
          >
            { usersSuccessfullyReferred }
          </Typography>{ " " }
          artists! Check your{ " " }
          <Typography
            component="span"
            fontWeight={ theme.typography.fontWeightBold }
            variant="inherit"
          >
            <Link to="/home/wallet">reward</Link>
          </Typography>{ " " }
          and invite more!
        </Typography>

        <Button variant="primary" width="full">
          Invite an Artist
        </Button>
      </Box>
    );
  } else {
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
          <Button variant="primary" width="full">
            Invite an Artist
          </Button>
        </Stack>
      </Box>
    );
  }
};

export default ReferralBanner;
