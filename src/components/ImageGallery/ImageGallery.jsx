import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "./ImageGalleryItem";
import style from "./ImageGallery.module.css";

export default function ImageGallery({ images, handleTogleModal }) {
  return (
    <ul className={style.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          handleTogleModal={handleTogleModal}
          key={id}
          img={webformatURL}
          modalImg={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  handleTogleModal: PropTypes.func.isRequired,
};
