import { SVGProps } from "react";

const PlayButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={ 36 }
    width={ 36 }
    xmlns="http://www.w3.org/2000/svg"
    { ...props }
  >
    <rect fill="#1C1C1E" height={ 36 } rx={ 18 } width={ 36 } />
    <path
      d="m24.147 18.347-8.833 5.888a.417.417 0 0 1-.647-.347V12.112a.417.417 0 0 1 .647-.347l8.833 5.888a.418.418 0 0 1 0 .694Z"
      fill="#fff"
    />
  </svg>
);

export default PlayButton;
