/**
 * Fixed position background image with darkened overlay
 */

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
  bottom: 0,
  height: "100%",
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
});

const BackgroundOverlay = styled("div")({
  backgroundColor: "rgba(0, 0, 0, 0.25)",
  bottom: 0,
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
});

const Background = ({ children }: BackgroundProps) => (
  <BackgroundImage>
    <BackgroundOverlay>{ children }</BackgroundOverlay>
  </BackgroundImage>
);

export default Background;
