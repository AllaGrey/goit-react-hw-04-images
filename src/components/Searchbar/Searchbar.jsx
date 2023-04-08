import {
  Header,
  SearchForm,
  SearchInput,
  SubmitButton,
} from './Searchbar.styled';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onSearch = e => {
    e.preventDefault();
    onSubmit(searchQuery);

    if (searchQuery === '') toast.warning('Please enter some text');
  };

  const onChange = e => {
    const normalizedValue = e.target.value.toLowerCase().trim();
    setSearchQuery(normalizedValue);
  };

  return (
    <Header>
      <SearchForm onSubmit={onSearch}>
        <SubmitButton type="submit">
          <span>Search</span>
        </SubmitButton>
        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={onChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
