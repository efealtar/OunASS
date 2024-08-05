import React from 'react';

export default ({
  color,
  width,
  height,
  strokeWidth,
}) => (
  <svg
    width={width || 30}
    height={height || 30}
    viewBox="0 0 30 30"
  >
    <line
      x1="0"
      y1="15"
      x2="30"
      y2="15"
      stroke={color || '#fff'}
      strokeWidth={strokeWidth || 2}
    />
  </svg>
);
