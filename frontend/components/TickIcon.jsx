import React from 'react';

export default ({
  color,
  width,
  height,
  circle,
}) => (
  <svg
    width={width || 30}
    height={height || 30}
    viewBox="0 0 12 9"
  >
    <path
      stroke={color || '#000'}
      d="M.5 5.5l3 3M11.5.5l-8 8"
    />
  </svg>
);
