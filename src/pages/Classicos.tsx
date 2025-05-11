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
      "great gatsby",
      "moby dick",
      "war and peace",
      "pride and prejudice",
      "fyodor dostoevsky",
      "charles dickens",
      "william shakespeare",
      "homer odyssey",
      "dante inferno",
      "cervantes don quixote",
      "tolstoy",
      "emily bronte",
      "virginia woolf",
      "a tale of two cities",
      "oliver twist",
      "david copperfield",
      "great expectations",
      "hard times",
      "anna karenina",
      "the death of ivan ilyich",
      "resurrection",
      "the old man and the sea",
      "a farewell to arms",
      "the sun also rises",
      "for whom the bell tolls",
      "crime and punishment",
      "the brothers karamazov",
      "wuthering heights",
      "mrs dalloway",
      "to the lighthouse",
      "les misérables",
      "the hunchback of notre-dame",
      "madame bovary",
      "germinal",
      "the stranger",
      "the plague",
      "the metamorphosis",
      "the trial",
      "faust",
      "the sorrows of young werther",
      "dom casmurro",
      "the posthumous memoirs of bras cubas",
      "the alienist",
      "the count of monte cristo",
      "the three musketeers",
      "nana",
      "eugénie grandet",
    ];

    const classicTermsPT = [
      "grande gatsby",
      "moby dick",
      "guerra e paz",
      "orgulho e preconceito",
      "fiodor dostoiévski",
      "charles dickens",
      "william shakespeare",
      "odisseia de homero",
      "inferno de dante",
      "dom quixote de cervantes",
      "tolstói",
      "emily brontë",
      "virginia woolf",
      "um conto de duas cidades",
      "oliver twist",
      "david copperfield",
      "grandes esperanças",
      "tempos difíceis",
      "anna karênina",
      "a morte de ivan ilitch",
      "ressurreição",
      "o velho e o mar",
      "adeus às armas",
      "o sol também se levanta",
      "por quem os sinos dobram",
      "crime e castigo",
      "os irmãos karamazov",
      "morro dos ventos uivantes",
      "mrs. dalloway",
      "ao farol",
      "os miseráveis",
      "o corcunda de notre-dame",
      "madame bovary",
      "germinal",
      "o estrangeiro",
      "a peste",
      "a metamorfose",
      "o processo",
      "fausto",
      "os sofrimentos do jovem werther",
      "dom casmurro",
      "memórias póstumas de brás cubas",
      "o alienista",
      "o conde de monte cristo",
      "os três mosqueteiros",
      "nana",
      "eugénie grandet",
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
      "great gatsby",
      "moby dick",
      "war and peace",
      "pride and prejudice",
      "fyodor dostoevsky",
      "charles dickens",
      "william shakespeare",
      "homer odyssey",
      "dante inferno",
      "cervantes don quixote",
      "tolstoy",
      "emily bronte",
      "virginia woolf",
      "a tale of two cities",
      "oliver twist",
      "david copperfield",
      "great expectations",
      "hard times",
      "anna karenina",
      "the death of ivan ilyich",
      "resurrection",
      "the old man and the sea",
      "a farewell to arms",
      "the sun also rises",
      "for whom the bell tolls",
      "crime and punishment",
      "the brothers karamazov",
      "wuthering heights",
      "mrs dalloway",
      "to the lighthouse",
      "les misérables",
      "the hunchback of notre-dame",
      "madame bovary",
      "germinal",
      "the stranger",
      "the plague",
      "the metamorphosis",
      "the trial",
      "faust",
      "the sorrows of young werther",
      "dom casmurro",
      "the posthumous memoirs of bras cubas",
      "the alienist",
      "the count of monte cristo",
      "the three musketeers",
      "nana",
      "eugénie grandet",
    ];

    const classicTermsPT = [
      "grande gatsby",
      "moby dick",
      "guerra e paz",
      "orgulho e preconceito",
      "fiodor dostoiévski",
      "charles dickens",
      "william shakespeare",
      "odisseia de homero",
      "inferno de dante",
      "dom quixote de cervantes",
      "tolstói",
      "emily brontë",
      "virginia woolf",
      "um conto de duas cidades",
      "oliver twist",
      "david copperfield",
      "grandes esperanças",
      "tempos difíceis",
      "anna karênina",
      "a morte de ivan ilitch",
      "ressurreição",
      "o velho e o mar",
      "adeus às armas",
      "o sol também se levanta",
      "por quem os sinos dobram",
      "crime e castigo",
      "os irmãos karamazov",
      "morro dos ventos uivantes",
      "mrs. dalloway",
      "ao farol",
      "os miseráveis",
      "o corcunda de notre-dame",
      "madame bovary",
      "germinal",
      "o estrangeiro",
      "a peste",
      "a metamorfose",
      "o processo",
      "fausto",
      "os sofrimentos do jovem werther",
      "dom casmurro",
      "memórias póstumas de brás cubas",
      "o alienista",
      "o conde de monte cristo",
      "os três mosqueteiros",
      "nana",
      "eugénie grandet",
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
                  Clássicos da Literatura
                </h1>
                <p className="lead text-yellow mb-4 ms-1">
                  Explore obras que moldaram nossa cultura e continuam a
                  inspirar gerações.
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
                    Ambos
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="input-group" style={{ maxWidth: "800px" }}>
                    <input
                      type="text"
                      className="form-control search-input text-light border-0 px-3 py-3"
                      placeholder="Procure por autores clássicos ou títulos..."
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

        {/* About Classics Section */}
        <section className="about-section py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="display-4 playfair-title mb-4">
                  Por que ler os Clássicos?
                </h2>
                <p className="lead mb-4">
                  "Um clássico é um livro que nunca terminou de dizer aquilo que
                  tinha para dizer." - Italo Calvino
                </p>
                <p className="mb-4">
                  Os livros clássicos transcendem seu tempo e lugar de origem.
                  Eles continuam a ressoar com leitores através das gerações
                  porque abordam questões fundamentais da experiência humana:
                  amor, poder, moralidade, identidade, e nossa relação com a
                  natureza e a sociedade. Ao lermos os clássicos, engajamos-nos
                  em um diálogo com as mentes mais brilhantes da história e
                  ganhamos novas perspectivas sobre nossa própria realidade.
                </p>
                <div className="features-grid">
                  <div className="feature-item">
                    <h3 className="h5">Relevância Duradoura</h3>
                    <p>Temas que permanecem significativos através do tempo</p>
                  </div>
                  <div className="feature-item">
                    <h3 className="h5">Profundidade Artística</h3>
                    <p>Obras que revolucionaram a forma e o estilo literário</p>
                  </div>
                  <div className="feature-item">
                    <h3 className="h5">Impacto Cultural</h3>
                    <p>Histórias que moldaram nossa linguagem e pensamento</p>
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
              Obras Clássicas
            </h2>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Carregando...</span>
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
                    {loadingMore ? "Carregando..." : "Carregar Mais Clássicos"}
                  </CustomButton>
                </div>
              </>
            ) : (
              <div className="text-center py-5">
                <p className="text-light">
                  Nenhuma obra clássica encontrada. Tente outra busca.
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
                  Guias de Leitura
                </h2>
                <p className="lead mb-4">
                  A literatura clássica pode parecer intimidadora à primeira
                  vista. Porém deve-se entender o contexto histórico, analisar
                  os temas principais e principalmente dicas apreciar cada obra.
                </p>
                <div className="row g-4 mb-5">
                  <div className="col-md-4">
                    <div className="feature-item">
                      <h3 className="h5" style={{ color: "#ffbb00" }}>
                        Contexto Histórico
                      </h3>
                      <p>Entenda o período em que cada obra foi escrita</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-item">
                      <h3 className="h5" style={{ color: "#ffbb00" }}>
                        Análise Literária
                      </h3>
                      <p>Explore os temas e técnicas de cada autor</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-item">
                      <h3 className="h5" style={{ color: "#ffbb00" }}>
                        Por onde começar
                      </h3>
                      <p>
                        Pesquise livros que contém assuntos, temas, cenários e
                        épocas que te interessem.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5"></div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
