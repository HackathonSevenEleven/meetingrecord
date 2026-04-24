import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const CheckIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M18.1592 4.45901C18.4579 3.99472 19.0766 3.86063 19.541 4.15921C20.0053 4.45794 20.1394 5.07659 19.8408 5.54104L10.8408 19.541C10.6667 19.8117 10.3731 19.9824 10.0518 19.9991C9.73022 20.0157 9.41988 19.8764 9.21875 19.625L4.21875 13.375C3.87374 12.9438 3.94374 12.3138 4.375 11.9688C4.80626 11.6238 5.43624 11.6938 5.78125 12.125L9.91113 17.2881L18.1592 4.45901Z" 
      fill="currentColor" 
    />
  </svg>
);

export const CheckIconOutline: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M18.3691 4.59475C18.5931 4.24638 19.0569 4.14534 19.4053 4.36916C19.7536 4.59311 19.8547 5.05689 19.6309 5.40529L10.6309 19.4053C10.5003 19.6083 10.2801 19.7365 10.0391 19.749C9.79791 19.7615 9.56491 19.6573 9.41406 19.4688L4.41406 13.2188C4.15531 12.8953 4.2078 12.4228 4.53125 12.1641C4.8547 11.9053 5.32718 11.9578 5.58594 12.2813L9.93359 17.7158L18.3691 4.59475Z" 
      fill="currentColor" 
    />
  </svg>
);
