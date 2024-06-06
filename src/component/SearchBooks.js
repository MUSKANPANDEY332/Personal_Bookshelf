import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const SearchBooks = ({ addBookToShelf }) => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async (query) => {
    if (query.length > 2) {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      setBooks(response.data.docs);
    } else {
      setBooks([]);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => searchBooks(query), 500),
    []
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <form className="search-form">
        <label>
          Search by book name:
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for books"
          />
        </label>
        <button type="button" onClick={() => searchBooks(query)}>Search</button>
      </form>
      <div className="book-results">
        {books.map((book) => (
          <div key={book.key} className="book-card">
            <p><strong>Book Title:</strong> {book.title}</p>
            <p><strong>Edition Count:</strong> {book.edition_count}</p>
            <button onClick={() => addBookToShelf(book)}>Add to Bookshelf</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(SearchBooks);
