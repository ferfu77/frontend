import React, { useState, useEffect } from 'react';
import './ListarUnidad.css'; // Importa tu archivo de estilos CSS

function ListarUnidad() {
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/unidades/listar')
      .then((response) => response.json())
      .then((data) => {
        setUnidades(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de unidades", error);
      });
  }, []);

  return (
    <div className="listar-unidad-container">
      <h2>Listado de Unidades</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Piso</th>
            <th>Número</th>
            <th>Habitado</th>
            <th>Nombre Edificio</th>
            <th>Dirección Edificio</th>
          </tr>
        </thead>
        <tbody>
          {unidades.map((unidad) => (
            <tr key={unidad.id}>
              <td>{unidad.id}</td>
              <td>{unidad.piso}</td>
              <td>{unidad.numero}</td>
              <td>{unidad.habitado ? 'Sí' : 'No'}</td>
              <td>{unidad.edificio.nombre}</td>
              <td>{unidad.edificio.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarUnidad;
