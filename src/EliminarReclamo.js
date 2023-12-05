import React from 'react';

const EliminarReclamo = ({ idReclamo, eliminarReclamo }) => {
  const handleEliminarClick = () => {
    eliminarReclamo(idReclamo);
  };

  return (
    <div className="eliminar-reclamo-container">
      <h3>Eliminar Reclamo</h3>
      <p><strong>idReclamo:</strong> {idReclamo}</p>
      <button onClick={handleEliminarClick}>Eliminar</button>
    </div>
  );
};

export default EliminarReclamo;
