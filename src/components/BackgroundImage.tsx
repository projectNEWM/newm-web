import { styled } from "@mui/material/styles";

// interface BackgroundImageProps {
//   url: string
// }

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


export default BackgroundImage;
