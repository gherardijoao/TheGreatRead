import React, { useState, useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.scss';
import { BookCard } from '../components/BookCard';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const backgroundStyle: React.CSSProperties = {
  backgroundImage: `url('/src/assets/libraryPicture.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  minHeight: '100dvh',
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 0,
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100dvh',
  background: 'rgba(0,0,0,0.6)',
  zIndex: 1,
};

const contentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
  minHeight: '100dvh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

export default function Home() {
  const [search, setSearch] = useState('');
  const { books, searchBooks, loading } = useBooks();

  // Fetch random books on mount
  useEffect(() => {
    const randomTerms = [
      'classics', 'literature', 'adventure', 'history', 'science', 'fantasy', 'novel', 'romance', 'mystery', 'philosophy', 'art', 'biography', 'fiction', 'poetry', 'drama'
    ];
    const randomTerm = randomTerms[Math.floor(Math.random() * randomTerms.length)];
    searchBooks(randomTerm);
  }, [searchBooks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      searchBooks(search);
    }
  };

  const handleViewDetails = (id: string) => {
    // TODO: Implement navigation to book details
    alert(`View details for book ${id}`);
  };

  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <Header />
        {/* Main Content */}
        <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="display-2 playfair-title text-light mb-3">Descubra Tesouros da Literatura</h1>
          <p className="lead text-yellow mb-4">Explore a vast collection of books from various genres, authors, and eras.</p>
          <form onSubmit={handleSubmit} className="w-100 d-flex justify-content-center mb-5">
            <div className="input-group w-50" style={{maxWidth: 500}}>
              <input
                type="text"
                className="form-control search-input text-light border-0 px-4 py-3"
                placeholder="Procure por livros, autores ou gêneros..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{fontSize: '1.1rem'}}
              />
              <button
                className="search-btn"
                type="submit"
                disabled={loading}
              >
                <img src="/src/assets/search.svg" alt="Buscar" style={{width: 24, height: 24}} />
              </button>
            </div>
          </form>
        </main>
        {/* Book Cards Grid */}
        <div className="container pb-5">
          <div className="row g-4">
            {books.map(book => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={book.id}>
                <BookCard book={book} onViewDetails={handleViewDetails} />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
