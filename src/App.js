import React, { useState } from 'react';
import Login from './Login';
import Navbar from './Navbar';
import ListaPersonas from './ListaPersonas';
import ListaEdificios from './Edificio';
import BuscarUnidades from './BuscarUnidades';
import AgregarDuenio from './AgregarDuenio';
import AgregarInquilino from './AgregarInquilino';
import Navbarpersona from './Navbarpersona';
import ListaReclamos from './ListaReclamos';
import GenerarReclamo from './GenerarReclamo';
import TransferirUnidad from './TransferirUnidad';
import SacarInquilino from './SacarInquilino';
import SacarDuenio from './SacarDuenio';


function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('inicio');
  const [loginMessage, setLoginMessage] = useState('');
  const handleLinkClick = (page) => {
    console.log("navegando a "+ page)
    setCurrentPage(page);
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:8080/api/persona/login?mail=${email}&password=${password}`);
      if (response.ok) {
        const data = await response.text();
        if (data === 'Bienvenido, eres un administrador.') {
          setLoginMessage('¡Eres un administrador!');
          setIsAdmin(true);
        } else {
          setLoginMessage(data);
        }
        setIsLoggedIn(true);

      } else if (response.status === 401) {
        setLoginMessage('Credenciales inválidas');
      } else if (response.status === 404) {
        setLoginMessage('Usuario no encontrado');
      } else {
        setLoginMessage('Error al iniciar sesión');
      }
    } catch (error) {
      setLoginMessage('Error al iniciar sesión');
    }
  };

  const renderUsuarioComun = () => {
  
    return (
      <>
      <Navbarpersona handleLinkClick={handleLinkClick}/>
      {currentPage==='inicio' &&
      <div>
        <h1>Página de Usuario Común</h1>
        <p>Contenido para usuarios regulares...</p>
        {/* Agrega aquí cualquier contenido que desees mostrar */}
      </div>
      }
      {currentPage === 'lista-personas' && <ListaPersonas />}
      {currentPage === 'lista-edificios' && <ListaEdificios />}
      {currentPage === 'buscar-unidades' && <BuscarUnidades />}
      {currentPage === 'lista-reclamos' && <ListaReclamos />}
      {currentPage === 'generar-reclamo' && <GenerarReclamo />}
      </> 
    );
  };

  return (
    <div className="App">

      
      
      {isLoggedIn ? (
        isAdmin ? (
          <Navbar handleLinkClick={handleLinkClick} />
        ) : (
          renderUsuarioComun()
        )
      ) : (
        <Login onLogin={handleLogin} message={loginMessage}/>
      )}

      
      {isAdmin && currentPage === 'lista-personas' && <ListaPersonas />}
      {isAdmin && currentPage === 'lista-edificios' && <ListaEdificios />}
      {isAdmin && currentPage === 'buscar-unidades' && <BuscarUnidades />}
      {isAdmin && currentPage === 'lista-reclamos' && <ListaReclamos />}
      {isAdmin && currentPage === 'agregar-duenio' && <AgregarDuenio />}
      {isAdmin && currentPage === 'agregar-inquilino' && <AgregarInquilino />}
      {isAdmin && currentPage === 'transferir-unidad' && <TransferirUnidad />}
      {isAdmin && currentPage === 'sacar-inquilino' && <SacarInquilino />}
      {isAdmin && currentPage === 'sacar-duenio' && <SacarDuenio />}
    </div>
  );
}

export default App;
