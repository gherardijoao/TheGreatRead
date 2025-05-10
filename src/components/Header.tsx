import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => (
  <header className="d-flex justify-content-between align-items-center pt-4 px-4">
    <Link
      to="/"
      className="fs-1 playfair-title text-light text-decoration-none"
    >
      TheGreatRead
    </Link>
    <nav>
      <Link
        to="/"
        className="text-light navbar-link mx-3"
        style={{ fontSize: "1.1rem" }}
      >
        Início
      </Link>
      <Link
        to="/classicos"
        className="text-light navbar-link mx-3"
        style={{ fontSize: "1.1rem" }}
      >
        Clássicos
      </Link>
      <Link
        to="/minha-estante"
        className="text-light navbar-link mx-3"
        style={{ fontSize: "1.1rem" }}
      >
        Minha Estante
      </Link>
    </nav>
  </header>
);
