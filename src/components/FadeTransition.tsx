import { FunctionComponent } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";

// For the fade transition
const FadeDiv = styled.div`
  position: ${({ containerPosition = "relative" }) => containerPosition};
  width: 100%;
  height: 100%;
  top: 0;
  transition: 0.5s;
  opacity: ${({ state }: never) => (state === "entered" ? 1 : 0)};
  display: ${({ state }: never) => (state === "exited" ? "none" : "flex")};
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FadeTransition: FunctionComponent<any> = ({
  children,
  containerPosition,
  ...rest
}) => (
  <Transition { ...rest }>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { (state: any) => (
      <FadeDiv state={ state } containerPosition={ containerPosition }>
        { children }
      </FadeDiv>
    ) }
  </Transition>
);

// eslint-ensable @typescript-eslint/no-explicit-any

export default FadeTransition;
