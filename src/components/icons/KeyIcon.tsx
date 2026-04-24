import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const KeyIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.65 10C11.83 7.67 9.61 6 7 6C3.69 6 1 8.69 1 12C1 15.31 3.69 18 7 18C9.61 18 11.83 16.33 12.65 14H17V18H21V14H23V10H12.65ZM7 14C5.9 14 5 13.1 5 12C5 10.9 5.9 10 7 10C8.1 10 9 10.9 9 12C9 13.1 8.1 14 7 14Z"
      fill="currentColor"
    />
  </svg>
);

export const KeyIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M7 7.5C4.51472 7.5 2.5 9.51472 2.5 12C2.5 14.4853 4.51472 16.5 7 16.5C8.98043 16.5 10.6656 15.1776 11.2649 13.3519C11.3707 13.0295 11.6677 12.8125 12.0063 12.8125H17.8125V17.25C17.8125 17.6642 18.1483 18 18.5625 18H20.4375C20.8517 18 21.1875 17.6642 21.1875 17.25V12.8125H22.25C22.6642 12.8125 23 12.4767 23 12.0625V11.9375C23 11.5233 22.6642 11.1875 22.25 11.1875H12.0063C11.6677 11.1875 11.3707 10.9705 11.2649 10.6481C10.6656 8.82235 8.98043 7.5 7 7.5ZM7 10.5C6.17157 10.5 5.5 11.1716 5.5 12C5.5 12.8284 6.17157 13.5 7 13.5C7.82843 13.5 8.5 12.8284 8.5 12C8.5 11.1716 7.82843 10.5 7 10.5Z"
      fill="currentColor"
    />
  </svg>
);
