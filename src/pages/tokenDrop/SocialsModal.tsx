import { Stack, Typography } from "@mui/material";
import { AccentButton } from "elements";
import SpotifyIcon from "assets/images/SpotifyIcon";
import InstagramIcon from "assets/images/InstagramIcon";
import TwitterIcon from "assets/images/TwitterIcon";
import GoogleChromeIcon from "assets/images/GoogleChromeIcon";

const SocialsModal = () => (
  <>
    <Typography
      component="h3"
      variant="h3"
      sx={ { marginTop: 0.5, textAlign: "left" } }
    >
      Let&apos;s Connect
    </Typography>
    <Stack sx={ { alignItems: "start", mt: [4, 4, 5] } }>
      <Typography
        sx={ {
          fontSize: "16px",
          fontFamily: "Raleway",
          fontWeight: "700",
          lineHeight: "20px",
        } }
      >
        MURS
      </Typography>
      <Stack
        sx={ {
          display: "flex",
          mt: 1,
          flexDirection: "row",
          gap: 1.5,
          flexWrap: "wrap",
        } }
      >
        <AccentButton startIcon={ <TwitterIcon /> }>Twitter</AccentButton>
        <AccentButton startIcon={ <InstagramIcon /> }>Instagram</AccentButton>
        <AccentButton
          startIcon={ <SpotifyIcon height={ 16 } width={ 16 } fillColor="#DC3CAA" /> }
        >
          Spotify
        </AccentButton>
      </Stack>
    </Stack>
    <Stack sx={ { alignItems: "start", mt: [3, 3, 4] } }>
      <Typography
        sx={ {
          fontSize: "16px",
          fontFamily: "Raleway",
          fontWeight: "700",
          lineHeight: "20px",
        } }
      >
        Moodswingz
      </Typography>
      <Stack
        sx={ {
          display: "flex",
          mt: 1,
          flexDirection: "row",
          gap: 1.5,
          flexWrap: "wrap",
        } }
      >
        <AccentButton startIcon={ <TwitterIcon /> }>Twitter</AccentButton>
        <AccentButton startIcon={ <InstagramIcon /> }>Instagram</AccentButton>
        <AccentButton
          startIcon={ <SpotifyIcon height={ 16 } width={ 16 } fillColor="#DC3CAA" /> }
        >
          Spotify
        </AccentButton>
      </Stack>
    </Stack>
    <Stack sx={ { alignItems: "start", mt: [3, 3, 4] } }>
      <Typography
        sx={ {
          fontSize: "16px",
          fontFamily: "Raleway",
          fontWeight: "700",
          lineHeight: "20px",
        } }
      >
        NEWM
      </Typography>
      <Stack
        sx={ {
          display: "flex",
          mt: 1,
          flexDirection: "row",
          gap: 1.5,
          flexWrap: "wrap",
        } }
      >
        <AccentButton startIcon={ <TwitterIcon /> }>Twitter</AccentButton>
        <AccentButton startIcon={ <InstagramIcon /> }>Instagram</AccentButton>
        <AccentButton startIcon={ <GoogleChromeIcon /> }>Website</AccentButton>
      </Stack>
    </Stack>
  </>
);

export default SocialsModal;
