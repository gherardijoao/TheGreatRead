import React from 'react';

export const Header: React.FC = () => (
  <header className="d-flex justify-content-between align-items-center pt-4 px-4">
    <div className="fs-1 playfair-title text-light">TheGreatRead</div>
    <nav>
      <a href="/" className="text-light navbar-link mx-3" style={{fontSize: '1.1rem'}}>Início</a>
      <a href="#" className="text-light navbar-link mx-3" style={{fontSize: '1.1rem'}}>Clássicos</a>
      <a href="/estante" className="text-light navbar-link mx-3" style={{fontSize: '1.1rem'}}>Minha Estante</a>
    </nav>
  </header>
);
