import React, { useState } from 'react';
import './TransferirUnidad.css';

function TransferirUnidad() {
  const [id, setId] = useState('');
  const [piso, setPiso] = useState('');
  const [numero, setNumero] = useState('');
  const [documento, setDocumento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleTransferirUnidad = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/unidades/transferirUnidad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          piso: piso,
          numero: numero,
          documento: documento,
        }),
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
      console.error('Hubo un error al transferir la unidad:', error);
      setError('Hubo un error al transferir la unidad');
      setMensaje('');
    }
  };

  return (
    <div className="transferir-unidad-container">
      <h2>Transferir Unidad</h2>
      <form onSubmit={handleTransferirUnidad}>
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
        <button type="submit">Transferir Unidad</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default TransferirUnidad;
