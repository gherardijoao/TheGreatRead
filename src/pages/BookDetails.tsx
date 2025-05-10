import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookService } from "../services/bookService";
import { favoritesService } from "../services/favoriteService";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CustomButton } from "../components/CustomButton";
import type { Book } from "../types/book";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) {
        setError("ID do livro não fornecido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const bookData = await bookService.getBookById(id);
        setBook(bookData);
        setIsFavorite(favoritesService.isFavorite(id));
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ocorreu um erro ao buscar detalhes do livro"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!book) return;

    if (isFavorite) {
      favoritesService.removeFavorite(book.id);
    } else {
      favoritesService.addFavorite(book);
    }
    setIsFavorite(!isFavorite);
  };

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

  if (loading) {
    return (
      <>
        <div style={backgroundStyle}></div>
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <Header />
          <div className="container text-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if (error || !book) {
    return (
      <>
        <div style={backgroundStyle}></div>
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <Header />
          <div className="container py-5">
            <div className="alert alert-danger" role="alert">
              {error || "Livro não encontrado"}
            </div>
            <CustomButton onClick={() => navigate("/")}>
              Voltar para a Página Inicial
            </CustomButton>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const {
    volumeInfo: {
      title,
      authors = ["Autor Desconhecido"],
      description = "Nenhuma descrição disponível.",
      publishedDate,
      publisher,
      pageCount,
      categories = [],
      imageLinks,
      language,
      industryIdentifiers = [],
      averageRating,
      ratingsCount,
    },
  } = book;

  const year = publishedDate ? publishedDate.slice(0, 4) : "Desconhecido";
  const cover =
    imageLinks?.thumbnail ||
    imageLinks?.smallThumbnail ||
    "https://via.placeholder.com/128x192?text=Sem+Capa";
  const isbn =
    industryIdentifiers.find((id) => id.type.includes("ISBN"))?.identifier ||
    "Não disponível";

  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <Header />

        <div className="container py-5">
          <div className="bg-dark bg-opacity-75 rounded-3 shadow p-4 p-md-5">
            <div className="row">
              {/* Botão Voltar */}
              <div className="col-12 mb-4">
                <CustomButton onClick={() => navigate(-1)}>
                  <i className="bi bi-arrow-left me-2"></i> Voltar
                </CustomButton>
              </div>

              {/* Coluna da Capa */}
              <div className="col-md-4 mb-4 mb-md-0">
                <div className="position-relative">
                  <img
                    src={cover}
                    alt={`Capa de ${title}`}
                    className="img-fluid rounded shadow"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "500px",
                      objectFit: "contain",
                    }}
                  />
                  <button
                    className="position-absolute top-0 end-0 m-2 p-2 border-0 bg-dark bg-opacity-50 rounded-circle"
                    onClick={handleToggleFavorite}
                    aria-label={
                      isFavorite
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                  >
                    <img
                      src="/src/assets/heart.svg"
                      alt={
                        isFavorite ? "Favoritado" : "Adicionar aos favoritos"
                      }
                      width={24}
                      height={24}
                      style={{
                        filter: isFavorite
                          ? "invert(32%) sepia(77%) saturate(747%) hue-rotate(7deg) brightness(95%) contrast(92%)"
                          : "invert(100%)",
                        opacity: isFavorite ? 1 : 0.7,
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Detalhes do Livro */}
              <div className="col-md-8">
                <h1 className="display-4 playfair-title text-light mb-2">
                  {title}
                </h1>
                <h3 className="h4 text-yellow mb-4">
                  {authors.join(", ")}{" "}
                  <span className="text-light">({year})</span>
                </h3>

                {/* Avaliações */}
                {averageRating && (
                  <div className="mb-4">
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            style={{
                              color:
                                i < Math.round(averageRating)
                                  ? "#FFD700"
                                  : "#6c757d",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-light">
                        {averageRating.toFixed(1)} ({ratingsCount} avaliações)
                      </span>
                    </div>
                  </div>
                )}

                {/* Descrição */}
                <div className="mb-4">
                  <h4 className="text-yellow mb-2">Descrição</h4>
                  <div
                    className="text-light"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {description}
                  </div>
                </div>

                {/* Tabela de Detalhes */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h4 className="text-yellow mb-3">Detalhes</h4>
                    <table className="table table-dark table-borderless">
                      <tbody>
                        <tr>
                          <th scope="row">Editora</th>
                          <td>{publisher || "Desconhecido"}</td>
                        </tr>
                        <tr>
                          <th scope="row">Data de Publicação</th>
                          <td>{publishedDate || "Desconhecido"}</td>
                        </tr>
                        <tr>
                          <th scope="row">Páginas</th>
                          <td>{pageCount || "Desconhecido"}</td>
                        </tr>
                        <tr>
                          <th scope="row">Idioma</th>
                          <td>{language?.toUpperCase() || "Desconhecido"}</td>
                        </tr>
                        <tr>
                          <th scope="row">ISBN</th>
                          <td>{isbn}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Categorias */}
                  <div className="col-md-6">
                    <h4 className="text-yellow mb-3">Categorias</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {categories.length > 0 ? (
                        categories.map((category, index) => (
                          <span
                            key={index}
                            className="badge bg-warning text-dark"
                          >
                            {category}
                          </span>
                        ))
                      ) : (
                        <span className="text-light">
                          Nenhuma categoria disponível
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="mt-4 d-flex flex-wrap gap-3">
                  <CustomButton onClick={handleToggleFavorite}>
                    {isFavorite
                      ? "Remover dos Favoritos"
                      : "Adicionar aos Favoritos"}
                  </CustomButton>

                  <CustomButton
                    onClick={() =>
                      window.open(
                        `https://www.goodreads.com/search?q=${encodeURIComponent(
                          title
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    Ver no Goodreads
                  </CustomButton>

                  <CustomButton onClick={() => navigate("/minha-estante")}>
                    Ir para Minha Estante
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BookDetails;
