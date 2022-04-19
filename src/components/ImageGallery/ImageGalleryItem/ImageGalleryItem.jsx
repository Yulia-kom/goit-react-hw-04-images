import PropTypes from "prop-types";
import style from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ img, modalImg, handleTogleModal, tags }) => {
  return (
    <li
      className={style.ImageGalleryItem}
      onClick={({ target: { alt } }) => {
        handleTogleModal(modalImg, alt);
      }}
    >
      <img src={img} alt={tags} className={style.ImageGalleryItemimage} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  modalImg: PropTypes.string.isRequired,
  handleTogleModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
