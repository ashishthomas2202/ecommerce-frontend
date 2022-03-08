import React from 'react';
import style from './Layout.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className={style.page}>{children}</div>
      <Footer />
    </div>
  );
}
