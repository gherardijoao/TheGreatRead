import React from 'react';

export const Footer: React.FC = () => (
  <footer className="footer py-5 mt-auto" style={{background: '#000000', color: '#FEF7CD', width: '100%', paddingTop: '5rem', paddingBottom: '5rem'}}>
    <div className="container-fluid px-5">
      <div className="row g-5 justify-content-center">
        <div className="col-lg-3 text-center text-lg-start">
          <h3 className="playfair-title mb-5">TheGreatRead</h3>
          <p className="mb-5" style={{opacity: 0.8, fontSize: '1.1rem', lineHeight: '1.8'}}>
            Sua porta de entrada para o mundo da literatura. Descubra, explore e mergulhe em histórias que 
            atravessam o tempo e continuam a inspirar leitores ao redor do mundo.
          </p>
        </div>
        <div className="col-lg-3 text-center">
          <h3 className="playfair-title mb-5">Contato</h3>
          <ul className="list-unstyled" style={{opacity: 0.8, fontSize: '1.1rem', lineHeight: '2'}}>
            <li className="mb-3">+55 35 984382049</li>
            <li className="mb-3">gherardijoao@gmail.com</li>
            <li>Lavras - MG</li>
          </ul>
        </div>
        <div className="col-lg-3 text-center text-lg-end">
          <h3 className="playfair-title mb-5">Informações</h3>
          <ul className="list-unstyled" style={{opacity: 0.8, fontSize: '1.1rem', lineHeight: '2'}}>
            <li className="mb-3"><a href="https://developers.google.com/books" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Google Books API</a></li>
            <li className="mb-3"><a href="https://openlibrary.org/developers/api" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Open Library API</a></li>
            <li><a href="https://www.goodreads.com/api" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Goodreads API</a></li>
          </ul>
        </div>
      </div>
      <div className="row mt-5 pt-5">
        <div className="col-12 text-center" style={{opacity: 0.8, fontSize: '1rem'}}>
          <p className="mb-0">TheGreatRead © {new Date().getFullYear()}. Alguns direitos reservados.</p>
        </div>
      </div>
    </div>
  </footer>
);
