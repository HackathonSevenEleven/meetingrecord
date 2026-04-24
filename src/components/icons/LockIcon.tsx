import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const LockIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10H17C18.1046 10 19 10.8954 19 12V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V12C5 10.8954 5.89543 10 7 10H8ZM10 10H14V7C14 5.89543 13.1046 5 12 5C10.8954 5 10 5.89543 10 7V10Z"
      fill="currentColor"
    />
  </svg>
);

export const LockIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M12 4.5C10.6193 4.5 9.5 5.61929 9.5 7V10H14.5V7C14.5 5.61929 13.3807 4.5 12 4.5ZM16 10V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V10H7C5.89543 10 5 10.8954 5 12V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V12C19 10.8954 18.1046 10 17 10H16ZM7 11.5C6.72386 11.5 6.5 11.7239 6.5 12V19C6.5 19.2761 6.72386 19.5 7 19.5H17C17.2761 19.5 17.5 19.2761 17.5 19V12C17.5 11.7239 17.2761 11.5 17 11.5H7Z"
      fill="currentColor"
    />
  </svg>
);
