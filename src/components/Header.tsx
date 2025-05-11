import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="pt-3 pt-md-4 px-3 px-md-4">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="fs-4 fs-md-3 fs-lg-1 playfair-title text-light text-decoration-none"
          >
            TheGreatRead
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="d-md-none bg-transparent border-0 text-light"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {menuOpen ? (
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              ) : (
                <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="d-none d-md-flex">
            <Link to="/" className="text-light navbar-link mx-2 mx-lg-3">
              Início
            </Link>
            <Link
              to="/classicos"
              className="text-light navbar-link mx-2 mx-lg-3"
            >
              Clássicos
            </Link>
            <Link
              to="/minha-estante"
              className="text-light navbar-link mx-2 mx-lg-3"
            >
              Minha Estante
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="d-md-none py-3 mt-2 text-center">
            <div className="d-flex flex-column">
              <Link
                to="/"
                className="text-light navbar-link py-2"
                onClick={toggleMenu}
              >
                Início
              </Link>
              <Link
                to="/classicos"
                className="text-light navbar-link py-2"
                onClick={toggleMenu}
              >
                Clássicos
              </Link>
              <Link
                to="/minha-estante"
                className="text-light navbar-link py-2"
                onClick={toggleMenu}
              >
                Minha Estante
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
