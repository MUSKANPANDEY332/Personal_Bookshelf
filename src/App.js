import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

const SearchBooks = lazy(() => import('./component/SearchBooks'));
const Bookshelf = lazy(() => import('./component/Bookshelf'));

const App = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(savedBooks);
  }, []);

  useEffect(() => {
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  }, [bookshelf]);

  const addBookToShelf = (book) => {
    if (!bookshelf.find(b => b.key === book.key)) {
      setBookshelf([...bookshelf, book]);
    }
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Personal Bookshelf</h1>
          <Link to="/bookshelf">
            <button className="bookshelf-button">My Bookshelf</button>
          </Link>
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<SearchBooks addBookToShelf={addBookToShelf} />} />
            <Route path="/bookshelf" element={<Bookshelf bookshelf={bookshelf} />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
