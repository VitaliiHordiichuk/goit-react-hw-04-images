import React from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import { Button } from '../Button/Button';
import { ApiServiseFetch } from '../ApiServise/ApiServise';

export class App extends React.Component {
  state = {
    loading: false,
    imageName: '',
    images: [],
    page: 1,
    showModal: false,
    largeimageurl: '',
  };

  API_OPTIONS = {
    BASE_URL: 'https://pixabay.com/api/',
    API_KEY: '30369745-b5fd7cc2ec76e6714aeeb802f',
    IMAGE_TYPE: 'image_type=photo&orientation=horizontal',
    PER_PAGE: 12,
  };

  componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    const { BASE_URL, API_KEY, IMAGE_TYPE, PER_PAGE } = this.API_OPTIONS;
    const options = {
      imageName,
      page,
      BASE_URL,
      API_KEY,
      IMAGE_TYPE,
      PER_PAGE,
    };
    if (
      prevState.page !== this.state.page ||
      prevState.imageName !== this.state.imageName
    ) {
      this.setState({
        loading: true,
      });
      ApiServiseFetch(options)
        .then(res => res.json())
        .then(images => {
          if (this.state.page === 1) {
            this.setState({ images: [...images.hits] });
          } else
            this.setState({ images: [...prevState.images, ...images.hits] });
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleSubmitForm = imageName => {
    this.setState({
      imageName,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  openModal = e => {
    this.setState(() => ({
      showModal: true,
      largeimageurl: e.target.getAttribute('largeimageurl'),
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      showModal: false,
      largeimageurl: '',
    }));
  };

  render() {
    const { images, loading, showModal, largeimageurl } = this.state;
    const { handleSubmitForm, loadMore, openModal, closeModal } = this;

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
  }
}
