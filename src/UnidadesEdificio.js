import React, { useState, useEffect } from 'react';
import './UnidadesEdificio.css';

function UnidadesPorEdificio() {
  const [codigoEdificio, setCodigoEdificio] = useState('');
  const [unidades, setUnidades] = useState([]);
  const [mostrarUnidades, setMostrarUnidades] = useState(false);

  const obtenerUnidades = () => {
    if (codigoEdificio.trim() !== '') {
      fetch(`http://localhost:8080/api/edificios/listar/${codigoEdificio}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Error al obtener las unidades');
        })
        .then((data) => {
          setUnidades(data);
          setMostrarUnidades(true); // Mostrar las unidades al obtenerlas
        })
        .catch((error) => {
          console.error("Error al obtener las unidades del edificio", error);
        });
    }
  };

  const toggleMostrarUnidades = () => {
    setMostrarUnidades(!mostrarUnidades);
  };

  return (
    <div className="unidades-por-edificio-container">
      <h2>Unidades del Edificio</h2>
      <input
        type="text"
        placeholder="Código de Edificio"
        value={codigoEdificio}
        onChange={(e) => setCodigoEdificio(e.target.value)}
      />
      <button onClick={obtenerUnidades}>Mostrar Unidades</button>

      {mostrarUnidades && unidades.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Piso</th>
              <th>Número</th>
              <th>Habitado</th>
              {/* Agrega más encabezados según la información de las unidades */}
            </tr>
          </thead>
          <tbody>
            {unidades.map((unidad) => (
              <tr key={unidad.id}>
                <td>{unidad.piso}</td>
                <td>{unidad.numero}</td>
                <td>{unidad.habitado ? 'Sí' : 'No'}</td>
                {/* Agrega más celdas según la información de las unidades */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UnidadesPorEdificio;
