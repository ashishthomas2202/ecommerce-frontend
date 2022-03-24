import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Grid.module.scss';

export default function Grid({ data, column = 4, gap = '0', children }) {
  let keyId = uuidv4();
  // data = [1, 2, 3, 4, 5];

  let grid = data.map((item, i) => {
    return (
      <div key={`${keyId}-${i}`}>
        <>{React.cloneElement(children, { data: item })}</>
      </div>
    );
  });

  return (
    <div
      className={styles.grid}
      style={{ gridTemplateColumns: `repeat( ${column},1fr)`, gap: gap }}
    >
      {grid}
    </div>
  );
}
