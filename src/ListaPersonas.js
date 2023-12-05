import React, { useState, useEffect } from 'react';
import './ListaPersonas.css'; // Importa tu archivo de estilos CSS
import BuscarPersona from './BuscarPersona';
import './BuscarPersona.css';
import guardarPersona from './guardarPersona';
import EliminarPersona from './EliminarPersona';

function ListaPersonas() {
  const [personaEncontrada, setPersonaEncontrada] = useState(null);
  const [personas, setPersonas] = useState([]);
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
  }, []);

  const eliminarPersona = async (mail) => {
    try {
      const response = await fetch(`http://localhost:8080/api/persona/eliminar/${mail}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.text();
        console.log('Persona eliminada:', data);
        // Realizar alguna acción adicional después de eliminar la persona, si es necesario
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
                  
                  mail={persona.mail}
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
