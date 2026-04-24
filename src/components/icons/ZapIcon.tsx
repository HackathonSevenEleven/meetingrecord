import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const ZapIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      fill="currentColor"
    />
  </svg>
);

export const ZapIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M13.3646 2.68377C13.5218 2.26634 13.4229 1.79533 13.1153 1.47639C12.8076 1.15745 12.3407 1.0421 11.9175 1.18472L4.91753 3.68472C4.38208 3.86612 4.00003 4.3726 4.00003 4.94118V10C4.00003 10.5523 4.44775 11 5.00003 11H10.382L9.11751 19.1838C9.01587 19.8423 9.39934 20.4782 10.0215 20.7029C10.6436 20.9276 11.3321 20.6759 11.6354 20.0692L19.6354 4.06924C19.8777 3.58475 19.8143 3.00476 19.4713 2.58467C19.1283 2.16457 18.5665 1.97885 18.0354 2.10692L13.3646 2.68377Z"
      fill="currentColor"
    />
  </svg>
);
