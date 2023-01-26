import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export function Modal({ url, name, onClose }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={url} alt={name} width={1280} />
      </div>
    </div>
  );
}

Modal.prototype = {
  url: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func,
};
