import { Box, Typography } from "@mui/material";
import { AnimatedGradientLine, FilledButton, OutlinedButton } from "components";
import theme from "../../../theme";

const WalletOverview = () => {
  return (
    <div>
      <Typography
        sx={ {
          color: theme.palette.primary.main,
          fontWeight: 900,
          paddingTop: "5px",
        } }
        align="center"
        variant="h5"
      >
        Welcome to your wallet!
      </Typography>
      <Typography align="center" variant="body1" pt="35px" pb="35px">
        In order for you to mint your music and create an NFT, you have to connect your account with a crypto wallet.
        You will not be charged any fees for connecting your wallet.
      </Typography>
      <Box sx={ { marginBottom: "35px", textAlign: "center" } }>
        <OutlinedButton sx={ { marginRight: "26px" } } variant="outlined">
          I am new to crypto
        </OutlinedButton>

        <FilledButton>Connect My Wallet</FilledButton>
      </Box>
      <AnimatedGradientLine />
      <Typography mt="35px" align="center" variant="body1" mb="35px">
        We are currently working on the NEWM App. As soon as our App is live, you will see all your income streams here.
        To be prepared for the big launch, make sure you minted your music!
      </Typography>
      <Box sx={ { textAlign: "center" } }>
        <FilledButton>Mint Your Music</FilledButton>
      </Box>

      <div />
    </div>
  );
};

export default WalletOverview;
