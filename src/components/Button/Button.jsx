import { LoadMoreButton } from './Button.styled';
import PropTypes from 'prop-types';

export const LoadMore = ({ page, onClick }) => {
  return (
    <LoadMoreButton type="button" onClick={() => onClick()}>
      Load more
    </LoadMoreButton>
  );
};

LoadMore.propTypes = {
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
