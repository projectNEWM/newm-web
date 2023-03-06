interface DiscordIconProps {
  readonly fillColor?: string;
  readonly height?: number;
  readonly width?: number;
}

const DiscordIcon = ({
  fillColor = "#DC3CAA",
  height = 16,
  width = 16,
}: DiscordIconProps) => (
  <svg
    width={ width }
    height={ height }
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_564_409)">
      <path
        d="M8.69386 10.9848C9.69269 10.9848 10.5017 11.7501 10.4834 12.6854C10.4834 13.6208 9.69436 14.3861 8.69386 14.3861C7.71167 14.3861 6.90261 13.6208 6.90261 12.6854C6.90261 11.7501 7.69336 10.9848 8.69386 10.9848ZM15.0997 10.9848C16.1002 10.9848 16.891 11.7501 16.891 12.6854C16.891 13.6208 16.1002 14.3861 15.0997 14.3861C14.1175 14.3861 13.3101 13.6208 13.3101 12.6854C13.3101 11.7501 14.0992 10.9848 15.0997 10.9848ZM16.7594 19C20.5434 18.8759 22 16.2857 22 16.2857C22 10.5358 19.5329 5.87427 19.5329 5.87427C17.0691 3.94742 14.7218 4.00014 14.7218 4.00014L14.4821 4.28585C17.3937 5.21442 18.7455 6.55454 18.7455 6.55454C17.1558 5.63956 15.4038 5.05683 13.5915 4.84027C12.4419 4.70762 11.2807 4.71905 10.1338 4.87428C10.0306 4.87428 9.94407 4.89299 9.84252 4.91C9.24322 4.96442 7.78658 5.19571 5.95539 6.03584C5.32279 6.33856 4.9449 6.55454 4.9449 6.55454C4.9449 6.55454 6.36657 5.14299 9.44798 4.21443L9.27651 4.00014C9.27651 4.00014 6.93091 3.94742 4.46546 5.87597C4.46546 5.87597 2 10.5358 2 16.2857C2 16.2857 3.43832 18.8742 7.22224 19C7.22224 19 7.85484 18.1973 8.3709 17.5187C6.19511 16.8385 5.3744 15.4099 5.3744 15.4099C5.3744 15.4099 5.5442 15.5357 5.85217 15.7143C5.86882 15.7313 5.88547 15.75 5.92043 15.767C5.97203 15.8045 6.02364 15.8215 6.07525 15.8572C6.50308 16.1072 6.93091 16.3027 7.32379 16.4643C8.0263 16.75 8.86532 17.0357 9.84252 17.233C11.3063 17.5261 12.8114 17.5319 14.2773 17.25C15.1312 17.0943 15.9643 16.8369 16.7594 16.483C17.3587 16.25 18.0263 15.9099 18.7288 15.4286C18.7288 15.4286 17.8731 16.8929 15.6291 17.5544C16.1435 18.233 16.7611 19 16.7611 19H16.7594Z"
        fill={ fillColor }
      />
    </g>
    <defs>
      <clipPath id="clip0_564_409">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default DiscordIcon;
