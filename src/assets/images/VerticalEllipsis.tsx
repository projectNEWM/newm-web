import * as React from "react";

const VerticalEllipsis = (props: any) => (
  <svg
    width={ 36 }
    height={ 36 }
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    { ...props }
  >
    <rect width={ 36 } height={ 36 } rx={ 18 } fill="#1C1C1E" />
    <path
      d="M18 10.5c-.917 0-1.667.75-1.667 1.667 0 .916.75 1.666 1.667 1.666s1.667-.75 1.667-1.666c0-.917-.75-1.667-1.667-1.667Zm0 11.667c-.917 0-1.667.75-1.667 1.666 0 .917.75 1.667 1.667 1.667s1.667-.75 1.667-1.667c0-.916-.75-1.666-1.667-1.666Zm0-5.834c-.917 0-1.667.75-1.667 1.667s.75 1.667 1.667 1.667 1.667-.75 1.667-1.667-.75-1.667-1.667-1.667Z"
      fill="#fff"
    />
  </svg>
);

export default VerticalEllipsis;
