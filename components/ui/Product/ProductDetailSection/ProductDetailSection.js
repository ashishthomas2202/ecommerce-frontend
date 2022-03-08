import React from 'react';
import style from './ProductDetailSection.module.scss';

export default function ProductDetailSection({ title, content, link }) {
  const sectionTitle = <h3 className={style.title}>{title}</h3>;
  const sectionContent = <p className={style.conntent}>{content}</p>;
  return (
    <div className={style.detailSection}>
      {sectionTitle}
      {sectionContent}
    </div>
  );
}
