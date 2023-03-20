import { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";
import DiscordIcon from "assets/images/DiscordIcon";
import FacebookIcon from "assets/images/FacebookIcon";
import GoogleChromeIcon from "assets/images/GoogleChromeIcon";
import InstagramIcon from "assets/images/InstagramIcon";
import LinktreeIcon from "assets/images/LinktreeIcon";
import SpotifyIcon from "assets/images/SpotifyIcon";
import TwitterIcon from "assets/images/TwitterIcon";
import SoundcloudIcon from "assets/images/SoundcloudIcon";
import TiktokIcon from "assets/images/TiktokIcon";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { AccentButton } from "elements";
import { projectDetails } from "buildParams";

interface SocialButtonProps {
  href: string;
  icon: ReactNode;
  text: string;
}

const SocialButton = ({ href, icon, text }: SocialButtonProps) => (
  <a
    href={ href }
    rel="noopener noreferrer"
    style={ { textDecoration: "none" } }
    target="_blank"
  >
    <AccentButton startIcon={ icon }>{ text }</AccentButton>
  </a>
);

const SocialsModal = () => {
  const { socials } = projectDetails;

  return (
    <>
      <Typography
        component="h3"
        variant="h3"
        sx={ { mb: 1, mt: 0.5, textAlign: "left" } }
      >
        Let&apos;s Connect
      </Typography>

      { socials.map(
        (
          {
            heading,
            discord,
            facebook,
            instagram,
            linktree,
            soundcloud,
            spotify,
            tikTok,
            twitter,
            youTube,
            website,
          },
          idx
        ) => (
          <Stack
            key={ `social-row-${idx}` }
            sx={ { alignItems: "start", mt: [3, 3, 5] } }
          >
            <Typography
              sx={ {
                fontSize: "16px",
                fontFamily: "Raleway",
                fontWeight: "700",
                lineHeight: "20px",
              } }
            >
              { heading }
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
              { discord && (
                <SocialButton
                  href={ discord }
                  icon={ <DiscordIcon /> }
                  text="Discord"
                />
              ) }
              { facebook && (
                <SocialButton
                  href={ facebook }
                  icon={ <FacebookIcon /> }
                  text="Facebook"
                />
              ) }
              { instagram && (
                <SocialButton
                  href={ instagram }
                  icon={ <InstagramIcon /> }
                  text="Instagram"
                />
              ) }
              { linktree && (
                <SocialButton
                  href={ linktree }
                  icon={ <LinktreeIcon /> }
                  text="Linktree"
                />
              ) }
              { soundcloud && (
                <SocialButton
                  href={ soundcloud }
                  icon={ <SoundcloudIcon /> }
                  text="Soundcloud"
                />
              ) }
              { spotify && (
                <SocialButton
                  href={ spotify }
                  icon={
                    <SpotifyIcon height={ 16 } width={ 16 } fillColor="#DC3CAA" />
                  }
                  text="Spotify"
                />
              ) }
              { tikTok && (
                <SocialButton
                  href={ tikTok }
                  icon={ <TiktokIcon /> }
                  text="TikTok"
                />
              ) }
              { twitter && (
                <SocialButton
                  href={ twitter }
                  icon={ <TwitterIcon /> }
                  text="Twitter"
                />
              ) }
              { youTube && (
                <SocialButton
                  href={ youTube }
                  icon={ <YouTubeIcon /> }
                  text="YouTube"
                />
              ) }
              { website && (
                <SocialButton
                  href={ website }
                  icon={ <GoogleChromeIcon /> }
                  text="Website"
                />
              ) }
            </Stack>
          </Stack>
        )
      ) }
    </>
  );
};

export default SocialsModal;
