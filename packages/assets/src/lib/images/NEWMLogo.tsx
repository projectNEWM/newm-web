import { FunctionComponent } from "react";

interface NEWMLogoProps {
  readonly height?: string;
  readonly width?: string;
}

const NEWMLogo: FunctionComponent<NEWMLogoProps> = ({
  height = "150",
  width = "150",
}) => (
  <svg
    width={ width }
    height={ height }
    viewBox="0 0 150 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_3_842)">
      <path
        d="M23.1435 127.549C29.7431 134.151 37.5933 139.37 46.2347 142.902C54.8761 146.433 64.1351 148.206 73.4699 148.115C112.272 147.705 143.396 115.915 142.984 77.1138C142.796 58.7456 135.408 41.1842 122.41 28.2043C109.411 15.2245 91.839 7.86234 73.4699 7.70035C34.7016 7.31022 2.96111 38.4139 2.56925 77.174C2.47497 86.5149 4.2466 95.7806 7.78028 104.428C11.3368 113.064 16.557 120.916 23.1435 127.538V127.549Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.9709 150.152C116.376 150.152 149.942 116.578 149.942 75.1616C149.942 33.7455 116.376 0.171021 74.9709 0.171021C33.5656 0.171021 0 33.7455 0 75.1616C0 116.578 33.5656 150.152 74.9709 150.152ZM72.4918 147.587C111.112 147.587 142.419 116.271 142.419 77.6413C142.419 39.0114 111.112 7.69571 72.4918 7.69571C33.8721 7.69571 2.56457 39.0114 2.56457 77.6413C2.56457 116.271 33.8721 147.587 72.4918 147.587Z"
        fill="url(#paint0_linear_3_842)"
      />
      <path
        d="M105.149 42.4855L82.4149 81.6004L67.1814 55.3682L67.1899 79.9244L78.1133 98.6917H86.7508L106.235 65.1948V112.7H119.413V42.4855H105.149Z"
        fill="white"
      />
      <path
        d="M27.8599 42.4855V112.7H41.0418L41.0349 67.7891L67.1816 112.7V88.0767L40.6143 42.4855H27.8599Z"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_3_842"
        x1="20.6875"
        y1="128.177"
        x2="128.798"
        y2="21.5202"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC33C" />
        <stop offset="0.197917" stopColor="#FF6E32" />
        <stop offset="0.395833" stopColor="#F53C69" />
        <stop offset="0.59375" stopColor="#C341F0" />
        <stop offset="0.791667" stopColor="#5091EB" />
        <stop offset="1" stopColor="#41BE91" />
      </linearGradient>
      <clipPath id="clip0_3_842">
        <rect width="150" height="150" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default NEWMLogo;
