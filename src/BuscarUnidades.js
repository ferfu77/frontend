import React, { useState, useEffect } from 'react';
import UnidadesPorEdificio from './UnidadesEdificio';
import './BuscarUnidades.css';

function BuscarUnidades() {
  const [unidades, setUnidades] = useState([]);
  const [codigoEdificio, setCodigoEdificio] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/unidades/listar')
      .then((response) => response.json())
      .then((data) => {
        setUnidades(data);
      })
      .catch((error) => {
        console.error("Error al obtener las unidades", error);
        setError('Error al obtener las unidades. Inténtalo de nuevo.');
      });
  }, []);

  const handleBuscarUnidadPorEdificio = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/unidades/por-edificio/${codigoEdificio}`)
      .then((response) => response.json())
      .then((data) => {
        setUnidades(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error al buscar unidades por edificio", error);
        setUnidades([]);
        setError('Error al buscar unidades por edificio. Inténtalo de nuevo.');
      });
  };

  return (
    <div className="buscar-unidades-container">
      <h2>Buscar Unidades</h2>
      <div>
        <form onSubmit={handleBuscarUnidadPorEdificio}>
          <input
            type="text"
            value={codigoEdificio}
            onChange={(e) => setCodigoEdificio(e.target.value)}
            placeholder="Ingrese el código del edificio"
          />
          <button type="submit">Buscar</button>
        </form>
        <UnidadesPorEdificio codigoEdificio={codigoEdificio} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Piso</th>
            <th>Numero</th>
            <th>Habitado</th>
            <th>Edificio</th>
            <th>Direccion</th>
            <th>Duenio</th>
            <th>Inquilino</th>
            
            {/* Agrega más encabezados según la información de tus unidades */}
          </tr>
        </thead>
        <tbody>
          {unidades.map((unidad) => (
            <tr key={unidad.id}>
              <td>{unidad.id}</td>
              <td>{unidad.piso}</td>
              <td>{unidad.numero}</td>
              <td>{unidad.habitado ? 'Sí' : 'No'}</td>
              <td>{unidad.edificio ? unidad.edificio.nombre : '-'}</td>
              <td>{unidad.edificio ? unidad.edificio.direccion : '-'}</td>
              
              <td>
              {unidad.duenios.length > 0 ? (
                  unidad.duenios.map((duenio, index) => (
                    <span key={index}>
                      {duenio.nombre}({duenio.documento})
                      {index !== unidad.duenios.length - 1 && ', '}
                    </span>
                    // Puedes mostrar más detalles del duenio aquí
                  ))
                ) : (
                  '-'
                )}
              </td>
              <td>
              {unidad.inquilinos.length > 0 ? (
                  unidad.inquilinos.map((inquilino, index) => (
                    <span key={index}>
                      {inquilino.nombre}({inquilino.documento})
                      {index !== unidad.inquilinos.length - 1 && ', '}
                    </span>
                    // Puedes mostrar más detalles del inquilino aquí
                  ))
                ) : (
                  '-'
                )}
              </td>
              {/* Agrega más celdas según la información de tus unidades */}
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default BuscarUnidades;
