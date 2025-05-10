import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { CustomButton } from "../components/CustomButton";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { favoritesService } from "../services/favoriteService";
import type { Book } from "../types/book";

const backgroundStyle: React.CSSProperties = {
  backgroundImage: `url('/src/assets/libraryPicture.png')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  minHeight: "100dvh",
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 0,
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100dvh",
  background: "rgba(0,0,0,0.2)",
  zIndex: 1,
};

const contentStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 2,
  minHeight: "100dvh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
};

export default function MyShelf() {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load favorites on component mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setIsLoading(true);
    const favoriteBooks = favoritesService.getFavorites();
    setFavorites(favoriteBooks);
    setIsLoading(false);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/books/${id}`);
  };

  const handleToggleFavorite = (id: string, book: Book) => {
    // If it's already in favorites, remove it
    if (favoritesService.isFavorite(id)) {
      favoritesService.removeFavorite(id);
      // Update state to remove the book
      setFavorites(favorites.filter((book) => book.id !== id));
    } else {
      // Add to favorites
      favoritesService.addFavorite(book);
      setFavorites([...favorites, book]);
    }
  };

  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <Header />

        <section className="py-5">
          <div className="container">
            <h1 className="display-2 playfair-title text-light mb-4">
              Minha Estante
            </h1>
            <p className="lead text-yellow mb-5">
              Sua coleção personalizada de livros favoritos. Aqui você encontra
              todos os livros que marcou como favorito.
            </p>

            {isLoading ? (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              </div>
            ) : favorites.length === 0 ? (
              <div className="text-center py-5">
                <div className="mb-4">
                  <img
                    src="/src/assets/empty.svg"
                    alt="Empty shelf"
                    style={{ width: 120, height: 120, opacity: 1 }}
                  />
                </div>
                <h3 className="text-light mb-3">Sua estante está vazia</h3>
                <p className="text-yellow mb-4">
                  Você ainda não adicionou nenhum livro aos favoritos. Explore
                  nossa coleção e adicione livros à sua estante.
                </p>
                <CustomButton
                  onClick={() => {
                    /* Add navigation logic here */
                  }}
                  to="/"
                  style={{ padding: "12px 24px", fontSize: "1.1rem" }}
                >
                  Explorar Livros
                </CustomButton>
              </div>
            ) : (
              <div className="row g-4">
                {favorites.map((book) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                    key={book.id}
                  >
                    <BookCard
                      book={book}
                      onViewDetails={handleViewDetails}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={true}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
