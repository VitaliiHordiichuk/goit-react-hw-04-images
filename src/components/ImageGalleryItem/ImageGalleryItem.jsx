import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ openModal, images }) => {
    return(
        <>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className={css.imageGalleryItem} key={id} onClick={openModal}> <img
            src={webformatURL}
            alt={tags}
            className={css.imageGalleryItemImage}
            largeimageurl={largeImageURL}
          />
          </li >
    ) 
    )}
        </>
    )
}

ImageGalleryItem.propTypes = {
    openModal: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }))
}