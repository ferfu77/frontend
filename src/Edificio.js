import React, { useState, useEffect } from 'react';
import UnidadesPorEdificio from './UnidadesEdificio'; // Importa el componente UnidadesPorEdificio

function ListaEdificios() {
  const [codigoEdificio, setCodigoEdificio] = useState('');
  const [edificios, setEdificios] = useState([]);
  const [nuevoEdificio, setNuevoEdificio] = useState({
    nombre: '',
    direccion: ''
    // Agrega más propiedades según la estructura de tu edificio
  })

  const guardarEdificio = () => {
    fetch('http://localhost:8080/api/edificios/guardar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoEdificio),
    })
      .then((response) => response.json())
      .then((data) => {
        // Aquí puedes manejar la respuesta del servidor si es necesario
        console.log('Edificio guardado:', data);
        // Podrías actualizar la lista de edificios luego de guardar
        // O volver a cargar los edificios con la llamada a la API
      })
      .catch((error) => {
        console.error('Error al guardar el edificio:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoEdificio({ ...nuevoEdificio, [name]: value });
  };

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
      <div>
        <h3>Guardar Nuevo Edificio</h3>
        <input
          type="text"
          name="nombre"
          value={nuevoEdificio.nombre}
          onChange={handleInputChange}
          placeholder="Nombre del edificio"
        />
        <input
          type="text"
          name="direccion"
          value={nuevoEdificio.direccion}
          onChange={handleInputChange}
          placeholder="Dirección del edificio"
        />
        {/* Agrega más inputs según las propiedades del edificio */}
        <button onClick={guardarEdificio}>Guardar Edificio</button>
      </div>
    </div>
  );
}

export default ListaEdificios;
