import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const XIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M17.793 6.793C18.183 6.402 18.816 6.402 19.207 6.793C19.598 7.183 19.598 7.816 19.207 8.207L13.414 14L19.207 19.793C19.598 20.183 19.598 20.816 19.207 21.207C18.816 21.598 18.183 21.598 17.793 21.207L12 15.414L6.207 21.207C5.816 21.598 5.183 21.598 4.793 21.207C4.402 20.816 4.402 20.183 4.793 19.793L10.586 14L4.793 8.207C4.402 7.816 4.402 7.183 4.793 6.793C5.183 6.402 5.816 6.402 6.207 6.793L12 12.586L17.793 6.793Z" 
      fill="currentColor" 
    />
  </svg>
);

export const XIconOutline: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M17.97 6.97C18.263 6.677 18.737 6.677 19.03 6.97C19.323 7.263 19.323 7.737 19.03 8.03L13.061 14L19.03 19.97C19.323 20.263 19.323 20.737 19.03 21.03C18.737 21.323 18.263 21.323 17.97 21.03L12 15.061L6.03 21.03C5.737 21.323 5.263 21.323 4.97 21.03C4.677 20.737 4.677 20.263 4.97 19.97L10.939 14L4.97 8.03C4.677 7.737 4.677 7.263 4.97 6.97C5.263 6.677 5.737 6.677 6.03 6.97L12 12.939L17.97 6.97Z" 
      fill="currentColor" 
    />
  </svg>
);
