const LoadingSpinner = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="url(#paint0_angular_1328_1351)"
      />
      <defs>
        <radialGradient
          id="paint0_angular_1328_1351"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12 12) scale(12)"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.0001" stopColor="#FF3366" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default LoadingSpinner;
