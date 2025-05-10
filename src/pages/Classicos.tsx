import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks, isClassicBook } from "../hooks/useBooks";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BookCard } from "../components/BookCard";
import { CustomButton } from "../components/CustomButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.scss";

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

const languageBtnStyle: React.CSSProperties = {
  padding: "8px 16px",
  marginRight: "10px",
  borderRadius: "4px",
  cursor: "pointer",
  backgroundColor: "transparent",
  color: "white",
  border: "1px solid white",
  fontSize: "0.9rem",
  transition: "all 0.2s ease",
};

const activeLanguageBtnStyle: React.CSSProperties = {
  backgroundColor: "#ffbb00",
  color: "black",
  border: "1px solid #ffbb00",
};

export default function Classicos() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { books, searchBooks, loading, language, setPreferredLanguage } =
    useBooks();
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [currentTerm, setCurrentTerm] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  // Initial load of classic books
  useEffect(() => {
    // Choose a random term to search for at first load based on current language preference
    const classicTermsEN = [
      "classic literature",
      "great gatsby",
      "moby dick",
      "war and peace",
      "pride and prejudice",
    ];

    const classicTermsPT = [
      "literatura clássica",
      "grande gatsby",
      "moby dick",
      "guerra e paz",
      "orgulho e preconceito",
    ];

    let termsToUse;

    if (language === "en") {
      termsToUse = classicTermsEN;
    } else if (language === "pt") {
      termsToUse = classicTermsPT;
    } else {
      termsToUse = [...classicTermsEN, ...classicTermsPT];
    }

    const randomTerm =
      termsToUse[Math.floor(Math.random() * termsToUse.length)];
    setCurrentTerm(randomTerm);
    searchBooks(randomTerm, 0, 20, language);
  }, [searchBooks, language]);

  // Filter books to show only classics
  useEffect(() => {
    const classics = books.filter(isClassicBook);
    setFilteredBooks(classics);
  }, [books]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setCurrentTerm(search);
      searchBooks(search, 0, 20, language);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/books/${id}`);
  };

  const loadMoreClassics = () => {
    setLoadingMore(true);

    // Pick terms based on current language preference
    const classicTermsEN = [
      "classic literature",
      "great gatsby",
      "moby dick",
      "war and peace",
      "pride and prejudice",
      "jane austen",
      "fyodor dostoevsky",
    ];

    const classicTermsPT = [
      "literatura clássica",
      "grande gatsby",
      "moby dick",
      "guerra e paz",
      "orgulho e preconceito",
      "jane austen",
      "fiodor dostoiévski",
    ];

    let termsToUse;

    if (language === "en") {
      termsToUse = classicTermsEN;
    } else if (language === "pt") {
      termsToUse = classicTermsPT;
    } else {
      termsToUse = [...classicTermsEN, ...classicTermsPT];
    }

    // Filter out current term
    const availableTerms = termsToUse.filter((term) => term !== currentTerm);

    // Choose a different search term from the list
    const nextTerm =
      availableTerms[Math.floor(Math.random() * availableTerms.length)];
    setCurrentTerm(nextTerm);

    searchBooks(nextTerm, 0, 20, language).finally(() => {
      setLoadingMore(false);
    });
  };

  return (
    <>
      <div style={backgroundStyle}></div>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <Header />

        {/* Hero Section */}
        <section className="hero-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-10">
                <h1
                  className="display-2 playfair-title text-light mb-4"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {language === "en"
                    ? "Literary Classics"
                    : "Clássicos da Literatura"}
                </h1>
                <p className="lead text-yellow mb-4 ms-1">
                  {language === "en"
                    ? "Explore works that have shaped our culture and continue to inspire generations."
                    : "Explore obras que moldaram nossa cultura e continuam a inspirar gerações."}
                </p>

                {/* Language Selection */}
                <div className="mb-4">
                  <button
                    style={{
                      ...languageBtnStyle,
                      ...(language === "pt" ? activeLanguageBtnStyle : {}),
                    }}
                    onClick={() => setPreferredLanguage("pt")}
                  >
                    Português
                  </button>
                  <button
                    style={{
                      ...languageBtnStyle,
                      ...(language === "en" ? activeLanguageBtnStyle : {}),
                    }}
                    onClick={() => setPreferredLanguage("en")}
                  >
                    English
                  </button>
                  <button
                    style={{
                      ...languageBtnStyle,
                      ...(language === "both" ? activeLanguageBtnStyle : {}),
                    }}
                    onClick={() => setPreferredLanguage("both")}
                  >
                    Both / Ambos
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="input-group" style={{ maxWidth: "800px" }}>
                    <input
                      type="text"
                      className="form-control search-input text-light border-0 px-3 py-3"
                      placeholder={
                        language === "en"
                          ? "Search for classic authors or titles..."
                          : "Procure por autores clássicos ou títulos..."
                      }
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
                        alt={language === "en" ? "Search" : "Buscar"}
                        style={{ width: 24, height: 24 }}
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* About Classics Section */}
        <section className="about-section py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="display-4 playfair-title mb-4">
                  {language === "en"
                    ? "Why Read the Classics?"
                    : "Por que ler os Clássicos?"}
                </h2>
                <p className="lead mb-4">
                  {language === "en"
                    ? '"A classic is a book that has never finished saying what it has to say." - Italo Calvino'
                    : '"Um clássico é um livro que nunca terminou de dizer aquilo que tinha para dizer." - Italo Calvino'}
                </p>
                <p className="mb-4">
                  {language === "en"
                    ? "Classic books transcend their time and place of origin. They continue to resonate with readers across generations because they address fundamental questions of human experience: love, power, morality, identity, and our relationship with nature and society. By reading classics, we engage in a dialogue with history's brightest minds and gain new perspectives on our own reality."
                    : "Os livros clássicos transcendem seu tempo e lugar de origem. Eles continuam a ressoar com leitores através das gerações porque abordam questões fundamentais da experiência humana: amor, poder, moralidade, identidade, e nossa relação com a natureza e a sociedade. Ao lermos os clássicos, engajamos-nos em um diálogo com as mentes mais brilhantes da história e ganhamos novas perspectivas sobre nossa própria realidade."}
                </p>
                <div className="features-grid">
                  <div className="feature-item">
                    <h3 className="h5">
                      {language === "en"
                        ? "Enduring Relevance"
                        : "Relevância Duradoura"}
                    </h3>
                    <p>
                      {language === "en"
                        ? "Themes that remain significant throughout time"
                        : "Temas que permanecem significativos através do tempo"}
                    </p>
                  </div>
                  <div className="feature-item">
                    <h3 className="h5">
                      {language === "en"
                        ? "Artistic Depth"
                        : "Profundidade Artística"}
                    </h3>
                    <p>
                      {language === "en"
                        ? "Works that revolutionized literary form and style"
                        : "Obras que revolucionaram a forma e o estilo literário"}
                    </p>
                  </div>
                  <div className="feature-item">
                    <h3 className="h5">
                      {language === "en"
                        ? "Cultural Impact"
                        : "Impacto Cultural"}
                    </h3>
                    <p>
                      {language === "en"
                        ? "Stories that shaped our language and thinking"
                        : "Histórias que moldaram nossa linguagem e pensamento"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Classic Books Section */}
        <section
          className="books-section py-3"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <div className="container">
            <h2 className="text-center display-4 playfair-title text-light mb-3">
              {language === "en" ? "Classic Works" : "Obras Clássicas"}
            </h2>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">
                    {language === "en" ? "Loading..." : "Carregando..."}
                  </span>
                </div>
              </div>
            ) : filteredBooks.length > 0 ? (
              <>
                <div className="row g-2">
                  {filteredBooks.map((book) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3"
                      key={book.id}
                    >
                      <BookCard book={book} onViewDetails={handleViewDetails} />
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <CustomButton
                    onClick={loadMoreClassics}
                    disabled={loadingMore}
                    style={{ padding: "10px 20px" }}
                  >
                    {loadingMore
                      ? language === "en"
                        ? "Loading..."
                        : "Carregando..."
                      : language === "en"
                      ? "Load More Classics"
                      : "Carregar Mais Clássicos"}
                  </CustomButton>
                </div>
              </>
            ) : (
              <div className="text-center py-5">
                <p className="text-light">
                  {language === "en"
                    ? "No classic works found. Try another search."
                    : "Nenhuma obra clássica encontrada. Tente outra busca."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Reading Guides Section */}
        <section className="my-shelf-section py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="display-4 playfair-title mb-4">
                  {language === "en" ? "Reading Guides" : "Guias de Leitura"}
                </h2>
                <p className="lead mb-4">
                  {language === "en"
                    ? "Classic literature can seem intimidating at first glance. Our reading guides offer historical context, analysis of main themes, and tips for appreciating each work."
                    : "A literatura clássica pode parecer intimidadora à primeira vista. Nossos guias de leitura oferecem contexto histórico, análises dos temas principais e dicas para apreciar cada obra."}
                </p>
                <div className="row g-4 mb-5">
                  <div className="col-md-4">
                    <div className="feature-item">
                      <h3 className="h5" style={{ color: "#ffbb00" }}>
                        {language === "en"
                          ? "Historical Context"
                          : "Contexto Histórico"}
                      </h3>
                      <p>
                        {language === "en"
                          ? "Understand the period when each work was written"
                          : "Entenda o período em que cada obra foi escrita"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-item">
                      <h3 className="h5" style={{ color: "#ffbb00" }}>
                        {language === "en"
                          ? "Literary Analysis"
                          : "Análise Literária"}
                      </h3>
                      <p>
                        {language === "en"
                          ? "Explore the themes and techniques of each author"
                          : "Explore os temas e técnicas de cada autor"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-item">
                      <h3 className="h5" style={{ color: "#ffbb00" }}>
                        {language === "en"
                          ? "Reading Recommendations"
                          : "Recomendações de Leitura"}
                      </h3>
                      <p>
                        {language === "en"
                          ? "Discover where to begin your literary journey"
                          : "Descubra por onde começar sua jornada literária"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <CustomButton
                    onClick={() => {
                      /* Add navigation logic here */
                    }}
                    style={{ padding: "12px 24px", fontSize: "1.1rem" }}
                  >
                    {language === "en"
                      ? "Access Reading Guides"
                      : "Acessar Guias de Leitura"}
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
