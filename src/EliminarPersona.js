import React from 'react';

function EliminarPersona({ documento, eliminarPersona }) {
  return (
    <td>
      <button onClick={() => eliminarPersona(documento)}>Eliminar</button>
    </td>
  );
}

export default EliminarPersona;
