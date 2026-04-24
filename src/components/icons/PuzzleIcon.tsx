import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const PuzzleIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 8H17V6C17 3.79086 15.2091 2 13 2C10.7909 2 9 3.79086 9 6V8H6C4.89543 8 4 8.89543 4 10V13H6C8.20914 13 10 14.7909 10 17C10 19.2091 8.20914 21 6 21H4V22C4 23.1046 4.89543 24 6 24H18C19.1046 24 20 23.1046 20 22V18H22C23.1046 18 24 17.1046 24 16V10C24 8.89543 23.1046 8 22 8H20Z"
      fill="currentColor"
    />
  </svg>
);

export const PuzzleIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M13 3.5C11.6193 3.5 10.5 4.61929 10.5 6V8.5H6C5.72386 8.5 5.5 8.72386 5.5 9V12.5H6C7.38071 12.5 8.5 13.6193 8.5 15C8.5 16.3807 7.38071 17.5 6 17.5H5.5V20C5.5 20.2761 5.72386 20.5 6 20.5H9.5V20C9.5 18.6193 10.6193 17.5 12 17.5C13.3807 17.5 14.5 18.6193 14.5 20V20.5H18C18.2761 20.5 18.5 20.2761 18.5 20V15.5H19C20.3807 15.5 21.5 14.3807 21.5 13C21.5 11.6193 20.3807 10.5 19 10.5H18.5V9C18.5 8.72386 18.2761 8.5 18 8.5H14.5V6C14.5 4.61929 13.3807 3.5 12 3.5H13ZM9 6C9 3.79086 10.7909 2 13 2C15.2091 2 17 3.79086 17 6V7H18C19.1046 7 20 7.89543 20 9V9.5H19C16.7909 9.5 15 11.2909 15 13.5C15 15.7091 16.7909 17.5 19 17.5H20V20C20 21.1046 19.1046 22 18 22H15.5V20C15.5 17.7909 13.7091 16 11.5 16C9.29086 16 7.5 17.7909 7.5 20V22H6C4.89543 22 4 21.1046 4 20V17.5H6C8.20914 17.5 10 15.7091 10 13.5C10 11.2909 8.20914 9.5 6 9.5H4V9C4 7.89543 4.89543 7 6 7H9V6Z"
      fill="currentColor"
    />
  </svg>
);
