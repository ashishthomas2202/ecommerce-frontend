import React, { useState, useEffect } from 'react';

export function ViewSelector({ select, children }) {
  const [view, setView] = useState('loading');
  useEffect(() => {
    // children = children.map((child, i) => {
    //   child.key = child.props.name + i;
    //   return child;
    // });

    // React.Children.forEach(children, (child) => {
    //   console.log('name =', child);
    // });

    setView(
      children.filter((child, i) => {
        return child.props.name === select;
      })[0]
    );
    // console.log('yo select', select);
  });

  return <>{view ? view : 'View Not Found'}</>;
}

export function View({ name, children }) {
  return <div key={name + 'dcdc'}>{children}</div>;
}
