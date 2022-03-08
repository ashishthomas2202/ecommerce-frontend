import React, { useState } from 'react';
import style from './ProductCarousel.module.scss';

export default function ProductCarousel({ product }) {
  let totalImages = product.images.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleClick(index) {
    setCurrentIndex(index);
  }

  return (
    <div className={style.productCarousel}>
      <div
        className={style.mainImage}
        style={{ backgroundImage: `url(${product.images[currentIndex]})` }}
      ></div>

      <div className={style.additionalImagesWrapper}>
        {product.images.map((image, i) => {
          return (
            <div
              key={image}
              className={style.additionalImage}
              style={{ backgroundImage: `url(${image})` }}
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
