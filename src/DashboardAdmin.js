import React from 'react';

const DashboardAdmin = ({ user, handleLogout }) => {
  return (
    <div>
      <h1>¡Bienvenido, {user.nombre}!</h1>
      <p>¡Eres un administrador!</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default DashboardAdmin;
