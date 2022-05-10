import { FunctionComponent } from 'react';

interface NEWMLogoProps {
  readonly height?: string;
  readonly width?: string;
}

const NEWMLogo: FunctionComponent<NEWMLogoProps> = ({
  height = '150',
  width = '150',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 150 150"
  >
    <g clipPath="url(#clip0_206_5993)">
      <path
        fill="#0A0A0A"
        d="M23.055 126.99a69.837 69.837 0 0050.064 20.465c38.601-.408 69.562-32.041 69.151-70.652a69.796 69.796 0 00-20.466-48.668A69.76 69.76 0 0073.119 7.732C34.553 7.343 2.98 38.294 2.59 76.863a69.848 69.848 0 005.183 27.12 70.889 70.889 0 0015.284 22.996v.011z"
      ></path>
      <path
        fill="url(#paint0_linear_206_5993)"
        d="M21.999 128.043a74.15 74.15 0 01-16.121-23.969C-10.169 65.879 7.769 21.912 45.945 5.861a74.986 74.986 0 0182.219 16.245 75.028 75.028 0 0116.271 24.552c15.632 38.375-2.797 82.16-41.161 97.796a74.987 74.987 0 01-57.312-.289A74.109 74.109 0 0122 128.043zm1.062-1.06a69.83 69.83 0 0050.058 20.472c38.601-.408 69.562-32.041 69.151-70.652a69.796 69.796 0 00-20.466-48.668A69.76 69.76 0 0073.119 7.732C34.553 7.343 2.98 38.294 2.59 76.863a69.847 69.847 0 005.183 27.12 70.893 70.893 0 0015.283 22.997l.006.003z"
      ></path>
      <path
        fill="#fff"
        d="M105.149 42.486L82.415 81.6 67.181 55.368l.009 24.556 10.923 18.768h8.638l19.484-33.497V112.7h13.178V42.485h-14.264zM27.86 42.486V112.7h13.182l-.007-44.91 26.147 44.91V88.077L40.614 42.486H27.86z"
      ></path>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_206_5993"
        x1="21.78"
        x2="127.896"
        y1="127.941"
        y2="22.212"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6F6"></stop>
        <stop offset="0.14" stopColor="#FF6"></stop>
        <stop offset="0.28" stopColor="#F90"></stop>
        <stop offset="0.43" stopColor="#BF192D"></stop>
        <stop offset="0.57" stopColor="#F36"></stop>
        <stop offset="0.71" stopColor="#C3C"></stop>
        <stop offset="0.86" stopColor="#339"></stop>
        <stop offset="1" stopColor="#09C"></stop>
      </linearGradient>
      <clipPath id="clip0_206_5993">
        <path fill="#fff" d="M0 0H150V150H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default NEWMLogo;
