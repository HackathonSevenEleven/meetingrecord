import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const PlayIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 6.06C5 2.878 8.536 0.97 11.196 2.72L20.234 8.66C22.639 10.24 22.638 13.76 20.234 15.34L11.196 21.28C8.537 23.03 5 21.12 5 17.94V6.06Z"
      fill="currentColor"
    />
  </svg>
);

export const PlayIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M5 6.06C5 2.88 8.536 0.97 11.196 2.72L20.234 8.66C22.639 10.24 22.638 13.76 20.234 15.34L11.196 21.28C8.537 23.03 5 21.12 5 17.94V6.06ZM7 17.94C7 19.53 8.769 20.48 10.099 19.61L19.136 13.67C20.338 12.88 20.338 11.12 19.136 10.33L10.099 4.39C8.769 3.52 7 4.47 7 6.06V17.94Z"
      fill="currentColor"
    />
  </svg>
);
