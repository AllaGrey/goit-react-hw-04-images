import { ModalContainer, LargeImage, ImageWrap } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ largeImageURL, onModal }) => {
  const onClickModal = e => {
    if (e.target === e.currentTarget) onModal();
  };

  useEffect(() => {
    const onKeyDownModal = e => {
      if (e.code === 'Escape') onModal();
    };
    window.addEventListener('keydown', onKeyDownModal);

    return () => {
      window.removeEventListener('keydown', onKeyDownModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalContainer onClick={onClickModal}>
      <ImageWrap>
        <LargeImage src={largeImageURL} alt="" />
      </ImageWrap>
    </ModalContainer>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onModal: PropTypes.func.isRequired,
};
