import * as React from "react";

const DropdownAdornment = (props: any) => (
  <svg
    width={ 12 }
    height={ 6 }
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    { ...props }
  >
    <path d="M6 6 0 0h12L6 6Z" fill="#fff" />
  </svg>
);

export default DropdownAdornment;
