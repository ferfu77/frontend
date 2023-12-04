import React from 'react';

const EliminarPersona = ({ documento, mail, eliminarPersona }) => {
  const handleEliminarClick = () => {
    eliminarPersona(mail);
  };

  return (
    <div className="eliminar-persona-container">
      <h3>Eliminar Persona</h3>
      <p><strong>Documento:</strong> {documento}</p>
      <p><strong>Email:</strong> {mail}</p>
      <button onClick={handleEliminarClick}>Eliminar</button>
    </div>
  );
};

export default EliminarPersona;
