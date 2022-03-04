import React from 'react';
import Link from 'next/link';
import style from './Header.module.scss';

export default function Header() {
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
  ];

  const menu = menuItems.map((item, i) => {
    return (
      <li key={'menu' + (i + 1)}>
        <Link href={item.link}>
          <a>{item.name}</a>
        </Link>
      </li>
    );
  });

  const actionItems = [
    { name: 'Favorite', link: '/favorite' },
    { name: 'Shopping Bag', link: '/shoppingBag' },
  ];

  const actions = actionItems.map((item, i) => {
    return (
      <li key={'action' + (i + 1)}>
        <Link href={item.link}>
          <a>{item.name}</a>
        </Link>
      </li>
    );
  });

  const userItems = [
    { name: 'Sign Up', link: '/' },
    { name: 'Sign In', link: '/' },
  ];

  const user = userItems.map((item, i) => {
    return (
      <li key={'user' + (i + 1)}>
        <Link href={item.link}>
          <a>{item.name}</a>
        </Link>
      </li>
    );
  });

  return (
    <div className={style.header}>
      <div className={style.container}>
        <div className={style.brand}>Brand</div>
        <ul>{menu}</ul>
        <ul>{actions}</ul>
        <ul className={style.user}>{user}</ul>
      </div>
    </div>
  );
}
