/**
 * Fixed position background image with darkened overlay.
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
  display: "flex",
  flexGrow: 1,
  height: "100%",
  position: "relative",
  width: "100%",
});

const BackgroundOverlay = styled("div")({
  backgroundColor: "rgba(0, 0, 0, 0.25)",
  bottom: 0,
  display: "flex",
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
