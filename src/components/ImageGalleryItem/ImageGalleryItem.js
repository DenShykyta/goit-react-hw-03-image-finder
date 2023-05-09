import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ img, largeImg, tags, onModal }) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItem__image}
        src={img}
        alt={tags}
        onClick={() => onModal(largeImg)}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  onModal: PropTypes.func.isRequired,
};
