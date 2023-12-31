import React, { useState } from 'react';
import './SacarDuenio.css';

function SacarDuenio() {
  const [idUnidad, setIdUnidad] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSacarInquilino = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/unidades/${idUnidad}/sacarduenio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      console.error('Hubo un error al sacar al duenio:', error);
      setError('Hubo un error al sacar al duenio');
      setMensaje('');
    }
  };

  return (
    <div className="sacar-duenio-container">
      <h2>Sacar Duenio de Unidad</h2>
      <form onSubmit={handleSacarInquilino}>
        <label>
          ID de la Unidad:
          <input type="text" value={idUnidad} onChange={(e) => setIdUnidad(e.target.value)} />
        </label>
        <button type="submit">Sacar Duenio</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default SacarDuenio ;
