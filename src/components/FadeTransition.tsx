import { Transition } from "react-transition-group";
import styled from "styled-components";

// For the fade transition
const FadeDiv = styled.div`
  transition: 0.5s;
  opacity: ${({ state }: never) => (state === "entered" ? 1 : 0)};
  display: ${({ state }: never) => (state === "exited" ? "none" : "block")};
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FadeTransition = ({ children, ...rest }: any): JSX.Element => (
  <Transition { ...rest }>
    { (state: never) => <FadeDiv state={ state }>{ children }</FadeDiv> }
  </Transition>
);

export default FadeTransition;
