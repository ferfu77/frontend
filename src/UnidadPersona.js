import React, { useState, useEffect } from 'react';

function TuComponente() {
  const [unidad, setUnidad] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  async function obtenerUnidadPorDuenio(email) {
    try {
      const response = await fetch(`http://localhost:8080/api/unidades/porDuenio?mail=${email}`);
      if (response.ok) {
        const unidad = await response.json();
        return unidad;
      } else {
        throw new Error('No se encontró unidad como dueño');
      }
    } catch (error) {
      console.error('Error al obtener unidad como dueño:', error.message);
      return null;
    }
  }
  
  async function obtenerUnidadesPorInquilino(email) {
    try {
      const response = await fetch(`http://localhost:8080/api/unidades/porInquilino?mail=${email}`);
      if (response.ok) {
        const unidades = await response.json();
        return unidades;
      } else {
        throw new Error('No se encontraron unidades como inquilino');
      }
    } catch (error) {
      console.error('Error al obtener unidades como inquilino:', error.message);
      return null;
    }
  }
  
  async function obtenerUnidadPorPersona(email) {
    let unidad = await obtenerUnidadPorDuenio(email);
  
    // Si no se encontró unidad como dueño, intenta obtenerla como inquilino
    if (!unidad) {
      unidad = await obtenerUnidadPorInquilino(email);
    }
  
    return unidad;
  }


  async function obtenerUnidadPorPersona(email) {
    try {
      const unidadesPorInquilino = await obtenerUnidadesPorInquilino(email);
      const unidadesPorDuenio = await obtenerUnidadesPorDuenio(email);
  
      const unidadesDelUsuario = unidadesPorInquilino || unidadesPorDuenio || [];
  
      // Encuentra la unidad específica del usuario actual
      const unidadUsuario = unidadesDelUsuario.find((unidad) => {
        // Lógica para identificar la unidad del usuario actual (puede ser por ID u otros criterios)
        // Ejemplo:
        return unidad.propietario === email || unidad.inquilino === email;
      });
  
      return unidadUsuario;
    } catch (error) {
      console.error('Error al obtener unidad:', error.message);
      return null;
    }
  }
}
export default TuComponente;
