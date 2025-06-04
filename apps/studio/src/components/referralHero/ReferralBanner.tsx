import { FunctionComponent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Button } from "@newm-web/elements";
import { referralBannerBackground } from "@newm-web/assets";
import { REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID } from "@newm-web/env";
import { Link } from "react-router-dom";
import { getReferralHeroUserCampaignData, useAppDispatch } from "../../common";
import { setIsReferralDashboardModalOpen } from "../../modules/ui";

interface ReferralBannerProps {
  readonly isCloseButtonVisible?: boolean;
  readonly isReferralBannerDismissed: boolean;
  readonly onBannerDismiss: () => void;
}
/**
 * Referral Hero campaign banner component for the artist referral campaign.
 */
const ReferralBanner: FunctionComponent<ReferralBannerProps> = ({
  onBannerDismiss,
  isReferralBannerDismissed,
  isCloseButtonVisible,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const referralUserData = getReferralHeroUserCampaignData(
    REFERRALHERO_ARTIST_REFERRAL_CAMPAIGN_UUID
  );

  const usersSuccessfullyReferred = referralUserData?.people_referred ?? 0;
  const hasSuccessfulReferral = usersSuccessfullyReferred > 0;

  const handleBannerDismiss = () => {
    onBannerDismiss();
  };

  const handleBannerClick = () => {
    onBannerDismiss();
    dispatch(setIsReferralDashboardModalOpen(true));
  };

  if (hasSuccessfulReferral) {
    return (
      <Box
        sx={ {
          backgroundColor: theme.colors.grey700,
          border: `2px solid ${theme.colors.grey500}`,
          borderRadius: 2,
          px: 1,
          py: 1,
        } }
      >
        { !isReferralBannerDismissed && (
          <IconButton
            aria-label="close"
            size="small"
            sx={ {
              color: theme.colors.white,
              display: isCloseButtonVisible ? "block" : "none",
              position: "absolute",
              px: 0.5,
              py: 0,
              right: 0,
              top: 0,
            } }
            onClick={ handleBannerDismiss }
          >
            <CloseIcon
              sx={ {
                fontSize: 12,
              } }
            />
          </IconButton>
        ) }
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
        <Button variant="primary" width="full" onClick={ handleBannerClick }>
          Invite an Artist
        </Button>
      </Box>
    );
  } else {
    return (
      <Box
        sx={ {
          background: `url(${referralBannerBackground})`,
          backgroundBlendMode: "multiply", // Blend the image and color
          backgroundColor: "#00000099",
          backgroundSize: "cover",
          border: `2px solid ${theme.colors.grey500}`,
          borderRadius: 2,
          position: "relative",
          px: 1,
          py: 1,
        } }
      >
        { !isReferralBannerDismissed && (
          <IconButton
            aria-label="close"
            size="small"
            sx={ {
              color: theme.colors.white,
              display: isCloseButtonVisible ? "block" : "none",
              position: "absolute",
              px: 0.5,
              py: 0,
              right: 0,
              top: 0,
            } }
            onClick={ handleBannerDismiss }
          >
            <CloseIcon
              sx={ {
                fontSize: 12,
              } }
            />
          </IconButton>
        ) }
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
          <Button variant="primary" width="full" onClick={ handleBannerClick }>
            Invite an Artist
          </Button>
        </Stack>
      </Box>
    );
  }
};

export default ReferralBanner;
