import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./css/styles.module.css";

export default function Carousel({ images, onClick, selected }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
  };

  // Helper to resolve the correct image URL based on the dataset
  const getImgSrc = (item) => {
    if (item.image) {
      const filename = item.image.endsWith('.jpg') ? item.image : `${item.image}.jpg`;
      return `https://productimage.jeeliz.com/${filename}`;
    }
    return `https://productimage.jeeliz.com/US_${item.SKU}.jpg`;
  };

 return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <img
            key={image.SKU}
            alt={image["label (US)"] || "Glasses model"}
            className={
              selected === index ? styles.selectedImage : styles.carouselImages
            }
            src={getImgSrc(image)}
            onClick={() => onClick(index)}
            // Accessibility enhancements:
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(index);
              }
            }}
          />
        ))}
      </Slider>
    </div>
  );
}
