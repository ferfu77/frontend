import React, { useState, useEffect } from 'react';
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
import ListaReclamosPersona from './ListaReclamosPersona';
import "./App.css";
import AgregarImagen from './AgregarImagen';



function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('inicio');
  const [loginMessage, setLoginMessage] = useState('');
  const handleLinkClick = (page) => {
    console.log("navegando a "+ page)
    setCurrentPage(page);
  };
  const [userEmail, setUserEmail] = useState('');
  const [reclamos, setReclamos] = useState(null);
  const [unidad, setUnidad] = useState([]);
  const [unidadEncontrada, setUnidadEncontrada] = useState(false);

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
        setUserEmail(email); // Guardar el email del usuario en el estado

        // Guardar el email en el localStorage después del inicio de sesión exitoso
        localStorage.setItem('userEmail', email);

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

  async function obtenerUnidadPorDuenio(email) {
    try {
      const response = await fetch(`http://localhost:8080/api/unidades/porDuenio?mail=${email}`);
      if (response.ok) {
        const unidad = await response.json();
        return unidad;
      } else {
        throw new Error('No se encontró unidad como dueño');
      }
    } catch (error) {
      console.error('Error al obtener unidad como dueño:', error.message);
      return null;
    }
  }
  
  async function obtenerUnidadPorInquilino(email) {
    console.log('Buscando unidad para el inquilino con email:', email);
  
    try {
      const response = await fetch(`http://localhost:8080/api/unidades/porInquilinos?mail=${email}`);
      console.log('Respuesta de la solicitud:', response);
  
      if (response.ok) {
        const unidad = await response.json();
        console.log('Unidad encontrada para el inquilino:', unidad);
        return unidad;
      } else {
        throw new Error('No se encontró unidad como inquilino');
      }
    } catch (error) {
      console.error('Error al obtener unidad como inquilino:', error.message);
      return null;
    }
  }
  
  
  async function obtenerUnidadesPorPersona(email) {
    try {
      const response = await fetch(`http://localhost:8080/api/unidades/porPersona?mail=${email}`);
      if (response.ok) {
        const unidades = await response.json();
        // Verifica si ya se ha encontrado una unidad antes de actualizar el estado
        if (!unidadEncontrada && unidades && unidades.length > 0) {
          setUnidad(unidades);
          setUnidadEncontrada(true); // Establece la bandera en true una vez que se encuentra la unidad
        }
        return unidades;
      } else {
        throw new Error('Error al obtener unidades por persona');
      }
    } catch (error) {
      console.error('Error al obtener unidades por persona:', error.message);
      return null;
    }
  }
  

  obtenerUnidadPorInquilino(userEmail)
  .then((unidades) => {
    if (unidades && unidades.length > 0) {
      console.log('Unidades encontradas para el inquilino:', unidades);
      
       setUnidad(unidades);
    } else {
      console.log('No se encontró ninguna unidad asociada a este inquilino.');
    }
  })
  .catch((error) => {
    console.error('Error al obtener unidades como inquilino:', error);
  });

  useEffect(() => {
    if (isLoggedIn && userEmail && !unidadEncontrada) {
      obtenerUnidadesPorPersona(userEmail)
        .then((unidades) => {
          // Resto del código sigue igual
          // ...
        })
        .catch((error) => {
          console.error('Error al obtener unidades:', error);
        });
    }
  }, [isLoggedIn, userEmail, unidadEncontrada]);
  


  const obtenerReclamos = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reclamos/porPersona?mail=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setReclamos(data); // Almacenar los reclamos en el estado
      } else {
        throw new Error('Error al obtener reclamos por persona');
      }
    } catch (error) {
      console.error('Error al obtener reclamos por persona:', error.message);
    }
  };

  useEffect(() => {
    // Llamar a obtenerReclamos cuando el usuario esté logueado
    if (isLoggedIn) {
      obtenerReclamos();
    }
  }, [isLoggedIn, userEmail]);



  const renderUsuarioComun = () => {
    return (
      <>
        <Navbarpersona handleLinkClick={handleLinkClick} />
        {currentPage === 'inicio' && (
          <div>
            <h1>Página de Usuario Común</h1>
            <p>Contenido para usuarios regulares...</p>
          </div>
        )}
      {currentPage === 'lista-personas' && <ListaPersonas />}
      {currentPage === 'generar-reclamo' && <GenerarReclamo />}
      {currentPage === 'agregar-imagen' && <AgregarImagen />}
        {currentPage === 'usuario-perfil' && unidad && (
          <div className="perfil-usuario">
            <h1>Su perfil</h1>
            <table>
              {/* Mostrar detalles de la unidad */}
              <thead>
                <tr>
                  <th>Id de unidad</th>
                  <th>Piso</th>
                  <th>Numero</th>
                  <th>Habitado</th>
                  <th>Nombre edificio</th>
                  <th>Direccion edificio</th>
                </tr>
              </thead>
              <tbody>
                {unidad.map((unidades) => (
                  <tr key={unidades.id}>
                    <td>{unidades.id}</td>
                    <td>{unidades.piso}</td>
                    <td>{unidades.numero}</td>
                    <td>{unidades.habitado ? 'Sí' : 'No'}</td>
                    <td>{unidades.edificio.nombre}</td>
                    <td>{unidades.edificio.direccion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            {/* Mostrar reclamos */}
            <h1>Sus Reclamos</h1>
            <table>
              <thead>
                <tr>
                  <th>Reclamo ID</th>
                  <th>Descripción</th>
                  <th>Ubicacion</th>
                  <th>Estado</th>
                  <th>Numero</th>
                  <th>Direccion</th>
                </tr>
              </thead>
              <tbody>
                {reclamos &&
                  reclamos.map((reclamo) => (
                    <tr key={reclamo.idreclamo}>
                      <td>{reclamo.idreclamo}</td>
                      <td>{reclamo.descripcion}</td>
                      <td>{reclamo.ubicacion}</td>
                      <td>{reclamo.estado}</td>
                      <td>
                        {reclamo.imagenes && reclamo.imagenes.length > 0 && (
                          <span>{reclamo.imagenes[0].numero}</span>
                        )}
                      </td>
                      <td>
                        {reclamo.imagenes && reclamo.imagenes.length > 0 && (
                          <span>{reclamo.imagenes[0].direccion}</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
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
