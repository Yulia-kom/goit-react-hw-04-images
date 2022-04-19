import React from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import style from './Searchbar.module.css';

export default function Searchbar({ query, handleSetQuery, handleFormSubmit }) {
  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={style.SearchForm_button}>
          <ImSearch style={{ marginRight: 5 }} />
          <span className={style.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={style.SearchForm_input}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleSetQuery}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
  handleSetQuery: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};
