import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const CreditCardIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 8H4V14C4 15.1 4.9 16 6 16H18C19.1 16 20 15.1 20 14V8ZM10 12C10.55 12 11 12.45 11 13C11 13.55 10.55 14 10 14H7C6.45 14 6 13.55 6 13C6 12.45 6.45 12 7 12H10ZM20 6C20 4.9 19.1 4 18 4H6C4.9 4 4 4.9 4 6H20ZM22 14C22 16.21 20.21 18 18 18H6C3.79 18 2 16.21 2 14V6C2 3.79 3.79 2 6 2H18C20.21 2 22 3.79 22 6V14Z"
      fill="currentColor"
    />
  </svg>
);

export const CreditCardIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M20.25 7.75H3.75V14C3.75 15.24 4.76 16.25 6 16.25H18C19.24 16.25 20.25 15.24 20.25 14V7.75ZM10 12.25C10.41 12.25 10.75 12.59 10.75 13C10.75 13.41 10.41 13.75 10 13.75H7C6.59 13.75 6.25 13.41 6.25 13C6.25 12.59 6.59 12.25 7 12.25H10ZM20.25 6C20.25 4.76 19.24 3.75 18 3.75H6C4.76 3.75 3.75 4.76 3.75 6V6.25H20.25V6ZM21.75 14C21.75 16.07 20.07 17.75 18 17.75H6C3.93 17.75 2.25 16.07 2.25 14V6C2.25 3.93 3.93 2.25 6 2.25H18C20.07 2.25 21.75 3.93 21.75 6V14Z"
      fill="currentColor"
    />
  </svg>
);
