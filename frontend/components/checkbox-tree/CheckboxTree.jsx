import classnames from 'classnames';
import React from 'react';

import CaretIcon from '../CaretIcon';
import Checkbox from '../checkbox/Checkbox';
import FormControlLabel from '../form-control-label/FormControlLabel';
import './CheckboxTree.less';

const inspectSubTree = ({
  func,
  node,
  selected,
}) => {
  if (node.children.length === 0) {
    return !!selected[node.id];
  }

  return node.children[func]((child) => inspectSubTree({
    func,
    node: child,
    selected,
  }));
};

const CheckboxTree = (props) => {
  const {
    node,
    selected,
    setSelected,
    expanded,
    setExpanded,
  } = props;

  const childrenPartial = (
    <div className="CheckboxTree-categoryList">
      {node.children.map((child) => (
        <CheckboxTree
          key={child.id}
          {...props}
          node={child}
        />
      ))}
    </div>
  );

  // node node
  if (node.parent === null) {
    return (
      <div className="CheckboxTree">
        {childrenPartial}
      </div>
    );
  }

  const areAllChildrenSelected = inspectSubTree({
    selected,
    func: 'every',
    node,
  });

  const areSomeChildrenSelected = !areAllChildrenSelected
    && inspectSubTree({
      selected,
      func: 'some',
      node,
    });

  const {
    id,
    name,
    children = [],
  } = node;

  return (
    <div
      className={classnames(['CheckboxTree-node'], {
        'is-expanded': expanded[id],
      })}
    >
      <FormControlLabel
        control={(
          <Checkbox
            indeterminate={areSomeChildrenSelected}
            checked={areAllChildrenSelected}
            onChange={() => {
              setSelected({
                ...selected,
                [id]: selected[id] ? 0 : 1,
              });
            }}
          />
        )}
        text={name}
        url="/"
      >
        {children.length > 0 && (
          <button
            className={classnames('CheckboxTree-expandButton', {
              'is-expanded': expanded[id],
            })}
            type="button"
            onClick={() => {
              setExpanded({
                ...expanded,
                [id]: expanded[id] ? 0 : 1,
              });
            }}
          >
            <CaretIcon
              color="#2d2d2d"
              type="bottom"
              width="12"
              height="7"
            />
          </button>
        )}
      </FormControlLabel>

      {
        children.length > 0
        && Boolean(expanded[id])
        && childrenPartial
      }
    </div>
  );
};

export default CheckboxTree;
