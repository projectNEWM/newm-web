import { styled } from "@mui/material/styles";

const Clickable = styled("button")`
  background: none;
  border: none;
  color: inherit;
  margin: 0;
  padding: 0;
  border-radius: 8px;
  &:hover * {
    text-decoration: underline;
  }
`;

export default Clickable;
