import React from 'react';
import Link from 'next/link';
import style from './Table.module.scss';

export function Table({ className, children }) {
  return (
    <table className={className ? className : style.table}>{children}</table>
  );
}

export function TableHeading({ className, headings, children }) {
  return (
    <React.Fragment>
      {headings ? (
        <thead>
          <tr>
            {headings.map((heading, i) => (
              <td
                key={'tableHeading' + heading + i}
                className={className ? className : style.heading}
              >
                {' '}
                {heading}
              </td>
            ))}
          </tr>
        </thead>
      ) : (
        { children }
      )}
    </React.Fragment>
  );
}

export function TableData({ className, data, link, children }) {
  let tableData = data ? (
    <tr>
      {data.map((tableData, i) => (
        <td
          key={'tableData' + tableData + i}
          className={className ? className : style.data}
        >
          {' '}
          {tableData}
        </td>
      ))}
    </tr>
  ) : (
    { children }
  );

  tableData = link ? (
    <Link href={link} passHref>
      {tableData}
    </Link>
  ) : (
    tableData
  );
  return tableData;
}

export function TableBody({ className, children }) {
  return <tbody className={className ? className : ''}>{children}</tbody>;
}
