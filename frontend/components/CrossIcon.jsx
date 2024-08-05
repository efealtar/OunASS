import React from 'react';

export default ({
  width,
  height,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <line stroke="#000" x1="0" y1="0" x2="24" y2="24" />
    <line stroke="#000" x1="24" y1="0" x2="0" y2="24" />
  </svg>
);
