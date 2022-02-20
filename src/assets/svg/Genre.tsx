import React from "react"

const Genre = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={101} height={29} {...props}>
    <defs>
      <filter
        id="a"
        x={0}
        y={0}
        width={101}
        height={29}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1} result="blur" />
        <feFlood />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g filter="url(#a)">
      <g
        data-name="Frame"
        transform="translate(3 2)"
        fill="#151515"
        stroke="#bc40c6"
      >
        <rect width={95} height={23} rx={11.5} stroke="none" />
        <rect x={0.5} y={0.5} width={94} height={22} rx={11} fill="none" />
      </g>
    </g>
    <g transform="translate(23 7)" fill="#fff">
      <text
        transform="translate(19 10)"
        fontSize={10}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={-28.047} y={0}>
          {"Dance"}
        </tspan>
      </text>
      <text
        transform="translate(28 10)"
        fontSize={10}
        fontFamily="Roboto-Regular, Roboto"
      >
        <tspan x={0} y={0}>
          {"Hip-Hop"}
        </tspan>
      </text>
      <circle cx={1.5} cy={1.5} r={1.5} transform="translate(22 5)" />
    </g>
  </svg>
)

export default Genre;
