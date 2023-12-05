import React, { useState } from 'react';
import './BuscarReclamo.css'; // Importa tu archivo de estilos CSS

function BuscarReclamo() {
  const [idReclamo, setidReclamo] = useState('');
  const [ReclamoEncontrado, setReclamoEncontrado] = useState(null);

  const handleBuscarClick = (e) => {
    e.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    fetch(`localhost:8080/api/reclamos/buscar/${idReclamo}`)
      .then((response) => response.json())
      .then((data) => {
        setReclamoEncontrado(data);
      })
      .catch((error) => {
        console.error("Error al buscar la Reclamo", error);
        setReclamoEncontrado(null);
      });
  };

  return (
    <div className="buscar-Reclamo-container">
      <h2>Buscar Reclamo por idReclamo</h2>
      <form onSubmit={handleBuscarClick}>
        <input
          type="text"
          value={idReclamo}
          onChange={(e) => setidReclamo(e.target.value)}
          placeholder="Ingrese el idReclamo a buscar"
        />
        <button type="submit">Buscar</button>
      </form>

      {ReclamoEncontrado && (
        <div>
          <h3>Información del Reclamo Encontrado</h3>
          <p><strong>ubicacion:</strong> {ReclamoEncontrado.ubicacion}</p>
          <p><strong>descripcion:</strong> {ReclamoEncontrado.descripcion}</p>
          <p><strong>estado:</strong> {ReclamoEncontrado.estado}</p>
          <p><strong>idReclamo:</strong> {ReclamoEncontrado.idReclamo}</p>
          {/* Agregar más detalles según la estructura de datos */}
        </div>
      )}
    </div>
  );
}

export default BuscarReclamo;
