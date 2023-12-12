import React, { useState } from 'react';
import './AgregarImagen.js';


function AgregarImagen() {
  const [idReclamo, setIdReclamo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tipo, setTipo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleAgregarImagen = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/reclamos/${idReclamo}/agregar-imagen?direccion=${direccion}&tipo=${tipo}`, {
        method: 'POST'
      });

      if (response.ok) {
        const data = await response.text();
        setMensaje(data);
        setError('');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        setMensaje('');
      }
    } catch (error) {
      console.error('Hubo un error al agregar la imagen:', error);
      setError('Hubo un error al agregar la imagen');
      setMensaje('');
    }
  };

  return (
    <div className="agregar-imagen-container">
      <h2>Agregar Imagen a Reclamo</h2>
      <form onSubmit={handleAgregarImagen}>
        <label>
          IdReclamo:
          <input type="text" value={idReclamo} onChange={(e) => setIdReclamo(e.target.value)} />
        </label>
        <label>
          direccion:
          <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        </label>
        <label>
          tipo:
          <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} />
        </label>
        <button type="submit">Agregar imagen</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default AgregarImagen;