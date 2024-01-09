const CloseIcon = ({ width = 6, height = 6 }) => (
  <svg
    fill="none"
    height={ height }
    width={ width }
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m3 3 2 2M1 5l2-2-2 2Zm2-2 2-2-2 2Zm0 0L1 1l2 2Z"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={ 2 }
    />
  </svg>
);

export default CloseIcon;
