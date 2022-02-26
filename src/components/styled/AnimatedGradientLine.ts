import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const AnimatedGradient = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;

const AnimatedGradientLine = styled("hr")({
  animation: `${AnimatedGradient} 10s ease infinite;`,
  background: "linear-gradient(270deg, #cc33cc, #323290);",
  backgroundSize: "400% 400%;",
  border: "none",
  height: "3px",
});

export default AnimatedGradientLine;
