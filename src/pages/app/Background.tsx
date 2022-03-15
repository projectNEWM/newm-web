import { styled } from "@mui/material/styles";

const BackgroundImage = styled("div")({
  backgroundImage: "url(\"https://i.postimg.cc/TPTmSRWB/bg-img.png\")",
  backgroundPosition: "top center",
  backgroundRepeat: "repeat",
  backgroundSize: `${window.innerWidth}px auto`,
  bottom: 0,
  height: "100%",
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: -20,
});

const BackgroundOverlay = styled("div")({
  backgroundColor: "rgba(0, 0, 0, 0.25)",
  bottom: 0,
  left: 0,
  position: "absolute",
  right: 0,
  top: 0,
  zIndex: -10,
});

/**
 * Background image with darkened overlay.
 */
const Background = () => (
  <>
    <BackgroundImage />
    <BackgroundOverlay />
  </>
);

export default Background;
