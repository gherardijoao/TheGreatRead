import React from 'react';

export const Footer: React.FC = () => (
  <footer className="w-100 py-5 mt-auto" style={{background: 'rgba(0,0,0,0.7)', color: '#FEF7CD', textAlign: 'center', fontSize: '1rem', letterSpacing: '0.5px'}}>
    © {new Date().getFullYear()} TheGreatRead. Todos os direitos reservados.
  </footer>
);
