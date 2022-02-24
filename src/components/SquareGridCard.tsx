/**
 * A card used with the MUI Grid component that retains a square shape.
 */

import { Box, Card, CardProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FunctionComponent } from "react";

const StyledGridCard = styled(Card)({
  background: "#0A0A0A 0% 0% no-repeat padding-box",
  color: "black",
  margin: "0px",
  opacity: ".7",
  paddingBottom: "100%",
  position: "relative",
  textAlign: "center",
  width: "100%",
});

const SquareGridCard: FunctionComponent<CardProps> = ({
  children,
}) => {
  return (
    <StyledGridCard>
      <Box
        position="absolute"
        p={ 3 }
        top={ 0 }
        right={ 0 }
        bottom={ 0 }
        left={ 0 }
      >
        { children }
      </Box>
    </StyledGridCard>
  );
};

export default SquareGridCard;
