import { styled } from "@mui/material/styles";
import theme from "@newm-web/theme";

const Clickable = styled("button")`
  background: none;
  border: none;
  color: inherit;
  margin: 0;
  padding: ${theme.spacing(1.5)};
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  border-radius: ${theme.spacing(1)};
  &:hover {
    background-color: ${(props) =>
      props.onClick ? "rgba(256, 256, 256, 0.05)" : "inherit"};
  }
`;

export default Clickable;
