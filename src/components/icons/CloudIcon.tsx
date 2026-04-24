import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const CloudIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.5 19C4.01472 19 2 16.9853 2 14.5C2 12.1564 3.79151 10.2313 6.07974 10.0194C6.54781 7.17213 9.02024 5 12 5C14.9798 5 17.4522 7.17213 17.9203 10.0194C20.2085 10.2313 22 12.1564 22 14.5C22 16.9853 19.9853 19 17.5 19H6.5Z"
      fill="currentColor"
    />
  </svg>
);

export const CloudIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M12 6.5C9.65279 6.5 7.71182 8.17816 7.31025 10.4156C7.24802 10.7707 6.94146 11.0324 6.58103 11.0387C4.81018 11.0697 3.5 12.5933 3.5 14.5C3.5 16.1569 4.84315 17.5 6.5 17.5H17.5C19.1569 17.5 20.5 16.1569 20.5 14.5C20.5 12.5933 19.1898 11.0697 17.419 11.0387C17.0585 11.0324 16.752 10.7707 16.6897 10.4156C16.2882 8.17816 14.3472 6.5 12 6.5ZM5.82999 9.55186C6.51332 6.85894 8.99716 5 12 5C15.0028 5 17.4867 6.85894 18.17 9.55186C20.3555 10.0058 22 11.9718 22 14.5C22 16.9853 19.9853 19 17.5 19H6.5C4.01472 19 2 16.9853 2 14.5C2 11.9718 3.64446 10.0058 5.82999 9.55186Z"
      fill="currentColor"
    />
  </svg>
);
