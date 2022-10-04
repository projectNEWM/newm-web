import { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";
import GoogleChromeIcon from "assets/images/GoogleChromeIcon";
import InstagramIcon from "assets/images/InstagramIcon";
import SpotifyIcon from "assets/images/SpotifyIcon";
import TwitterIcon from "assets/images/TwitterIcon";
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

      { socials.map(({ heading, twitter, instagram, spotify, website }, idx) => (
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
            { twitter && (
              <SocialButton
                href={ twitter }
                icon={ <TwitterIcon /> }
                text="Twitter"
              />
            ) }
            { instagram && (
              <SocialButton
                href={ instagram }
                icon={ <InstagramIcon /> }
                text="Instagram"
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
            { website && (
              <SocialButton
                href={ website }
                icon={ <GoogleChromeIcon /> }
                text="Website"
              />
            ) }
          </Stack>
        </Stack>
      )) }
    </>
  );
};

export default SocialsModal;