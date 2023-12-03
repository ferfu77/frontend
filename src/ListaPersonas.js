import React, { useState, useEffect } from 'react';
import './ListaPersonas.css'; // Importa tu archivo de estilos CSS

function ListaPersonas() {
  const [personas, setPersonas] = useState([]);

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

  return (
    <div className="lista-personas-container">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaPersonas;
