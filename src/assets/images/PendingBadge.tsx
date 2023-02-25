const PendingBadge = (props: any) => (
  <svg
    width={ 20 }
    height={ 20 }
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    { ...props }
  >
    <path
      d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM11 10V5H9V12H15V10H11Z"
      fill="#3985F7"
    />
  </svg>
);

export default PendingBadge;
