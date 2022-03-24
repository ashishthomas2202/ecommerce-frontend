import React, { useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import style from './Header.module.scss';
import { User as UserSettings, Pages } from '../../../utils/settings';
import { Brand } from '../../../utils/settings';
import { Store } from '../../../utils/store';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

function Header() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { state } = useContext(Store);
  const { shoppingBag } = state;

  /****************** Brand ******************/
  const brand = <div className={style.brand}>{Brand.name}</div>;

  /****************** Menu ******************/
  const menuItems = Pages.main;

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

  const [bagItemsCount, setBagItemsCount] = useState(0);

  // To update the number of items in shopping bag
  useEffect(() => {
    setBagItemsCount(shoppingBag.totalItems);
  }, [shoppingBag.totalItems]);

  const actionItems = [
    { name: 'Favorite', link: '/favorite' },
    {
      name: `Shopping Bag(${bagItemsCount})`,
      link: '/shoppingBag',
    },
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

  function handleSignOut() {
    signOut();
  }

  const userItems = [
    { name: 'Sign Up', link: UserSettings.signup.link },
    { name: 'Sign In', link: UserSettings.signin.link },
  ];

  const user = session ? (
    <div>
      {/* {console.log(session)} */}
      <button>Hi {session.user.firstName}</button>
      <ul>
        <li>Profile</li>
        <li>My Account</li>
        <li>
          <button onClick={handleSignOut}>Sign Out</button>
        </li>
      </ul>
    </div>
  ) : (
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

export default dynamic(() => Promise.resolve(Header), { ssr: false });
