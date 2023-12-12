import React, { useState } from 'react';


import './Login.css';

function LoginForm({ onLogin ,message}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  

  return (
    <div>
      <input
        type="text"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={(e) => onLogin(email, password)}>Iniciar sesión</button>
      <p>{message}</p>
    </div>
  );
}

export default LoginForm;
