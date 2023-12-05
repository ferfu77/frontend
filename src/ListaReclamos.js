import React, { useState, useEffect } from 'react';
import './ListaReclamos.css'; // Importa tu archivo de estilos CSS
import BuscarReclamo from './BuscarReclamo';
import './BuscarReclamo.css';
import guardarReclamo from './GuardarReclamo';
import EliminarReclamo from './EliminarReclamo';

function ListaReclamos() {
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

  useEffect(() => {
    fetch('http://localhost:8080/api/reclamos/listar')
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
      
      <BuscarReclamo onreclamoEncontrado={handlereclamoEncontrado} />
      {reclamoEncontrado && (
        <div>
          <h3>Información de la reclamo Encontrada</h3>
          <p><strong>Ubicacion:</strong> {reclamoEncontrado.ubicacion}</p>
          <p><strong>Estado:</strong> {reclamoEncontrado.estado}</p>
          <p><strong>IdReclamo:</strong> {reclamoEncontrado.IdReclamo}</p>
          <p><strong>Descripcion:</strong> {reclamoEncontrado.descripcion}</p>
          {/* Agregar más detalles según la estructura de datos */}
        </div>
        )}
      <div>
        <h3>Agregar Nuevo reclamo</h3>
        <input
          type="text"
          placeholder="Ubicacion"
          value={nuevoReclamo.ubicacion}
          onChange={(e) =>
            setNuevoreclamo({ ...nuevoReclamo, ubicacion: e.target.value })
          }
        />
          <input
          type="text"
          placeholder="Descripcion"
          value={nuevoReclamo.descripcion}
          onChange={(e) =>
            setNuevoreclamo({ ...nuevoReclamo, descripcion: e.target.value })
          }
        />
                  <input
          type="text"
          placeholder="Estado"
          value={nuevoReclamo.Estado}
          onChange={(e) =>
            setNuevoreclamo({ ...nuevoReclamo, Estado: e.target.value })
          }
        />
                  <input
          type="text"
          placeholder="IdReclamo"
          value={nuevoReclamo.IdReclamo}
          onChange={(e) =>
            setNuevoreclamo({ ...nuevoReclamo, IdReclamo: e.target.value })
          }
        />
        
        <button onClick={guardarNuevoreclamo}>Agregar</button>
      </div>
       <h2>Lista de Reclamos</h2>
      <table>
        <thead>
          <tr>
            <th>Ubicacion</th>
            <th>Descripcion</th>
            <th>Estado</th>
            <th>IdReclamo</th>
          </tr>
        </thead>
        <tbody>
          {reclamos.map((reclamo) => (
            <tr key={reclamo.IdReclamo}>
              <td>{reclamo.ubicacion}</td>
              <td>{reclamo.descripcion}</td>
              <td>{reclamo.estado}</td>
              <td>{reclamo.IdReclamo}</td>
              <EliminarReclamo
                  IdReclamo={reclamo.IdReclamo}
                  eliminarreclamo={eliminarReclamo}
                />
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
    
    
    
  );
}

export default ListaReclamos;
