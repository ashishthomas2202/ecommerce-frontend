import React, { useState } from 'react';
import style from './ProductCarousel.module.scss';

export default function ProductCarousel({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleClick(index) {
    setCurrentIndex(index);
  }

  return (
    <div className={style.productCarousel}>
      <div
        className={style.mainImage}
        style={{ backgroundImage: `url(${product.images[currentIndex].path})` }}
      ></div>

      <div className={style.additionalImagesWrapper}>
        {product.images.map((image, i) => {
          return (
            <div
              key={`${image}-${i}`}
              className={style.additionalImage}
              style={{
                backgroundImage: `url(${image.path})`,
                border: i === currentIndex ? `2px solid #6d6d6d` : '',
              }}
              onClick={() => {
                handleClick(i);
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
