import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGalery.module.css';

export const ImageGallery = ({ cards, onSelect }) => {
  return (
    <div className="App">
      <ul className={css.ImageGallery}>
        {cards.map(card => (
          <ImageGalleryItem
            key={card.id}
            img={card.webformatURL}
            name={card.tags}
            largeImageUrl={card.largeImageURL}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  cards: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};
