import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const ThumbsUpIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 19.75C4.92893 19.75 3.25 18.0711 3.25 16V12C3.25 9.92893 4.92893 8.25 7 8.25V19.75Z"
      fill="currentColor"
    />
    <path
      d="M13.855 3.25C15.822 3.25 17.037 5.396 16.025 7.082L15.325 8.25H16.569C19.222 8.25 21.036 10.93 20.051 13.393L18.451 17.393C17.882 18.816 16.502 19.75 14.969 19.75H9V7.798L11.88 4.199C12.36 3.599 13.087 3.25 13.855 3.25Z"
      fill="currentColor"
    />
  </svg>
);

export const ThumbsUpIconOutline = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.25 19.5H7C5.067 19.5 3.5 17.933 3.5 16V12C3.5 10.067 5.067 8.5 7 8.5H7.25V19.5Z"
      fill="currentColor"
    />
    <path
      d="M13.855 3.5C15.628 3.5 16.722 5.433 15.811 6.953L14.883 8.5H16.569C19.045 8.5 20.738 11.001 19.818 13.3L18.219 17.3C17.687 18.629 16.4 19.5 14.969 19.5H8.75V8.5H8.76L12.075 4.355C12.508 3.815 13.163 3.5 13.855 3.5Z"
      fill="currentColor"
    />
  </svg>
);
