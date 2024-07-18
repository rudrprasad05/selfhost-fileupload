import React from "react";

const Svgcont = ({ option }: { option: "bg1" }) => {
  if (option == "bg1") return <Bg1 />;
};

const Bg1 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect fill="#ee5522" width="100%" height="100%" />
      <defs>
        <linearGradient
          id="a"
          gradientUnits="userSpaceOnUse"
          x1="100"
          y1="33"
          x2="100"
          y2="-3"
        >
          <stop offset="0" stop-color="#000" stop-opacity="0" />
          <stop offset="1" stop-color="#000" stop-opacity="1" />
        </linearGradient>
        <linearGradient
          id="b"
          gradientUnits="userSpaceOnUse"
          x1="100"
          y1="135"
          x2="100"
          y2="97"
        >
          <stop offset="0" stop-color="#000" stop-opacity="0" />
          <stop offset="1" stop-color="#000" stop-opacity="1" />
        </linearGradient>
      </defs>
      <g fill="#d23d09" fill-opacity="0.6">
        <rect x="100" width="100" height="100" />
        <rect y="100" width="100" height="100" />
      </g>
      <g fill-opacity="0.5">
        <polygon fill="url(#a)" points="100 30 0 0 200 0" />
        <polygon fill="url(#b)" points="100 100 0 130 0 100 200 100 200 130" />
      </g>
    </svg>
  );
};

export default Svgcont;
