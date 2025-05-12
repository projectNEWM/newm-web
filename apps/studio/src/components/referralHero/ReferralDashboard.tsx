import { FunctionComponent, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useConnectWallet } from "@newm.io/cardano-dapp-wallet-connector";
import WalletConnectionOverlay from "./WalletConnectionOverlay";
import {
  getReferralHeroUserCampaignData,
  useAppDispatch,
  useAppSelector,
} from "../../common";
import {
  selectUi,
  setIsConnectWalletModalOpen,
  setIsReferralDashboardModalOpen,
} from "../../modules/ui";

interface ReferralDashboardProps {
  readonly campaignUUID: string;
}

const ReferralDashboard: FunctionComponent<ReferralDashboardProps> = ({
  campaignUUID,
}) => {
  const dispatch = useAppDispatch();
  const { isReferralDashboardModalOpen } = useAppSelector(selectUi);
  const [copySuccess, setCopySuccess] = useState(false);
  const { wallet } = useConnectWallet();

  // Mock data - replace with actual data from your system
  const referralCount = 6;
  const referralLink =
    getReferralHeroUserCampaignData(campaignUUID)?.referral_link ?? "";

  const handleClose = () => {
    dispatch(setIsReferralDashboardModalOpen(false));
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      })
      .catch((err) => console.error("Copy failed: ", err));
  };

  const handleConnectWallet = () => {
    dispatch(setIsConnectWalletModalOpen(true));
  };

  return (
    <Dialog
      BackdropProps={ {
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        },
      } }
      maxWidth="md"
      open={ isReferralDashboardModalOpen }
      PaperProps={ {
        sx: {
          bgcolor: "#121212",
          borderRadius: 2,
          boxShadow: 24,
          m: 2,
          maxHeight: "90vh",
          position: "relative",
          width: { sm: "600px", xs: "90%" }, // Important for the overlay positioning
        },
      } }
      fullWidth
      onClose={ handleClose }
    >
      <Box
        sx={ {
          display: "flex",
          filter: !wallet ? "blur(3px)" : "none",
          flexDirection: "column",
          height: "100%",
          p: 3,
          pb: 5,
          position: "relative",
          width: "100%", // Blur content when wallet is not connected
        } }
      >
        <IconButton
          aria-label="close"
          sx={ {
            color: "grey.500",
            filter: "none",
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 10000, // Keep close button clear even when content is blurred
          } }
          onClick={ handleClose }
        >
          <CloseIcon />
        </IconButton>

        <DialogContent
          sx={ {
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255,255,255,.1)",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
            },
            alignItems: "center",
            bgcolor: "#121212",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: { sm: 3, xs: 1 },
          } }
        >
          { /* Header */ }
          <Typography
            align="center"
            component="h1"
            sx={ {
              color: "white",
              fontWeight: 600,
              mb: 1,
            } }
            variant="h4"
          >
            Invite Your Friends!
          </Typography>

          <Typography
            align="center"
            sx={ {
              color: "grey.400",
              mb: 2,
            } }
            variant="subtitle1"
          >
            Earn rewards by bringing your friends to NEWM!
          </Typography>

          <Divider
            sx={ {
              backgroundColor: "rgba(255,255,255,0.1)",
              my: 2,
              width: "100%",
            } }
          />

          { /* How it Works Section */ }
          <Box sx={ { mb: 3, width: "100%" } }>
            <Typography
              sx={ {
                color: "grey.400",
                mb: 1,
              } }
              variant="body2"
            >
              How it Works: (Refer and Earn)
            </Typography>

            <Typography sx={ { color: "white", mb: 0.5 } } variant="body1">
              1. Share your unique referral link.
            </Typography>
            <Typography sx={ { color: "white", mb: 0.5 } } variant="body1">
              2. Your friend signs up using your link.
            </Typography>
            <Typography sx={ { color: "white", mb: 1 } } variant="body1">
              3. Once they complete their first task, you earn 50 points & 20
              NEWM tokens!
            </Typography>

            <Typography sx={ { color: "grey.400", mb: 0.5 } } variant="body2">
              Note:
            </Typography>
            <Typography sx={ { color: "white", mb: 2 } } variant="body1">
              There&apos;s no limit—invite as many friends as you want and stack
              up rewards!
            </Typography>
          </Box>

          { /* Referral Count Box */ }
          <Paper
            elevation={ 0 }
            sx={ {
              alignItems: "center",
              bgcolor: "rgba(30,30,30,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              mb: 3,
              p: 2,
              width: "170px",
            } }
          >
            <Typography
              sx={ {
                color: "grey.400",
                mb: 1,
              } }
              variant="body2"
            >
              Your Referrals
            </Typography>
            <Typography
              sx={ {
                color: "#e966a0",
                fontWeight: "bold",
              } }
              variant="h2"
            >
              { referralCount }
            </Typography>
          </Paper>

          <Divider
            sx={ {
              backgroundColor: "rgba(255,255,255,0.1)",
              my: 2,
              width: "100%",
            } }
          />

          { /* Share Link Section */ }
          <Box sx={ { width: "100%" } }>
            <Typography
              sx={ {
                color: "white",
                fontWeight: 500,
                mb: 2,
              } }
              variant="body1"
            >
              Share Your Referral Link
            </Typography>

            <TextField
              InputProps={ {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      sx={ { color: "white" } }
                      onClick={ handleCopyLink }
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                readOnly: true,
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.3)",
                  },
                  bgcolor: "#000",
                  borderRadius: 1,
                  color: "white",
                },
              } }
              value={ referralLink }
              variant="outlined"
              fullWidth
            />
          </Box>

          <Snackbar
            anchorOrigin={ { horizontal: "center", vertical: "bottom" } }
            autoHideDuration={ 3000 }
            message="Link copied to clipboard!"
            open={ copySuccess }
          />
        </DialogContent>
      </Box>

      { /* Wallet Connection Overlay */ }
      { !wallet && (
        <WalletConnectionOverlay handleConnectWallet={ handleConnectWallet } />
      ) }
    </Dialog>
  );
};

export default ReferralDashboard;
