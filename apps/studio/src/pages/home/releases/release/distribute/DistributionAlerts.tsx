import { useNavigate } from "react-router-dom";

import { Stack, Typography, useTheme } from "@mui/material";

import { Alert, Button } from "@newm-web/elements";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import {
  VerificationStatus,
  emptyProfile,
  useGetProfileQuery,
} from "../../../../../modules/session";
import { useAppDispatch } from "../../../../../common";
import {
  setIsConnectWalletModalOpen,
  setIsIdenfyModalOpen,
} from "../../../../../modules/ui";

interface DistributionAlertsProps {
  readonly isMinting?: boolean;
}

const DistributionAlerts = ({ isMinting = false }: DistributionAlertsProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { wallet } = useConnectWallet();

  const {
    data: {
      verificationStatus,
      dspPlanSubscribed: isArtistPricePlanSelected,
      spotifyProfile,
      appleMusicProfile,
    } = emptyProfile,
  } = useGetProfileQuery();

  const shouldShowOutletsWarning = !appleMusicProfile || !spotifyProfile;
  const isVerified = verificationStatus === VerificationStatus.Verified;
  const isMintingVisible = isMinting && isArtistPricePlanSelected;

  const handleVerifyProfile = () => {
    dispatch(setIsIdenfyModalOpen(true));
  };

  return (
    <Stack spacing={ 3 }>
      { shouldShowOutletsWarning && (
        <Stack
          alignSelf={ ["center", "center", "unset"] }
          maxWidth={ [
            theme.inputField.maxWidth,
            theme.inputField.maxWidth,
            "700px",
          ] }
        >
          <Alert
            action={
              <Button
                color="yellow"
                sx={ { textTransform: "none" } }
                variant="outlined"
                onClick={ () =>
                  navigate("/home/profile", {
                    state: { scrollToOutlets: true },
                  })
                }
              >
                Go to profile
              </Button>
            }
            severity="warning"
          >
            <Typography color={ theme.colors.yellow } mb={ 0.5 }>
              Outlet Profile Information Missing
            </Typography>
            <Typography
              color={ theme.colors.yellow }
              fontWeight={ 400 }
              maxWidth="460px"
              variant="subtitle1"
            >
              Please add your outlet profile URLs to your artist profile. If
              you&apos;re a first-time distributor, or do not have an outlet
              profile, disregard this message.
            </Typography>
          </Alert>
        </Stack>
      ) }

      { isMintingVisible && !isVerified && (
        <Alert
          action={
            <Button
              aria-label="verify profile"
              color="yellow"
              sx={ { textTransform: "none" } }
              variant="outlined"
              onClick={ handleVerifyProfile }
            >
              Verify ID
            </Button>
          }
          severity="warning"
        >
          <Typography color={ theme.colors.yellow } mb={ 0.5 }>
            Verify your identity
          </Typography>
          <Typography
            color={ theme.colors.yellow }
            fontWeight={ 400 }
            variant="subtitle1"
          >
            Please complete the identity verification process in order to
            distribute your release.
          </Typography>
        </Alert>
      ) }

      { isMintingVisible && !wallet && (
        <Alert
          action={
            <Button
              aria-label="connect wallet"
              color="yellow"
              sx={ { textTransform: "none" } }
              variant="outlined"
              onClick={ () => {
                dispatch(setIsConnectWalletModalOpen(true));
              } }
            >
              Connect wallet
            </Button>
          }
          severity="warning"
          sx={ { py: 2.5 } }
        >
          <Typography color={ theme.colors.yellow } mb={ 0.5 }>
            Connect a wallet
          </Typography>
          <Typography
            color={ theme.colors.yellow }
            fontWeight={ 400 }
            variant="subtitle1"
          >
            Please connect a wallet in order to distribute your release.
          </Typography>
        </Alert>
      ) }
    </Stack>
  );
};

export default DistributionAlerts;
