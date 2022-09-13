import { FunctionComponent } from "react";

interface NEWMLogoProps {
  readonly height?: number;
  readonly width?: number;
}

const NEWMLogo: FunctionComponent<NEWMLogoProps> = ({
  width = 150,
  height = 150,
}) => (
  <svg
    width={ width }
    height={ height }
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#a)">
      <path
        d="M16.972 93.536a51.484 51.484 0 0 0 36.906 15.082c28.455-.301 51.279-23.614 50.976-52.068A51.434 51.434 0 0 0 53.878 5.647C25.448 5.361 2.17 28.17 1.884 56.594A51.461 51.461 0 0 0 5.705 76.58a52.242 52.242 0 0 0 11.267 16.948v.008Z"
        fill="#000"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54.979 110.112c30.364 0 54.978-24.622 54.978-54.993 0-30.372-24.614-54.994-54.978-54.994S0 24.747 0 55.12c0 30.371 24.615 54.993 54.979 54.993Zm-1.818-1.882c28.32 0 51.28-22.964 51.28-51.293 0-28.328-22.96-51.293-51.28-51.293-28.322 0-51.28 22.965-51.28 51.293 0 28.329 22.959 51.293 51.28 51.293Z"
        fill="url(#b)"
      />
      <path
        d="M77.11 31.156 60.437 59.84 49.266 40.603l.007 18.008 8.01 13.763h6.334l14.289-24.565v34.837h9.664v-51.49H77.11ZM20.43 31.156v51.49h9.667l-.005-32.934 19.174 32.934V64.59L29.784 31.156H20.43Z"
        fill="#fff"
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={ 15.171 }
        y1={ 93.996 }
        x2={ 94.452 }
        y2={ 15.781 }
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC33C" />
        <stop offset={ 0.198 } stopColor="#FF6E32" />
        <stop offset={ 0.396 } stopColor="#F53C69" />
        <stop offset={ 0.594 } stopColor="#C341F0" />
        <stop offset={ 0.792 } stopColor="#5091EB" />
        <stop offset={ 1 } stopColor="#41BE91" />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h110v110H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default NEWMLogo;
