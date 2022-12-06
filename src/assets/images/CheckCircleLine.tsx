import { IconProps } from "common";
import theme from "theme";

const CheckCircleLine = ({ currentColor = theme.colors.green }: IconProps) => (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.4999 15.0003L16.9995 8.5L18 9.49982L10.4999 16.9999L6 12.5L6.99982 11.5002L10.4999 15.0003Z"
      fill={ currentColor }
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.4999 15.0001L16.9994 8.49988L17.9999 9.49971L10.4999 16.9998L5.99995 12.4999L6.99977 11.5001L10.4999 15.0001ZM10.4998 14.5759L16.9993 8.07568L18.4243 9.49963L10.4999 17.4241L5.57568 12.4999L6.99977 11.0758L10.4998 14.5759Z"
      fill={ currentColor }
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
      fill={ currentColor }
    />
  </svg>
);

export default CheckCircleLine;
