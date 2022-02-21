import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

interface BackgroundProps {
  children: ReactNode;
}

const BackgroundImage = styled("div")({
  backgroundImage: "url(\"https://i.postimg.cc/TPTmSRWB/bg-img.png\")",
  backgroundPosition: "center",
  backgroundRepeat: "repeat",
  backgroundSize: "cover",
  height: "100%",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  position: "absolute",
});

const BackgroundOverlay = styled("div")({
  backgroundColor: "rgba(0, 0, 0, 0.25)",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  position: "absolute",
});

/**
 * Background image with darkened overlay.
 */
const Background = ({ children }: BackgroundProps) => (
  <BackgroundImage>
    <BackgroundOverlay>
      { children }
    </BackgroundOverlay>
  </BackgroundImage>
);

export default Background;
