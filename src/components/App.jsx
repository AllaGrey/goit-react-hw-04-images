import { Container } from './App.styled';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery search={searchQuery} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};
