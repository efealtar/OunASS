import classnames from 'classnames';
import React from 'react';
import './FormControlLabel.less';

export default (props) => {
  const {
    control,
    text,
    url,
    children,
    className,
    htmlFor,
  } = props;

  return (
    <label
      className={classnames(['FormControlLabel', className])}
      htmlFor={htmlFor}
    >
      {control}

      <a
        href={url}
        className="FormControlLabel-text"
      >
        {text}
      </a>

      {children}
    </label>
  );
};
