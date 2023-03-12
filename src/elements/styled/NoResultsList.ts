import theme from "theme";
import styled from "styled-components";

const NoResultsText = styled.span`
  background-color: ${theme.colors.grey500};
  border-radius: 4px;
  border: 2px solid ${theme.colors.grey400};
  color: ${theme.colors.grey100};
  margin: 4px 0 0;
  padding: 12px 12px;
  position: absolute;
  width: 100%;
`;

export default NoResultsText;
