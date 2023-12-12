import React, { useState, useEffect } from 'react';
import './ListaPersonas.css'; // Importa tu archivo de estilos CSS
import BuscarPersona from './BuscarPersona';
import './BuscarPersona.css';
import guardarPersona from './guardarPersona';
import EliminarPersona from './EliminarPersona';

function ListaPersonas() {
  const [personaEncontrada, setPersonaEncontrada] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [personaEliminada, setPersonaEliminada] = useState(false);
  const [nuevaPersona, setNuevaPersona] = useState({
    documento: '',
    nombre: '',
    mail: '',
    password: '',
  });
  const guardarNuevaPersona = async () => {
    try {
      await guardarPersona(nuevaPersona);
      // Realizar alguna acción adicional después de guardar la persona, si es necesario
    } catch (error) {
      // Manejar errores si la petición falla
    }
  };
  const handlePersonaEncontrada = (persona) => {
    setPersonaEncontrada(persona);
    
  
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/persona/listar')
      .then((response) => response.json())
      .then((data) => {
        setPersonas(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos", error);
      });
    }, [personaEliminada]);

  const eliminarPersona = async (documento) => {
    try {
      const response = await fetch(`http://localhost:8080/api/persona/eliminar/${documento}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPersonaEliminada(true); // Cambia el estado para mostrar el mensaje de eliminación
        setTimeout(() => {
          setPersonaEliminada(false); // Después de unos segundos, oculta el mensaje
        }, 3000); // Cambia este valor para ajustar la duración del mensaje (en milisegundos)
      } else {
        const errorMessage = await response.text();
        console.error('Error al eliminar persona:', errorMessage);
        // Manejar errores si la petición falla
      }
    } catch (error) {
      console.error('Error al eliminar persona:', error);
      // Manejar errores de red u otros errores
    }
  };

  return (
    <div className="lista-personas-container">
      {personaEliminada && <div className="mensaje-eliminacion">¡Persona eliminada!</div>} {/* Muestra el mensaje si se eliminó una persona */}
      <BuscarPersona onPersonaEncontrada={handlePersonaEncontrada} />
      {personaEncontrada && (
        <div>
          <h3>Información de la Persona Encontrada</h3>
          <p><strong>Nombre:</strong> {personaEncontrada.nombre}</p>
          <p><strong>Email:</strong> {personaEncontrada.mail}</p>
          <p><strong>Contraseña:</strong> {personaEncontrada.password}</p>
          <p><strong>Documento:</strong> {personaEncontrada.documento}</p>
          {/* Agregar más detalles según la estructura de datos */}
        </div>
        )}
      <div>
        <h3>Agregar Nueva Persona</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevaPersona.nombre}
          onChange={(e) =>
            setNuevaPersona({ ...nuevaPersona, nombre: e.target.value })
          }
        />
          <input
          type="text"
          placeholder="Documento"
          value={nuevaPersona.documento}
          onChange={(e) =>
            setNuevaPersona({ ...nuevaPersona, documento: e.target.value })
          }
        />
                  <input
          type="text"
          placeholder="Mail"
          value={nuevaPersona.mail}
          onChange={(e) =>
            setNuevaPersona({ ...nuevaPersona, mail: e.target.value })
          }
        />
                  <input
          type="text"
          placeholder="Password"
          value={nuevaPersona.password}
          onChange={(e) =>
            setNuevaPersona({ ...nuevaPersona, password: e.target.value })
          }
        />
        
        <button onClick={guardarNuevaPersona}>Agregar</button>
      </div>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Email</th>
            <th>Contraseña</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.documento}>
              <td>{persona.nombre}</td>
              <td>{persona.documento}</td>
              <td>{persona.mail}</td>
              <td>{persona.password}</td>
              <EliminarPersona
      documento={persona.documento}
      eliminarPersona={eliminarPersona}
    />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    
    
  );
}

export default ListaPersonas;
