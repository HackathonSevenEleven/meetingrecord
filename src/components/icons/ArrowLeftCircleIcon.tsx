import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ArrowLeftCircleIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M20 12C20 7.582 16.418 4 12 4C7.582 4 4 7.582 4 12C4 16.418 7.582 20 12 20C16.418 20 20 16.418 20 12ZM22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12Z" 
      fill="currentColor" 
    />
    <path 
      d="M10.707 15.707C10.317 16.098 9.683 16.098 9.293 15.707L6.293 12.707C6.105 12.519 6 12.265 6 12C6 11.735 6.105 11.481 6.293 11.293L9.293 8.293C9.683 7.902 10.317 7.902 10.707 8.293C11.098 8.683 11.098 9.317 10.707 9.707L9.414 11H17C17.552 11 18 11.448 18 12C18 12.552 17.552 13 17 13H9.414L10.707 14.293C11.098 14.683 11.098 15.317 10.707 15.707Z" 
      fill="currentColor" 
    />
  </svg>
);

export const ArrowLeftCircleIconOutline: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M20.25 12C20.25 7.444 16.556 3.75 12 3.75C7.444 3.75 3.75 7.444 3.75 12C3.75 16.556 7.444 20.25 12 20.25C16.556 20.25 20.25 16.556 20.25 12ZM21.75 12C21.75 17.385 17.385 21.75 12 21.75C6.615 21.75 2.25 17.385 2.25 12C2.25 6.615 6.615 2.25 12 2.25C17.385 2.25 21.75 6.615 21.75 12Z" 
      fill="currentColor" 
    />
    <path 
      d="M10.53 15.53C10.237 15.823 9.763 15.823 9.47 15.53L6.47 12.53C6.329 12.39 6.25 12.199 6.25 12C6.25 11.801 6.329 11.61 6.47 11.47L9.47 8.47C9.763 8.177 10.237 8.177 10.53 8.47C10.823 8.763 10.823 9.237 10.53 9.53L8.811 11.25H17C17.414 11.25 17.75 11.586 17.75 12C17.75 12.414 17.414 12.75 17 12.75H8.811L10.53 14.47C10.823 14.763 10.823 15.237 10.53 15.53Z" 
      fill="currentColor" 
    />
  </svg>
);
