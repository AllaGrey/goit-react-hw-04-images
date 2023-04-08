import { Gallery, Section } from './ImageGallery.styled';
import { useState, useEffect } from 'react';
import { getImages } from 'components/API/API';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { LoadMore } from 'components/Button/Button';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export const ImageGallery = ({ search }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItemURL, setCurrentItemURL] = useState('');

  useEffect(() => {
    setSearchQuery(search);
    setPage(1);
    setGallery([]);
    setIsLoading(prev => !prev);
  }, [search]);

  useEffect(() => {
    if (searchQuery !== '') getLoading();
  }, [searchQuery]);

  useEffect(() => {
    if (page > 1) getLoading();
  }, [page]);

  const getLoading = () => {
    getImages(searchQuery, page)
      .then(({ data, total }) => {
        setGallery(prev => [...prev, ...data]);
        setTotalPages(total);
        setIsLoading(prev => !prev);

        if (data.length === 0) {
          throw new Error('No results');
        }
      })
      .catch(err => {
        const { message } = err;
        toast.error(message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  const onModal = currentItem => {
    setIsModalOpen(prev => !prev);
    setCurrentItemURL(currentItem);
  };

  const onLoadMore = () => {
    setIsLoading(prev => !prev);
    setPage(prev => prev + 1);
  };

  if (gallery.length > 0) {
    return (
      <Section>
        <Gallery>
          {gallery.map(item => {
            const { id, webformatURL, largeImageURL, tags } = item;
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onModal={onModal}
              />
            );
          })}
        </Gallery>
        {isModalOpen && (
          <Modal largeImageURL={currentItemURL} onModal={onModal} />
        )}
        {isLoading && <Loader />}
        {totalPages > 1 && page < totalPages && (
          <LoadMore page={page} onClick={onLoadMore} />
        )}
      </Section>
    );
  }
};

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
};
