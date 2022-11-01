import PropTypes from 'prop-types';

export const ApiServiseFetch = async ({
  imageName,
  page,
  BASE_URL,
  API_KEY,
  IMAGE_TYPE,
  PER_PAGE,
}) => {
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
