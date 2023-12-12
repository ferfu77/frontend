import React, { useState, useEffect } from 'react';
import './ListaReclamos.css'; // Importa tu archivo de estilos CSS
import BuscarReclamo from './BuscarReclamo';
import './BuscarReclamo.css';
import guardarReclamo from './GuardarReclamo';
import EliminarReclamo from './EliminarReclamo';

function ListaReclamosPersona() {
  const [reclamoEncontrado, setreclamoEncontrado] = useState(null);
  const [reclamos, setreclamos] = useState([]);
  const [nuevoReclamo, setNuevoreclamo] = useState({
    descripcion: '',
    ubicacion: '',
    estado: '',
    IdReclamo: '',
  });
  const guardarNuevoreclamo = async () => {
    try {
      await guardarReclamo(nuevoReclamo);
      // Realizar alguna acción adicional después de guardar la reclamo, si es necesario
    } catch (error) {
      // Manejar errores si la petición falla
    }
  };
  const handlereclamoEncontrado = (reclamo) => {
    setreclamoEncontrado(reclamo);
    
  
  };
  const cambiarEstadoReclamo = async (idReclamo, nuevoEstado) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reclamos/${idReclamo}/cambiarestado?estado=${nuevoEstado}`, {
        method: 'POST', // O el método HTTP correspondiente
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Estado cambiado:', data);
        // Realizar alguna acción adicional después de cambiar el estado del reclamo, si es necesario
      } else {
        const errorMessage = await response.text();
        console.error('Error al cambiar el estado del reclamo:', errorMessage);
        // Manejar errores si la petición falla
      }
    } catch (error) {
      console.error('Error al cambiar el estado del reclamo:', error);
      // Manejar errores de red u otros errores
    }
  };


  useEffect(() => {
    fetch('http://localhost:8080/api/reclamos/listar-con-imagenes')
      .then((response) => response.json())
      .then((data) => {
        setreclamos(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de los reclamos", error);
      });
  }, []);

  const eliminarReclamo = async (idReclamo) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reclamos/eliminar/${idReclamo}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const data = await response.text();
        console.log('reclamo eliminado:', data);
        // Realizar alguna acción adicional después de eliminar la reclamo, si es necesario
      } else {
        const errorMessage = await response.text();
        console.error('Error al eliminar reclamo:', errorMessage);
        // Manejar errores si la petición falla
      }
    } catch (error) {
      console.error('Error al eliminar reclamo:', error);
      // Manejar errores de red u otros errores
    }
  };

  return (
    <div className="lista-reclamos-container">

      

      <h2>Lista de Reclamos</h2>
      <table>
        <thead>
          <tr>
            <th>Ubicación</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Id Reclamo</th>
            <th>Imágenes</th>
            
          </tr>
        </thead>
        <tbody>
          {reclamos.map((reclamoConImagenes) => (
            <tr key={reclamoConImagenes.reclamo.idReclamo}>
              <td>{reclamoConImagenes.reclamo.ubicacion}</td>
              <td>{reclamoConImagenes.reclamo.descripcion}</td>
              <td>{reclamoConImagenes.reclamo.estado}</td>
              <td>{reclamoConImagenes.reclamo.idReclamo}</td>
              <td>
                {reclamoConImagenes.imagenes && reclamoConImagenes.imagenes.length > 0 ? (
                  <ul>
                    {reclamoConImagenes.imagenes.map((imagen, index) => (
                      <li key={index}>
                        <p><strong>Número:</strong> {imagen.numero}</p>
                        <p><strong>Dirección:</strong> {imagen.direccion}</p>
                        <p><strong>Tipo:</strong> {imagen.tipo}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay imágenes disponibles para este reclamo.</p>
                )}
              </td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    
    
  );
}

export default ListaReclamosPersona;
