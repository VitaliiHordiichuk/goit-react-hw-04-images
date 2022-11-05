import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ closeModal, largeimageurl }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDowm);

    return () => {
      document.removeEventListener('keydown', handleKeyDowm);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDowm = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  function handleClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
  return (
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>
        <img src={largeimageurl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
