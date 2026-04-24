import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const MessageIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H6L2 22V6C2 4.89543 2.89543 4 4 4Z"
      fill="currentColor"
    />
  </svg>
);

export const MessageIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M4 5.5C3.72386 5.5 3.5 5.72386 3.5 6V19.0858L5.79289 16.7929C5.98043 16.6054 6.23478 16.5 6.5 16.5H20C20.2761 16.5 20.5 16.2761 20.5 16V6C20.5 5.72386 20.2761 5.5 20 5.5H4ZM2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V16C22 17.1046 21.1046 18 20 18H6.91421L3.20711 21.7071C2.95296 21.9613 2.57454 22.0413 2.24409 21.9111C1.91364 21.7809 1.7 21.4652 1.7 21.1111L2 6Z"
      fill="currentColor"
    />
  </svg>
);
