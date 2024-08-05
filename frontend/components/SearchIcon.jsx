import React from 'react';

export default ({
  width,
  height,
  className,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 20 20"
  >
    <g stroke="#000">
      <circle cx="8" cy="8" r="7.5" fill="transparent" />
      <path d="M13.4 13.4l6.1 6.1" />
    </g>
  </svg>
);
