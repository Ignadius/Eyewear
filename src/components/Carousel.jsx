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

  const [selectedImg, setSelectedImg] = useState(0);

  useEffect(() => {
    setSelectedImg(selected);
  }, [selected]);

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <img
            key={image.SKU}
            alt={image["label (US)"] || "Glasses"}
            className={
              selectedImg === index
                ? styles.selectedImage
                : styles.carouselImages
            }
            src={`https://productimage.jeeliz.com/US_${image.SKU}.jpg`}
            onClick={() => {
              setSelectedImg(index);
              onClick(index);
            }}
          />
        ))}
      </Slider>
    </div>
  );
}
