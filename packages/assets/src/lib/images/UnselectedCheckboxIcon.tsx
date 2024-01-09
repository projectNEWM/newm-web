import { SVGProps } from "react";

const UnselectedCheckboxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={ 20 }
    width={ 20 }
    xmlns="http://www.w3.org/2000/svg"
    { ...props }
  >
    <rect fill="#1C1C1E" height={ 18 } rx={ 1 } width={ 18 } x={ 1 } y={ 1 } />
    <rect
      height={ 18 }
      rx={ 1 }
      stroke="#2C2C2E"
      strokeWidth={ 2 }
      width={ 18 }
      x={ 1 }
      y={ 1 }
    />
  </svg>
);

export default UnselectedCheckboxIcon;
