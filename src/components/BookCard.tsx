import React, { useEffect, useState } from "react";
import type { Book } from "../types/book";
import { favoritesService } from "../services/favoriteService";

interface BookCardProps {
  book: Book;
  language: string;
  onViewDetails: (id: string) => void;
  onToggleFavorite?: (id: string, book: Book) => void;
  isFavorite?: boolean;
}

const cardBg = "rgba(0,0,0,0.0)";
const titleColor = "#FEF7CD";
const authorColor = "#FEF7CD";
const descColor = "#E1B87F";
const btnColor = "#e6a800";
const btnTextColor = "#000000";

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onViewDetails,
  onToggleFavorite,
  isFavorite: externalIsFavorite,
}) => {
  const { title, authors, description, imageLinks, publishedDate } =
    book.volumeInfo;
  const year = publishedDate ? publishedDate.slice(0, 4) : "";
  const author = authors ? authors.join(", ") : "Unknown Author";
  const desc = description
    ? description.slice(0, 120) + (description.length > 120 ? "..." : "")
    : "No description available.";
  const cover =
    imageLinks?.thumbnail ||
    imageLinks?.smallThumbnail ||
    "https://via.placeholder.com/128x192?text=No+Cover";

  // Local state for favorite status that defaults to the passed prop
  // This allows the component to work both with external state management
  // and as a standalone component that manages its own favorite state
  const [isFavorite, setIsFavorite] = useState(
    externalIsFavorite ?? favoritesService.isFavorite(book.id)
  );

  // Update local state when external prop changes
  useEffect(() => {
    if (externalIsFavorite !== undefined) {
      setIsFavorite(externalIsFavorite);
    }
  }, [externalIsFavorite]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card click

    // Update local state
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    // Call external handler if provided
    if (onToggleFavorite) {
      onToggleFavorite(book.id, book);
    } else {
      // Handle favoriting locally if no external handler
      if (newFavoriteState) {
        favoritesService.addFavorite(book);
      } else {
        favoritesService.removeFavorite(book.id);
      }
    }
  };

  return (
    <div
      className="card h-100 shadow-sm"
      style={{
        background: cardBg,
        border: "none",
        borderRadius: "12px",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      }}
    >
      <button
        className="position-absolute top-0 end-0 m-2 p-2 border-0 bg-transparent"
        style={{
          zIndex: 2,
          transition: "transform 0.2s ease",
        }}
        onClick={handleToggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        type="button"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <img
          src="/src/assets/heart.svg"
          alt={isFavorite ? "Favorited" : "Add to favorites"}
          width={24}
          height={24}
          style={{
            filter: isFavorite
              ? "invert(32%) sepia(77%) saturate(747%) hue-rotate(7deg) brightness(95%) contrast(92%)"
              : "invert(60%)",
            opacity: isFavorite ? 1 : 0.7,
            transition: "all 0.3s ease",
            cursor: "pointer",
            fill: isFavorite ? "currentColor" : "none",
          }}
          onMouseEnter={(e) => {
            if (!isFavorite) {
              e.currentTarget.style.filter =
                "invert(32%) sepia(77%) saturate(747%) hue-rotate(7deg) brightness(95%) contrast(92%)";
              e.currentTarget.style.opacity = "0.9";
            }
          }}
          onMouseLeave={(e) => {
            if (!isFavorite) {
              e.currentTarget.style.filter = "invert(60%)";
              e.currentTarget.style.opacity = "0.7";
            }
          }}
        />
      </button>
      <img
        src={cover}
        alt={`Cover of ${title}`}
        className="card-img-top mx-auto mt-3"
        style={{
          width: 128,
          height: 192,
          objectFit: "cover",
          borderRadius: "6px",
          background: "#111",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5
          className="card-title playfair-title mb-1"
          style={{ color: titleColor }}
        >
          {title}
        </h5>
        <div
          className="mb-1"
          style={{ color: authorColor, fontWeight: 600, fontSize: "1rem" }}
        >
          {author} {year && <span style={{ fontWeight: 400 }}>({year})</span>}
        </div>
        <div
          className="mb-3"
          style={{ color: descColor, fontSize: "0.95rem", fontStyle: "italic" }}
        >
          {desc}
        </div>
        <button
          className="mt-auto btn"
          style={{
            background: "rgba(230, 168, 0, 0.7)",
            color: btnTextColor,
            fontWeight: 600,
            borderRadius: "6px",
            transition: "all 0.3s ease",
          }}
          onClick={() => onViewDetails(book.id)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(230, 168, 0, 0.9)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(230, 168, 0, 0.7)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
};
