import { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { ApiServiseFetch } from '../ApiServise/ApiServise';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeimageurl, setLargeimageurl] = useState('');

  useEffect(() => {
    if (imageName === '') {
      return;
    }
    setLoading(true);
    ApiServiseFetch(imageName, page)
      .then(res => res.json())
      .then(images => {
        if (page === 1) {
          setImages([...images.hits]);
        } else setImages(prevState => [...prevState, ...images.hits]);
        setLoading(false);
      });
  }, [imageName, page]);

  const handleSubmitForm = imageName => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = e => {
    setShowModal(true);
    setLargeimageurl(e.target.getAttribute('largeimageurl'));
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeimageurl('');
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmitForm} />
      {loading && <Loader />}
      <ImageGallery openModal={openModal} images={images} />

      <ToastContainer autoClose={3000} position="top-right" />
      {showModal && (
        <Modal closeModal={closeModal} largeimageurl={largeimageurl} />
      )}
      {images.length > 0 && <Button loadMore={loadMore} />}
    </div>
  );
};
