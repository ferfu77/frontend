import React, { useState, useEffect } from 'react';
import UnidadesPorEdificio from './UnidadesEdificio'; // Importa el componente UnidadesPorEdificio

function ListaEdificios() {
  const [codigoEdificio, setCodigoEdificio] = useState('');
  const [edificios, setEdificios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/edificios/listar')
      .then((response) => response.json())
      .then((data) => {
        setEdificios(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de los edificios", error);
      });
  }, []);

  return (
    <div className="lista-edificios-container">
      <h2>Lista de Edificios</h2>
      <div>
        <UnidadesPorEdificio codigoEdificio={codigoEdificio} /> {/* Mostrar unidades por código de edificio */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            {/* Agrega más encabezados según la información de tus edificios */}
          </tr>
        </thead>
        <tbody>
          {edificios.map((edificio) => (
            <tr key={edificio.id}>
              <td>{edificio.nombre}</td>
              <td>{edificio.direccion}</td>
              {/* Agrega más celdas según la información de tus edificios */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaEdificios;
