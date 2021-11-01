import { useState } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';

export default function SearchBar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  function handlerSubmit(e) {
    e.preventDefault();
    onSubmit(searchValue);
  }

  function handlerChange(e) {
    setSearchValue(e.target.value);
  }

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handlerSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handlerChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
