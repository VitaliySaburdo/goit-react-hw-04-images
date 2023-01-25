import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ img, name, onSelect, largeImageUrl }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={img}
        alt={name}
        className="ImageGalleryItem_image"
        onClick={() => onSelect(largeImageUrl, name)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
