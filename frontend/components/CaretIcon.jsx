import React from 'react';

const types = {
  top: { viewBox: '0 0 20 10', path: 'M0 10L10 0l10 10' },
  left: { viewBox: '0 0 10 20', path: 'M10 0L0 10l10 10' },
  right: { viewBox: '0 0 10 20', path: 'M0 0l10 10L0 20' },
  bottom: { viewBox: '0 0 20 10', path: 'M0 0l10 10L20 0' },
};

export default ({
  type = 'top',
  color,
  width,
  height,
}) => (
  <svg
    width={width || 30}
    height={height || 30}
    viewBox={types[type].viewBox}
  >
    <path
      d={types[type].path}
      stroke={color || '#000'}
      fill="transparent"
    />
  </svg>
);
