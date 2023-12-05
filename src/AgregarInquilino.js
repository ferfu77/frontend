import React, { useState } from 'react';
import './AgregarInquilino.css';

function AgregarInquilino() {
  const [id, setId] = useState('');
  const [piso, setPiso] = useState('');
  const [numero, setNumero] = useState('');
  const [documento, setDocumento] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAgregarInquilino = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    fetch(`http://localhost:8080/api/unidades/agregarInquilinoUnidad?id=${id}&piso=${piso}&numero=${numero}&documento=${documento}`)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Error al agregar inquilino a la unidad');
      })
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => {
        setError('No se pudo agregar al inquilino a la unidad');
      });
  };

  return (
    <div className="agregar-inquilino-container">
      <h2>Agregar Inquilino a la Unidad</h2>
      <form onSubmit={handleAgregarInquilino}>
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
        <button type="submit">Agregar Inquilino</button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AgregarInquilino;
