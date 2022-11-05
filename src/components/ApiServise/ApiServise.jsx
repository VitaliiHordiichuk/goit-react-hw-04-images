import PropTypes from 'prop-types';

const API_OPTIONS = {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: '21804857-e4d02e1e62ab2bb6123c0439f',
  IMAGE_TYPE: 'image_type=photo&orientation=horizontal',
  PER_PAGE: 12,
};

export const ApiServiseFetch = async (imageName, page) => {
  const { BASE_URL, API_KEY, IMAGE_TYPE, PER_PAGE } = API_OPTIONS;
  return await fetch(
    `${BASE_URL}?q=${imageName}&page=${page}&key=${API_KEY}&${IMAGE_TYPE}&per_page=${PER_PAGE}`
  );
};

ApiServiseFetch.propTypes = {
  options: PropTypes.shape({
    imageName: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    BASE_URL: PropTypes.string.isRequired,
    API_KEY: PropTypes.string.isRequired,
    IMAGE_TYPE: PropTypes.string.isRequired,
    PER_PAGE: PropTypes.number.isRequired,
  }),
};
