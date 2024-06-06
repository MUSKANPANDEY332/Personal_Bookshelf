import React from 'react';

const Bookshelf = ({ bookshelf }) => {
  return (
    <div className="bookshelf">
      <h2>My Bookshelf</h2>
      <div className="book-results bookshelf-results">
        {bookshelf.map((book) => (
          <div key={book.key} className="book-card">
            <p><strong>Book Title:</strong> {book.title}</p>
            <p><strong>Edition Count:</strong> {book.edition_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Bookshelf);
