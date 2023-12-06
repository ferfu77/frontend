import React, { useState } from 'react';
import './SacarInquilino.css';

function SacarInquilino() {
  const [idUnidad, setIdUnidad] = useState('');
  const [documento, setDocumento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSacarInquilino = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/unidades/${idUnidad}/sacarinquilino`, {
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
      console.error('Hubo un error al sacar al inquilino:', error);
      setError('Hubo un error al sacar al inquilino');
      setMensaje('');
    }
  };

  return (
    <div className="sacar-inquilino-container">
      <h2>Sacar Inquilino de Unidad</h2>
      <form onSubmit={handleSacarInquilino}>
        <label>
          ID de la Unidad:
          <input type="text" value={idUnidad} onChange={(e) => setIdUnidad(e.target.value)} />
        </label>
        <button type="submit">Sacar Inquilino</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default SacarInquilino;
