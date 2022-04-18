import styled from "styled-components";
import theme from "theme";

const {
  palette: { primary, secondary },
} = theme;

const HorizontalLine = styled.div`
  background: linear-gradient(to right, ${primary.main}, ${secondary.main});
  height: 1px;
  width: 100%;
`;

export default HorizontalLine;
