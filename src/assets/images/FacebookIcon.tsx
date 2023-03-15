interface FacebookIconProps {
  readonly fillColor?: string;
  readonly height?: number;
  readonly width?: number;
}

const FacebookIcon = ({
  fillColor = "#DC3CAA",
  height = 16,
  width = 16,
}: FacebookIconProps) => (
  <svg
    width={ width }
    height={ height }
    viewBox="0 0 11 20"
    color="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 11.5h2.5l1-4H7v-2c0-1.03 0-2 2-2h1.5V.14C10.174.097 8.943 0 7.643 0 4.928 0 3 1.657 3 4.7v2.8H0v4h3V20h4v-8.5Z"
      fill={ fillColor }
    />
  </svg>
);

export default FacebookIcon;
