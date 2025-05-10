import React from 'react';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onViewDetails: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

const cardBg = 'rgba(0,0,0,0.7)';
const titleColor = '#FEF7CD';
const authorColor = '#FEF7CD';
const descColor = '#E1B87F';
const btnColor = '#A0521D';
const btnTextColor = '#FEF7CD';

export const BookCard: React.FC<BookCardProps> = ({ book, onViewDetails, onToggleFavorite, isFavorite }) => {
  const { title, authors, description, imageLinks, publishedDate } = book.volumeInfo;
  const year = publishedDate ? publishedDate.slice(0, 4) : '';
  const author = authors ? authors.join(', ') : 'Unknown Author';
  const desc = description ? description.slice(0, 120) + (description.length > 120 ? '...' : '') : 'No description available.';
  const cover = imageLinks?.thumbnail || imageLinks?.smallThumbnail || 'https://via.placeholder.com/128x192?text=No+Cover';

  return (
    <div className="card h-100 shadow-sm" style={{ background: cardBg, border: 'none', borderRadius: '12px', position: 'relative' }}>
      <button
        className="position-absolute top-0 end-0 m-2 p-2 border-0 bg-transparent"
        style={{ zIndex: 2 }}
        onClick={() => onToggleFavorite && onToggleFavorite(book.id)}
        aria-label="Favorite"
        type="button"
      >
        <img
          src="/src/assets/heart.svg"
          alt="Favorite"
          width={24}
          height={24}
          style={{
            filter: isFavorite ? 'invert(32%) sepia(77%) saturate(747%) hue-rotate(7deg) brightness(95%) contrast(92%)' : 'invert(60%)',
            opacity: isFavorite ? 1 : 0.7,
            transition: 'filter 0.2s, opacity 0.2s',
          }}
        />
      </button>
      <img
        src={cover}
        alt={`Cover of ${title}`}
        className="card-img-top mx-auto mt-3"
        style={{ width: 128, height: 192, objectFit: 'cover', borderRadius: '6px', background: '#111' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title playfair-title mb-1" style={{ color: titleColor }}>{title}</h5>
        <div className="mb-1" style={{ color: authorColor, fontWeight: 600, fontSize: '1rem' }}>{author} {year && <span style={{ fontWeight: 400 }}>({year})</span>}</div>
        <div className="mb-3" style={{ color: descColor, fontSize: '0.95rem', fontStyle: 'italic' }}>{desc}</div>
        <button
          className="mt-auto btn"
          style={{ background: btnColor, color: btnTextColor, fontWeight: 600, borderRadius: '6px' }}
          onClick={() => onViewDetails(book.id)}
        >
          <span style={{ fontSize: '1.1rem', verticalAlign: 'middle' }}>&#128269;</span> View Details
        </button>
      </div>
    </div>
  );
}; 