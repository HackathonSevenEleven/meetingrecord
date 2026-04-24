import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const UsersIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
      fill="currentColor"
    />
    <path
      d="M17 10C18.66 10 20 8.66 20 7C20 5.34 18.66 4 17 4C16.59 4 16.2 4.08 15.84 4.21C16.56 5.18 17 6.37 17 7.67V10Z"
      fill="currentColor"
    />
    <path
      d="M21 18V20H24V18C24 16.31 21.37 15.16 19 14.67C20.23 15.56 21 16.7 21 18Z"
      fill="currentColor"
    />
    <path
      d="M7 10V7.67C7 6.37 7.44 5.18 8.16 4.21C7.8 4.08 7.41 4 7 4C5.34 4 4 5.34 4 7C4 8.66 5.34 10 7 10Z"
      fill="currentColor"
    />
    <path
      d="M5 14.67C2.63 15.16 0 16.31 0 18V20H3V18C3 16.7 3.77 15.56 5 14.67Z"
      fill="currentColor"
    />
  </svg>
);

export const UsersIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M12 5.5C10.6193 5.5 9.5 6.61929 9.5 8C9.5 9.38071 10.6193 10.5 12 10.5C13.3807 10.5 14.5 9.38071 14.5 8C14.5 6.61929 13.3807 5.5 12 5.5ZM8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 15.5C9.76472 15.5 7.75917 16.0913 6.35285 16.8605C5.65235 17.2436 5.12124 17.6643 4.76988 18.0767C4.42463 18.4815 4.25 18.8692 4.25 19.25V19.75H19.75V19.25C19.75 18.8692 19.5754 18.4815 19.2301 18.0767C18.8788 17.6643 18.3477 17.2436 17.6472 16.8605C16.2408 16.0913 14.2353 15.5 12 15.5ZM5.5 14.9203C7.17433 14.0043 9.49583 13.5 12 13.5C14.5042 13.5 16.8257 14.0043 18.5 14.9203C20.1678 15.8327 21.25 17.2077 21.25 19.25V20.25C21.25 20.6642 20.9142 21 20.5 21H3.5C3.08579 21 2.75 20.6642 2.75 20.25V19.25C2.75 17.2077 3.83217 15.8327 5.5 14.9203Z"
      fill="currentColor"
    />
  </svg>
);
