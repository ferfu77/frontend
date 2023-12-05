import React, { useState } from 'react';
import Login from './Login';
import Navbar from './Navbar';
import ListaPersonas from './ListaPersonas';
import ListaEdificios from './Edificio';
import BuscarUnidades from './BuscarUnidades';
import AgregarDuenio from './AgregarDuenio';
import AgregarInquilino from './AgregarInquilino';
import Navbarpersona from './Navbarpersona';


function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        }
        setIsLoggedIn(true);
      } else {

      }
    } catch (error) {
      // Manejo de errores
    }
  };

  const renderUsuarioComun = () => {
    return (
      <div>
        <h1>Página de Usuario Común</h1>
        <p>Contenido para usuarios regulares...</p>
        {/* Agrega aquí cualquier contenido que desees mostrar */}
      </div>
    );
  };

  return (
    <div className="App">
      <Navbarpersona/>
      
      
      {isLoggedIn ? (
        isAdmin ? (
          <Navbar handleLinkClick={handleLinkClick} />
        ) : (
          renderUsuarioComun()
        )
      ) : (
        <Login onLogin={handleLogin} />
      )}

      
      {isAdmin && currentPage === 'lista-personas' && <ListaPersonas />}
      {isAdmin && currentPage === 'lista-edificios' && <ListaEdificios />}
      {isAdmin && currentPage === 'buscar-unidades' && <BuscarUnidades />}
      {isAdmin && currentPage === 'agregar-duenio' && <AgregarDuenio />}
      {isAdmin && currentPage === 'agregar-inquilino' && <AgregarInquilino />}
    </div>
  );
}

export default App;
