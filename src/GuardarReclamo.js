import React, { useState } from 'react';
import './GenerarReclamo.css';

function GenerarReclamo() {
  const [codigo, setCodigo] = useState('');
  const [id, setId] = useState('');
  const [piso, setPiso] = useState('');
  const [numero, setNumero] = useState('');
  const [documento, setDocumento] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleGenerarReclamo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/reclamos/guardar?codigo=${codigo}&id=${id}&piso=${piso}&numero=${numero}&documento=${documento}&ubicacion=${ubicacion}&descripcion=${descripcion}`, {
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
      console.error('Hubo un error al generar el reclamo:', error);
      setError('Hubo un error al generar el reclamo');
      setMensaje('');
    }
  };

  return (
    <div className="generar-reclamo-container">
      <h2>Generar Reclamo</h2>
      <form onSubmit={handleGenerarReclamo}>
        <label>
          codigo:
          <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        </label>
        <label>
          idUnidad:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <label>
          piso:
          <input type="text" value={piso} onChange={(e) => setPiso(e.target.value)} />
        </label>
        <label>
          numero:
          <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
        </label>
        <label>
          documento:
          <input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} />
        </label>
        <label>
          ubicacion:
          <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
        </label>
        <label>
          descripcion:
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>
     
        <button type="submit">GenerarReclamo</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default GenerarReclamo;