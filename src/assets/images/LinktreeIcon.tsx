interface LinktreeIconProps {
  readonly fillColor?: string;
  readonly height?: number;
  readonly width?: number;
}

const LinktreeIcon = ({
  fillColor = "#DC3CAA",
  height = 16,
  width = 16,
}: LinktreeIconProps) => (
  <svg
    width={ width }
    height={ height }
    fill={ fillColor }
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Linktree</title>
    <path d="m13.73635 5.85251 4.00467-4.11665 2.3248 2.3808-4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766-2.3248 2.3338L12.0005 12.099l-5.74052 5.76852-2.3248-2.3248 4.22864-4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248-2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z" />
  </svg>
);

export default LinktreeIcon;
