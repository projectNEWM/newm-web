import InputMask from "react-input-mask";
import styled from "styled-components";
import { inputStyles } from "./Input";

const MaskedInput = styled(InputMask)`
  ${inputStyles}
`;

export default MaskedInput;
