import React, { useState, useEffect } from 'react';
import UnidadesPorEdificio from './UnidadesEdificio';
import './BuscarUnidades.css';

function BuscarUnidades() {
  const [unidades, setUnidades] = useState([]);
  const [codigoEdificio, setCodigoEdificio] = useState('');
  const [error, setError] = useState(null);
  const [nuevaUnidad, setNuevaUnidad] = useState({
    piso: '',
    numero: '',
    habitado: false,
    codigoedificio: '',
    
    // Agrega más propiedades según la estructura de tu unidad
  });
  const [codigoUnidad, setCodigoUnidad] = useState('');

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

  const handleCrearUnidad = () => {
    fetch(`http://localhost:8080/api/unidades/crear?piso=${nuevaUnidad.piso}&numero=${nuevaUnidad.numero}&habitado=${nuevaUnidad.habitado}&codigoedificio=${nuevaUnidad.codigoedificio}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta si es necesario
        console.log('Unidad creada:', data);
        // Actualizar la lista de unidades o recargar las unidades
      })
      .catch((error) => {
        console.error('Error al crear la unidad:', error);
      });
  };

  const handleEliminarUnidad = (codigo) => {
    fetch(`http://localhost:8080/api/unidades/eliminar/${codigo}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Unidad eliminada:', data);
        // Actualizar la lista de unidades o recargar las unidades después de eliminar
      })
      .catch((error) => {
        console.error('Error al eliminar la unidad:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaUnidad({ ...nuevaUnidad, [name]: value });
  };

  return (
    <div className="buscar-unidades-container">
      
      <div>

        <UnidadesPorEdificio codigoEdificio={codigoEdificio} />
      </div>
      <div>
        <h3>Crear Nueva Unidad</h3>
        <input
          type="text"
          name="piso"
          value={nuevaUnidad.piso}
          onChange={handleInputChange}
          placeholder="Piso"
        />
        <input
          type="text"
          name="numero"
          value={nuevaUnidad.numero}
          onChange={handleInputChange}
          placeholder="Número"
        />

        <input
          type="text"
          name="codigoedificio"
          value={nuevaUnidad.codigoedificio}
          onChange={handleInputChange}
          placeholder="Código del edificio"
        />

        <button onClick={handleCrearUnidad}>Crear Unidad</button>
      </div>
      <h3>Eliminar Unidad</h3>
        <input
          type="text"
          placeholder="Código de la unidad a eliminar"
          onChange={(e) => {
            const codigo = e.target.value;
            setCodigoUnidad(codigo);
          }}
        />
        <button onClick={() => handleEliminarUnidad(codigoUnidad)}>Eliminar Unidad</button>
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
