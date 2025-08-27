/* eslint-disable react-hooks/rules-of-hooks */
import { FunctionComponent } from "react";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useFlags } from "launchdarkly-react-client-sdk";
import WalletConnectionOverlay from "./WalletConnectionOverlay";
import ReferralDataBox from "./ReferralDataBox";
import {
  getReferralHeroUserCampaignData,
  useAppDispatch,
  useAppSelector,
} from "../../common";
import {
  selectUi,
  setIsConnectWalletModalOpen,
  setIsReferralDashboardModalOpen,
  setToastMessage,
} from "../../modules/ui";
import {
  emptyProfile,
  selectSession,
  useGetProfileQuery,
} from "../../modules/session";

interface ReferralDashboardProps {
  readonly campaignUUID: string;
}

/**
 * ReferralDashboard component displays a modal with referral stats and sharable link.
 * If the user doesn't have a wallet connected, it shows a wallet connection overlay.
 */
const ReferralDashboard: FunctionComponent<ReferralDashboardProps> = ({
  campaignUUID,
}) => {
  const { webStudioArtistReferralCampaign } = useFlags();
  // Check if the referral campaign is enabled before rendering the wrapper component
  if (!webStudioArtistReferralCampaign) return null;

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(selectSession);
  const { isReferralDashboardModalOpen } = useAppSelector(selectUi);

  // Saved wallet address will be used for referral rewards
  const { data: { walletAddress } = emptyProfile } = useGetProfileQuery(
    undefined,
    { skip: !isLoggedIn }
  );

  const referralData = getReferralHeroUserCampaignData(campaignUUID);
  const {
    referral_value: referralReward = 0, // value retrieved is in cents
    people_referred: referralCount = 0,
    referral_link: referralLink = "",
  } = referralData || {};

  const handleClose = () => {
    dispatch(setIsReferralDashboardModalOpen(false));
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        dispatch(
          setToastMessage({
            message: "Link copied to clipboard!",
            severity: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(
          setToastMessage({
            message: "Failed to copy link!",
            severity: "error",
          })
        );
      });
  };

  // Connect wallet to add address, if none exist in profile, to get rewards
  const handleConnectWallet = () => {
    dispatch(setIsConnectWalletModalOpen(true));
  };

  return (
    <Modal
      open={ isReferralDashboardModalOpen }
      sx={ {
        alignItems: "center",
        backdropFilter: "blur(2px)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
      } }
      onClose={ handleClose }
    >
      <Box
        sx={ {
          bgcolor: theme.colors.grey600,
          borderRadius: 2,
          maxHeight: "90vh",
          maxWidth: { sm: "800px", xs: "95%" },
          overflow: "hidden",
          position: "relative",
          width: "100%",
        } }
      >
        <IconButton
          aria-label="close"
          sx={ {
            color: theme.colors.grey200,
            position: "absolute",
            right: [4, 8],
            top: [4, 8],
            zIndex: 10000,
          } }
          onClick={ handleClose }
        >
          <CloseIcon
            sx={ {
              fontSize: 32,
            } }
          />
        </IconButton>
        <Box
          sx={ {
            display: "flex",
            filter: !walletAddress ? "blur(3px)" : "none",
            flexDirection: "column",
            height: "100%",
            position: "relative",
            width: "100%",
          } }
        >
          <Box
            sx={ {
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              px: [2, 4],
              py: [3, 5],
            } }
          >
            { /* Header */ }
            <Stack alignItems="center" spacing={ 1 } width="100%">
              <Typography align="center" fontWeight={ 600 } variant="h3">
                Invite New Artists!
              </Typography>

              <Typography align="center" fontWeight={ 600 } variant="subtitle1">
                Earn rewards by bringing new artists to NEWM Studio!
              </Typography>
            </Stack>

            <Divider
              sx={ {
                backgroundColor: theme.colors.grey300,
                my: 2,
                width: "100%",
              } }
            />

            { /* How it Works Section */ }
            <Box sx={ { mb: [0, 2], width: "100%" } }>
              <Typography mb={ 1 } variant="subtitle1">
                How it works:
              </Typography>

              <Typography mb={ 0.5 } variant="body1">
                1. Copy and share your unique referral link.
              </Typography>
              <Typography mb={ 0.5 } variant="body1">
                2. A new artist signs up for NEWM Studio using your link.
              </Typography>
              <Typography mb={ 1 } variant="body1">
                3. Once their first release is approved for distribution, you
                both earn $5 in $NEWM tokens as a reward!
              </Typography>

              <Typography mb={ 0.5 } variant="subtitle1">
                Note:
              </Typography>
              <Typography mb={ 2 } variant="body1">
                There&apos;s no limit — invite as many artists as you want and
                stack up the rewards!
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap={ 2.5 }
              justifyContent="center"
              width="100%"
            >
              <ReferralDataBox
                title="referrals"
                value={ referralCount }
              ></ReferralDataBox>
              <ReferralDataBox
                symbolAdornment={ "$" }
                title="rewards earned"
                value={ referralReward / 100 }
              ></ReferralDataBox>
            </Box>

            <Divider
              sx={ {
                backgroundColor: theme.colors.grey300,
                my: 2,
                width: "100%",
              } }
            />

            { /* Share Link Section */ }
            <Box sx={ { width: "100%" } }>
              <Typography fontWeight={ 500 } mb={ 1 } variant="body1">
                Share Your Referral Link
              </Typography>

              <TextField
                InputProps={ {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        sx={ {
                          border: `1px solid ${theme.colors.grey400}`,
                          borderRadius: 1,
                          color: theme.colors.grey100,
                          m: 1,
                        } }
                        onClick={ handleCopyLink }
                      >
                        <Typography mx={ 2 }> Copy Link</Typography>
                        <ContentCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  readOnly: true,
                  sx: {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.colors.grey400,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.colors.grey400,
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.colors.grey400,
                    },
                    bgcolor: theme.colors.black,
                    borderRadius: 1,
                    color: theme.colors.white,
                    p: 1,
                  },
                } }
                value={ referralLink }
                variant="outlined"
                fullWidth
              />
            </Box>
          </Box>
        </Box>
        { /* Wallet Connection Overlay */ }
        { !walletAddress && (
          <WalletConnectionOverlay handleConnectWallet={ handleConnectWallet } />
        ) }
      </Box>
    </Modal>
  );
};

export default ReferralDashboard;
