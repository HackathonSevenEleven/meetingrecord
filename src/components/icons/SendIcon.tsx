import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const SendIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
      fill="currentColor"
    />
  </svg>
);

export const SendIconOutline = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.19529 3.44217C2.33379 3.16954 2.59712 2.97854 2.90212 2.92885C3.20711 2.87916 3.51764 2.97668 3.73431 3.19219L21.7343 11.1922C21.9063 11.356 22.01 11.5791 22.01 11.815C22.01 12.0509 21.9063 12.274 21.7343 12.4378L3.73431 20.4378C3.51764 20.6533 3.20711 20.7508 2.90212 20.7012C2.59712 20.6515 2.33379 20.4605 2.19529 20.1878C2.05678 19.9152 2.05678 19.5948 2.19529 19.3222L3.5 12L2.19529 4.67784C2.05678 4.40521 2.05678 4.0848 2.19529 3.81217V3.44217ZM5 11.25L15.5 11.25L5 9.08579L5 11.25ZM5 12.75L5 14.9142L15.5 12.75L5 12.75Z"
      fill="currentColor"
    />
  </svg>
);
