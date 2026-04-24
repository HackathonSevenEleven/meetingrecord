import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const LayersIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 12L12 17L22 12L12 7L2 12Z"
      fill="currentColor"
    />
    <path
      d="M2 17L12 22L22 17L12 12L2 17Z"
      fill="currentColor"
      fillOpacity="0.5"
    />
    <path
      d="M2 7L12 12L22 7L12 2L2 7Z"
      fill="currentColor"
      fillOpacity="0.75"
    />
  </svg>
);

export const LayersIconOutline = ({ size = 24, ...props }: IconProps) => (
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
      d="M12 3.31066L4.62132 8L12 12.6893L19.3787 8L12 3.31066ZM11.4453 1.39321C11.7812 1.18579 12.2188 1.18579 12.5547 1.39321L21.5547 7.14321C21.8329 7.31535 22 7.62177 22 7.95L22 8.05C22 8.37823 21.8329 8.68465 21.5547 8.85679L12.5547 14.6068C12.2188 14.8142 11.7812 14.8142 11.4453 14.6068L2.44531 8.85679C2.16712 8.68465 2 8.37823 2 8.05L2 7.95C2 7.62177 2.16712 7.31535 2.44531 7.14321L11.4453 1.39321Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.44531 11.1432C2.81028 10.9179 3.29164 11.0302 3.51693 11.3952L12 16.6893L20.4831 11.3952C20.7084 11.0302 21.1897 10.9179 21.5547 11.1432C21.9197 11.3685 22.0319 11.8499 21.8066 12.2148L12.5547 18.6068C12.2188 18.8142 11.7812 18.8142 11.4453 18.6068L2.19345 12.2148C1.96816 11.8499 2.08034 11.3685 2.44531 11.1432Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.44531 15.1432C2.81028 14.9179 3.29164 15.0302 3.51693 15.3952L12 20.6893L20.4831 15.3952C20.7084 15.0302 21.1897 14.9179 21.5547 15.1432C21.9197 15.3685 22.0319 15.8499 21.8066 16.2148L12.5547 22.6068C12.2188 22.8142 11.7812 22.8142 11.4453 22.6068L2.19345 16.2148C1.96816 15.8499 2.08034 15.3685 2.44531 15.1432Z"
      fill="currentColor"
    />
  </svg>
);
