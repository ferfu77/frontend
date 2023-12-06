import React from 'react';
import './Navbar.css';

function Navbar({ handleLinkClick }) {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#" onClick={() => handleLinkClick('inicio')}>Inicio</a></li>
        <li><a href="#" onClick={() => handleLinkClick('lista-edificios')}>Edificios</a></li>
        <li><a href="#" onClick={() => handleLinkClick('buscar-unidades')}>Unidades</a></li>
        <li><a href="#" onClick={() => handleLinkClick('lista-reclamos')}>Reclamos</a></li>
        <li><a href="#" onClick={() => handleLinkClick('generar-reclamo')}>Generar reclamos</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
