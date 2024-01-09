import { SVGProps } from "react";

const DropdownAdornment = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={ 6 }
    width={ 12 }
    xmlns="http://www.w3.org/2000/svg"
    { ...props }
  >
    <path d="M6 6 0 0h12L6 6Z" fill="#fff" />
  </svg>
);

export default DropdownAdornment;
