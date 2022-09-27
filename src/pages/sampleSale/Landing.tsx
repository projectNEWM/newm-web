import { Box, Stack, useTheme } from "@mui/material";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { FilledButton, Typography } from "elements";
import { ResponsiveNEWMLogo } from "components";
import Compass from "assets/images/Compass";
import HandCoin from "assets/images/HandCoin";
import MagicStar from "assets/images/MagicStar";

const Landing: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const getContentCard = (
    Icon = MagicStar,
    iconBackground = theme.gradients.magazine,
    heading = "Pioneer",
    content = "Get exclusive pre-launch access to our Artist Portal (beta)."
  ) => (
    <Stack
      sx={ {
        backgroundColor: theme.colors.grey600,
        borderRadius: "4px",
        maxWidth: ["336px", "336px", "256px"],
        pb: 3,
        position: "relative",
        pt: 5,
        px: 3,
      } }
    >
      <Stack
        sx={ {
          alignItems: "center",
          background: iconBackground,
          borderRadius: "4px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.65)",
          justifyContent: "center",
          p: 1.5,
          position: "absolute",
          right: "50%",
          top: "-20px",
          transform: "translateX(50%)",
        } }
      >
        <Icon />
      </Stack>
      <Typography variant="h3">{ heading }</Typography>
      <Typography sx={ { fontWeight: "400", mt: 3 } }>{ content }</Typography>
    </Stack>
  );
  return (
    <Box
      sx={ {
        alignItems: "center",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        maxWidth: "100%",
        px: 2,
        py: 7.5,
        textAlign: "center",
      } }
    >
      <ResponsiveNEWMLogo />

      <Typography mt={ 4 } variant="h1">
        Welcome to NEWM
      </Typography>
      <Typography
        fontWeight={ 400 }
        maxWidth="580px"
        sx={ { color: theme.colors.grey100, mt: 0.5 } }
      >
        Make a living making music and build a community around your art!
      </Typography>
      <Stack
        columnGap={ 10 }
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        mt={ 10 }
        rowGap={ 10 }
      >
        { getContentCard() }
        { getContentCard(
          Compass,
          theme.gradients.partners,
          "Distribution",
          "Share your music on your terms with an artist-focused platform."
        ) }
        { getContentCard(
          HandCoin,
          theme.gradients.crypto,
          "Rewards",
          "Connect a wallet for rewards that will unlock more features."
        ) }
      </Stack>
      <FilledButton
        fullWidth
        onClick={ () => {
          navigate("/sample-sale");
        } }
        sx={ { maxWidth: theme.inputField.maxWidth, mt: 7.5 } }
      >
        Let&apos;s do it
      </FilledButton>
    </Box>
  );
};

export default Landing;
