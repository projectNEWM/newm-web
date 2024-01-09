import { SVGProps } from "react";

const CheckCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" height={ 20 } width={ 20 } xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10Zm-.997-6 7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829L4.76 9.757 9.003 14Z"
      fill={ props.fill }
    />
  </svg>
);

export default CheckCircle;
