import { SVGProps } from "react";

const UnselectedCheckboxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={ 20 }
    height={ 20 }
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    { ...props }
  >
    <rect x={ 1 } y={ 1 } width={ 18 } height={ 18 } rx={ 1 } fill="#1C1C1E" />
    <rect
      x={ 1 }
      y={ 1 }
      width={ 18 }
      height={ 18 }
      rx={ 1 }
      stroke="#2C2C2E"
      strokeWidth={ 2 }
    />
  </svg>
);

export default UnselectedCheckboxIcon;
