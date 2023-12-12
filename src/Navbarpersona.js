import React from 'react';
import './Navbar.css';

function Navbar({ handleLinkClick }) {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#" onClick={() => handleLinkClick('inicio')}>Inicio</a></li>
        <li><a href="#" onClick={() => handleLinkClick('usuario-perfil')}>Mi Perfil</a></li>
        
        <li><a href="#" onClick={() => handleLinkClick('generar-reclamo')}>Generar reclamos</a></li>
        
        <li><a href="#" onClick={() => handleLinkClick('agregar-imagen')}>Agregar Imagen</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
