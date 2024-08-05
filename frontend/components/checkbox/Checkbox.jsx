import classnames from 'classnames';
import React from 'react';
import './Checkbox.less';

// -- icons --
import LineIcon from '../LineIcon';
import TickIcon from '../TickIcon';

export default ({
  indeterminate,
  checked,
  ...props
}) => (
  <div
    className={classnames(['Checkbox', {
      'is-checked': checked,
      'is-indeterminate': indeterminate,
    }])}
  >
    <input
      type="checkbox"
      checked={checked}
      {...props}
    />

    {indeterminate && (
      <LineIcon
        color="#fff"
        width="12"
        height="10"
      />
    )}

    {checked && (
      <TickIcon
        color="#fff"
        width="12"
        height="9"
      />
    )}
  </div>
);
