/**
 * A card used with the MUI Grid component that retains a square shape.
 */

import { FunctionComponent } from "react";
import { Box, Card, CardProps } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * A styled component with height equal to its width. For use inside
 * the MUI <Grid container> component.
 */
const StyledGridCard = styled(Card)({
  position: "relative",
  background: "#0A0A0A 0% 0% no-repeat padding-box",
  color: "black",
  width: "100%",
  margin: "0px",
  opacity: ".7",
  paddingBottom: "100%",
  textAlign: "center",
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
  )
}

export default SquareGridCard;
