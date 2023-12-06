import React from 'react';
import './Navbar.css';

function Navbar({ handleLinkClick }) {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#" onClick={() => handleLinkClick('inicio')}>Inicio</a></li>
        <li><a href="#" onClick={() => handleLinkClick('lista-edificios')}>Edificios</a></li>
        <li><a href="#" onClick={() => handleLinkClick('buscar-unidades')}>Unidades</a></li>
        <li><a href="#" onClick={() => handleLinkClick('lista-personas')}>Personas</a></li>
        <li><a href="#" onClick={() => handleLinkClick('lista-reclamos')}>Reclamos</a></li>
        <li><a href="#" onClick={() => handleLinkClick('agregar-duenio')}>Agregar duenio</a></li>
        <li><a href="#" onClick={() => handleLinkClick('agregar-inquilino')}>Agregar inquilino</a></li>
        <li><a href="#" onClick={() => handleLinkClick('transferir-unidad')}>Transferir Unidad </a></li>
        <li><a href="#" onClick={() => handleLinkClick('sacar-inquilino')}>Sacar Inquilino </a></li>
        <li><a href="#" onClick={() => handleLinkClick('sacar-duenio')}>Sacar Duenio </a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
