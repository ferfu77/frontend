import React, { useState } from 'react';
import Login from './Login';

import Navbar from './Navbar';
import ListaPersonas from './ListaPersonas';
import ListaEdificios from './Edificio';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('inicio');
  const handleLinkClick = (page) => {
    setCurrentPage(page);
  };
  

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:8080/api/persona/login?mail=${email}&password=${password}`);
      if (response.ok) {
        const data = await response.text();
        if (data === 'Bienvenido, eres un administrador.') {
          setIsAdmin(true);
        } else {
          // Manejo de mensajes de error u otros estados
        }
      } else {
        // Manejo de mensajes de error u otros estados
      }
    } catch (error) {
      // Manejo de errores
    }
  };

  return (
    <div className="App">
      {isAdmin ? (
        <Navbar handleLinkClick={handleLinkClick} /> // Pasa la función handleLinkClick a Navbar
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {isAdmin && currentPage === 'lista-personas' && <ListaPersonas />} {/* Renderiza ListaPersonas si el isAdmin es verdadero y la página actual es 'lista-personas' */}
      {isAdmin && currentPage === 'lista-edificios' && <ListaEdificios />}
    </div>
  );
}

export default App;
