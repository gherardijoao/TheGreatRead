import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.scss";
import { CustomButton } from "../components/CustomButton";
import { BookCard } from "../components/BookCard";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

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

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { books, searchBooks, loading } = useBooks();

  // Fetch random books on mount
  useEffect(() => {
    const randomTerms = [
      "classics",
      "literature",
      "adventure",
      "history",
      "science",
      "fantasy",
      "novel",
      "romance",
      "mystery",
      "philosophy",
      "art",
      "biography",
      "fiction",
      "poetry",
      "drama",
    ];
    const randomTerm =
      randomTerms[Math.floor(Math.random() * randomTerms.length)];
    searchBooks(randomTerm);
  }, [searchBooks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      searchBooks(search);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/books/${id}`);
  };

  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <Header />

        {/* Hero Section */}
        <section className="hero-section py-3 py-md-4 py-lg-5">
          <div className="container px-3 px-md-4">
            <div className="row">
              <div className="col-12 col-lg-10">
                <h1
                  className="display-4 display-md-3 display-lg-2 playfair-title text-light mb-3 mb-md-4"
                  style={{
                    whiteSpace: "normal", // Change from nowrap to normal for mobile
                    fontSize: "calc(1.5rem + 3vw)", // Fluid typography
                  }}
                >
                  Descubra Tesouros da Literatura
                </h1>
                <p className="lead text-yellow mb-3 mb-md-4 ms-0 ms-md-1">
                  Explore uma vasta coleção de livros de diversos gêneros,
                  autores e épocas.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="input-group" style={{ maxWidth: "800px" }}>
                    <input
                      type="text"
                      className="form-control search-input text-light border-0 px-3 py-3"
                      placeholder="Procure por livros, autores ou gêneros..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ fontSize: "1.1rem" }}
                    />
                    <button
                      className="search-btn"
                      type="submit"
                      disabled={loading}
                    >
                      <img
                        src="/src/assets/search.svg"
                        alt="Buscar"
                        style={{ width: 24, height: 24 }}
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section py-4 py-md-5 bg-light">
          <div className="container px-3 px-md-4">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="display-5 display-md-4 playfair-title mb-3 mb-md-4">
                  Sobre The Great Read
                </h2>
                <p
                  className="lead mb-3 mb-md-4"
                  style={{ fontSize: "calc(1rem + 0.2vw)" }}
                >
                  O nome The Great Read é uma homenagem sutil a The Great
                  Gatsby, um dos maiores clássicos da literatura.Focado
                  especialmente nos clássicos, The Great Read é um espaço para
                  quem deseja explorar, pesquisar e descobrir obras que
                  atravessam o tempo aquelas que moldaram gerações e continuam a
                  inspirar leitores ao redor do mundo. Aqui, cada leitura é um
                  reencontro com o melhor que a literatura tem a oferecer.
                </p>
                <div className="features-grid">
                  <div className="feature-item">
                    <h3 className="h5">Ampla Coleção</h3>
                    <p>Milhares de títulos em diversos gêneros</p>
                  </div>
                  <div className="feature-item">
                    <h3 className="h5">Fácil Busca</h3>
                    <p>Encontre exatamente o que procura</p>
                  </div>
                  <div className="feature-item">
                    <h3 className="h5">Detalhes Completos</h3>
                    <p>Informações detalhadas sobre cada livro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Book Cards Section */}
        <section
          className="books-section py-3 py-md-4"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <div className="container px-3 px-md-4">
            <h2 className="text-center display-5 display-md-4 playfair-title text-light mb-3">
              Livros procurados
            </h2>
            <div className="row g-2 g-md-3 g-lg-4">
              {loading ? (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : books.length > 0 ? (
                books.slice(0, 8).map((book) => (
                  <div
                    className="col-6 col-sm-6 col-md-4 col-lg-3" // Change col-12 to col-6 for XS
                    key={book.id}
                  >
                    <BookCard book={book} onViewDetails={handleViewDetails} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-light">
                    No books found. Try another search.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Minha Estante Section */}
        <section className="my-shelf-section py-4 py-md-5 bg-light">
          <div className="container px-3 px-md-4">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="display-5 display-md-4 playfair-title mb-3 mb-md-4">
                  Minha Estante
                </h2>
                <p
                  className="lead mb-3 mb-md-4"
                  style={{ fontSize: "calc(1rem + 0.2vw)" }}
                >
                  Crie sua própria biblioteca digital personalizada! Ao
                  favoritar um livro, ele será automaticamente adicionado à sua
                  estante virtual. Organize suas leituras, mantenha um registro
                  dos seus livros favoritos e acesse-os facilmente a qualquer
                  momento. Sua estante é o seu espaço pessoal para colecionar e
                  organizar as obras que mais te inspiram.
                </p>
                <div className="row g-3 g-md-4 mb-4 mb-md-5">
                  {" "}
                  <div className="col-md-4">
                    <div className="feature-item">
                      <h3 className="h5" style={{ color: "#ffbb00" }}>
                        Coleção Pessoal
                      </h3>
                      <p>Organize seus livros favoritos</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-item">
                      <h3 className="h5" style={{ color: "#ffbb00" }}>
                        Acesso Rápido
                      </h3>
                      <p>Encontre seus livros facilmente</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-item">
                      <h3 className="h5" style={{ color: "#ffbb00" }}>
                        Organização
                      </h3>
                      <p>Mantenha tudo organizado</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 mt-md-5">
                  <CustomButton
                    onClick={() => navigate("/minha-estante")}
                    style={{
                      padding: "8px 16px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      fontSize: "1rem",
                    }}
                  >
                    Acessar Minha Estante
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
