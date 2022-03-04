import React from 'react';
import Link from 'next/link';
import style from './Header.module.scss';
import { Brand } from '../../utils/settings';
export default function Header() {
  /****************** Brand ******************/
  const brand = <div className={style.brand}>{Brand.name}</div>;

  /****************** Menu ******************/
  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
  ];

  const menu = (
    <ul>
      {menuItems.map((item, i) => {
        return (
          <li key={'menu' + (i + 1)}>
            <Link href={item.link}>
              <a>{item.name}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  /****************** Action ******************/
  const actionItems = [
    { name: 'Favorite', link: '/favorite' },
    { name: 'Shopping Bag', link: '/shoppingBag' },
  ];

  const actions = (
    <ul>
      {actionItems.map((item, i) => {
        return (
          <li key={'action' + (i + 1)}>
            <Link href={item.link}>
              <a>{item.name}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  /****************** User ******************/
  const userItems = [
    { name: 'Sign Up', link: '/' },
    { name: 'Sign In', link: '/' },
  ];

  const user = (
    <ul className={style.user}>
      {userItems.map((item, i) => {
        return (
          <li key={'user' + (i + 1)}>
            <Link href={item.link}>
              <a>{item.name}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={style.header}>
      <div className={style.container}>
        {brand}
        {menu}
        {actions}
        {user}
      </div>
    </div>
  );
}
