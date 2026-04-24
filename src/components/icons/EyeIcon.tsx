import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const EyeIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 4C7.58172 4 3.76811 6.94288 2.14251 11.5528C2.04939 11.8343 2.04939 12.1657 2.14251 12.4472C3.76811 17.0571 7.58172 20 12 20C16.4183 20 20.2319 17.0571 21.8575 12.4472C21.9506 12.1657 21.9506 11.8343 21.8575 11.5528C20.2319 6.94288 16.4183 4 12 4ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z"
      fill="currentColor"
    />
  </svg>
);

export const EyeIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M12 5.5C8.41015 5.5 5.12289 7.86328 3.5829 11.5146L3.57489 11.5339C3.47503 11.767 3.47503 12.033 3.57489 12.2661L3.5829 12.2854C5.12289 15.9367 8.41015 18.5 12 18.5C15.5899 18.5 18.8771 15.9367 20.4171 12.2854L20.4251 12.2661C20.525 12.033 20.525 11.767 20.4251 11.5339L20.4171 11.5146C18.8771 7.86328 15.5899 5.5 12 5.5ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z"
      fill="currentColor"
    />
  </svg>
);
