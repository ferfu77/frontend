import React, { useState } from 'react';
import './AgregarDuenio.css';


function AgregarDuenio() {
  const [id, setId] = useState('');
  const [piso, setPiso] = useState('');
  const [numero, setNumero] = useState('');
  const [documento, setDocumento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleAgregarDuenio = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/unidades/agregarDuenioUnidad?id=${id}&piso=${piso}&numero=${numero}&documento=${documento}`, {
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
      console.error('Hubo un error al agregar el dueño:', error);
      setError('Hubo un error al agregar el dueño');
      setMensaje('');
    }
  };

  return (
    <div className="agregar-duenio-container">
      <h2>Agregar Dueño a Unidad</h2>
      <form onSubmit={handleAgregarDuenio}>
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

export default AgregarDuenio;
