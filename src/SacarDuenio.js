import React, { useState } from 'react';
import './AgregarDuenio.css';


function SacarDuenio() {
  const [id, setId] = useState('');
  const [documento, setDocumento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSacarDuenio = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/unidades/${id}/sacarduenio?&documento=${documento}`, {
        method: 'DELETE'
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
      console.error('Hubo un error al agregar el dueño:', error);
      setError('Hubo un error al agregar el dueño');
      setMensaje('');
    }
  };

  return (
    <div className="sacar-duenio-container">
      <h2>Sacar Dueño a Unidad</h2>
      <form onSubmit={handleSacarDuenio}>
        <label>
          ID:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <label>
          Piso:
          <input type="text" value={piso} onChange={(e) => setPiso(e.target.value)} />
        </label>
        <label>
          Número:
          <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
        </label>
        <label>
          Documento:
          <input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} />
        </label>
        <button type="submit">Agregar Dueño</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default SacarDuenio;
