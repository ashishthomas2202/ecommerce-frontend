import React from 'react';
import Link from 'next/link';
import style from './Footer.module.scss';
import { Brand, Shop, Social } from '../../../utils/settings';

export default function Footer() {
  const menuLists = [
    {
      title: `About ${Brand.name}`,
      items: [
        { name: 'About Us', link: '/' },
        { name: 'Connect Socially', link: '/' },
      ],
    },
    {
      title: 'Shop',
      items: Shop.collections,
    },
    {
      title: 'Need Help?',
      items: [
        { name: 'Contact Us', link: '/' },
        { name: 'Shipping Services', link: '/' },
        { name: 'Payment Options', link: '/' },
        { name: 'Returns & Exchanges', link: '/' },
        { name: 'Product Care', link: '/' },
        { name: 'FAQs', link: '/' },
        { name: 'Unsubscrbe', link: '/' },
        { name: 'Sitemap', link: '/' },
      ],
    },
    {
      title: 'Find Us On',
      items: Social.list,
    },
  ];
  const menu = (
    <div className={style.menu}>
      {menuLists.map((list, i) => {
        return (
          <div key={'footerList' + i}>
            <h4>{list.title}</h4>
            <ul>
              {list.items.map((item, itemId) => {
                return (
                  <li key={item.name + itemId}>
                    <Link href={item.link}>
                      <a>
                        {item.icon ? (
                          <img
                            className={style.icon}
                            src={item.icon}
                            alt={item.name}
                          />
                        ) : (
                          ''
                        )}
                        {item.name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );

  const copyright = (
    <div className={style.copyright}>
      ©{new Date().getFullYear()} {Brand.fullName}. All rights reserved.
    </div>
  );
  return (
    <div className={style.footer}>
      <div className={style.container}>
        {menu}
        {copyright}
      </div>
    </div>
  );
}
