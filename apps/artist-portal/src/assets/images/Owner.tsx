const Owner = (props: any) => (
  <svg
    width={ 32 }
    height={ 38 }
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    { ...props }
  >
    <path
      d="M14 22.333v13.334H.667A13.333 13.333 0 0 1 14 22.333Zm10 12.5-4.898 2.575.935-5.453-3.962-3.863 5.477-.797L24 22.333l2.45 4.962 5.475.797-3.962 3.863.934 5.453L24 34.833ZM14 20.667c-5.525 0-10-4.475-10-10s4.475-10 10-10 10 4.475 10 10-4.475 10-10 10Z"
      fill="url(#a)"
    />
    <defs>
      <linearGradient
        id="a"
        x1={ 0.667 }
        y1={ 37.408 }
        x2={ 39.615 }
        y2={ 12.875 }
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C3C" />
        <stop offset={ 1 } stopColor="#F36" />
      </linearGradient>
    </defs>
  </svg>
);

export default Owner;
