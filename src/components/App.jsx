import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiService } from '../ApiService/ApiService';
import { toast } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadButton } from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';
import PropTypes from 'prop-types';
import * as Scroll from 'react-scroll';

export function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [showLoadButton, setShowLoadButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
 

  useEffect(() => {
    async function APIfetchImages() {
      if (query === '') {
        return;
      }
      try {
        setIsLoading(true);
        const { hits, totalHits } = await ApiService(query, page);
        if (hits.length !== 0) {
          setItems(prevState => [...prevState, ...hits]);
          setShowLoadButton(page < Math.ceil(totalHits / 12));
        } else {
          toast.warn(`Images ${query} is not found`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    APIfetchImages();
  }, [page, query]);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onClickImage = (url, name) => {
    setLargeImageUrl(url);
    setName(name);
    setShowModal(true);
  };

  const LoadMore = () => {
    setPage(prevState => prevState + 1);
    scrolling();
  };

  const formSubmitHendler = ({ query }) => {
    setQuery(query);
    setPage(1);
    setItems([]);
    setShowLoadButton(false);
  };
   function scrolling() {
    const scroll = Scroll.animateScroll;
    scroll.scrollMore(650);
  }

  return (
    <>
      <Searchbar onSubmit={formSubmitHendler} />
      <ToastContainer />
      <ImageGallery cards={items} onSelect={onClickImage} />
      {isLoading && <Loader />}
      {showModal && (
        <Modal url={largeImageUrl} name={name} onClose={toggleModal} />
      )}
      {showLoadButton && <LoadButton LoadMore={() => LoadMore()} />}
    </>
  );
}

App.prototype = {
  page: PropTypes.number,
  query: PropTypes.string,
  items: PropTypes.array,
  largeImageUrl: PropTypes.string,
  showLoadButton: PropTypes.bool,
  showModal: PropTypes.bool,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
};
