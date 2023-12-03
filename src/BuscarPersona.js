import React, { useState } from 'react';
import './BuscarPersona.css'; // Importa tu archivo de estilos CSS

function BuscarPersona() {
  const [documento, setDocumento] = useState('');
  const [personaEncontrada, setPersonaEncontrada] = useState(null);

  const handleBuscarClick = (e) => {
    e.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    fetch(`http://localhost:8080/api/persona/buscar/${documento}`)
      .then((response) => response.json())
      .then((data) => {
        setPersonaEncontrada(data);
      })
      .catch((error) => {
        console.error("Error al buscar la persona", error);
        setPersonaEncontrada(null);
      });
  };

  return (
    <div className="buscar-persona-container">
      <h2>Buscar Persona por Documento</h2>
      <form onSubmit={handleBuscarClick}>
        <input
          type="text"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          placeholder="Ingrese el documento a buscar"
        />
        <button type="submit">Buscar</button>
      </form>

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
    </div>
  );
}

export default BuscarPersona;
