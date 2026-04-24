import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const DatabaseIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 2C16.4183 2 20 3.79086 20 6C20 8.20914 16.4183 10 12 10C7.58172 10 4 8.20914 4 6C4 3.79086 7.58172 2 12 2Z"
      fill="currentColor"
    />
    <path
      d="M4 9V12C4 14.2091 7.58172 16 12 16C16.4183 16 20 14.2091 20 12V9C20 11.2091 16.4183 13 12 13C7.58172 13 4 11.2091 4 9Z"
      fill="currentColor"
    />
    <path
      d="M4 15V18C4 20.2091 7.58172 22 12 22C16.4183 22 20 20.2091 20 18V15C20 17.2091 16.4183 19 12 19C7.58172 19 4 17.2091 4 15Z"
      fill="currentColor"
    />
  </svg>
);

export const DatabaseIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M12 3.5C8.41015 3.5 5.5 4.84315 5.5 6C5.5 7.15685 8.41015 8.5 12 8.5C15.5899 8.5 18.5 7.15685 18.5 6C18.5 4.84315 15.5899 3.5 12 3.5ZM4 6C4 3.79086 7.58172 2 12 2C16.4183 2 20 3.79086 20 6V18C20 20.2091 16.4183 22 12 22C7.58172 22 4 20.2091 4 18V6ZM5.5 9.11803V12C5.5 13.1569 8.41015 14.5 12 14.5C15.5899 14.5 18.5 13.1569 18.5 12V9.11803C17.0091 10.2991 14.6235 11 12 11C9.37646 11 6.99089 10.2991 5.5 9.11803ZM5.5 15.118V18C5.5 19.1569 8.41015 20.5 12 20.5C15.5899 20.5 18.5 19.1569 18.5 18V15.118C17.0091 16.2991 14.6235 17 12 17C9.37646 17 6.99089 16.2991 5.5 15.118Z"
      fill="currentColor"
    />
  </svg>
);
