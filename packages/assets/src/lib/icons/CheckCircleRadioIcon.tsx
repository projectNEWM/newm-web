import { SvgIconProps, createSvgIcon } from "@mui/material";
import { forwardRef } from "react";
import theme from "@newm-web/theme";

const CheckCircleRadioIconBase = createSvgIcon(
  <svg
    fill="currentColor"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="19" rx="9.5" width="19" x="0.5" y="0.5" />
    <path
      d="M15.2588 5.99126C15.4931 6.22567 15.6248 6.54355 15.6248 6.87501C15.6248 7.20646 15.4931 7.52435 15.2588 7.75876L9.00877 14.0088C8.77436 14.2431 8.45648 14.3747 8.12502 14.3747C7.79357 14.3747 7.47568 14.2431 7.24127 14.0088L4.74127 11.5088C4.51357 11.273 4.38758 10.9573 4.39043 10.6295C4.39328 10.3018 4.52474 9.98824 4.7565 9.75648C4.98826 9.52472 5.30177 9.39326 5.62952 9.39041C5.95726 9.38757 6.27302 9.51356 6.50877 9.74126L8.12502 11.3575L13.4913 5.99126C13.7257 5.75692 14.0436 5.62527 14.375 5.62527C14.7065 5.62527 15.0244 5.75692 15.2588 5.99126Z"
      fill="var(--check-mark-color, white)"
    />
  </svg>,
  "CheckCircleRadioIcon"
);

const CheckCircleRadioIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  ({ sx, ...props }, ref) => {
    return (
      <CheckCircleRadioIconBase
        ref={ ref }
        sx={ {
          color: theme.colors.music,
          ...sx,
        } }
        { ...props }
      />
    );
  }
);

CheckCircleRadioIcon.displayName = "CheckCircleRadioIcon";

export default CheckCircleRadioIcon;
