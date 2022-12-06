import { IconProps } from "common";
import theme from "theme";

const InfoCircleLine = ({ currentColor = theme.colors.red }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1023_8181)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0Z"
        fill={ currentColor }
      />
      <rect
        x="13"
        y="13"
        width="2"
        height="6"
        transform="rotate(-180 13 13)"
        fill={ currentColor }
      />
      <rect
        x="13"
        y="17"
        width="2"
        height="2"
        transform="rotate(-180 13 17)"
        fill={ currentColor }
      />
    </g>
    <defs>
      <clipPath id="clip0_1023_8181">
        <rect
          width="24"
          height="24"
          fill={ theme.colors.white }
          transform="translate(24 24) rotate(-180)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default InfoCircleLine;
