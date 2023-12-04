import React, { useState } from 'react';


import './Login.css';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/persona/login?mail=${email}&password=${password}`);

      if (response.ok) {
        const data = await response.text();
        if (data === 'Bienvenido, eres un administrador.') {
          setMessage('¡Eres un administrador!');
          onLogin(email,password);
          
        } else {
          setMessage(data);
        }
      } else if (response.status === 401) {
        setMessage('Credenciales inválidas');
      } else if (response.status === 404) {
        setMessage('Usuario no encontrado');
      } else {
        setMessage('Error al iniciar sesión');
      }
    } catch (error) {
      setMessage('Error al iniciar sesión');
    }
  };

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
      <button onClick={handleLogin}>Iniciar sesión</button>
      <p>{message}</p>
    </div>
  );
}

export default LoginForm;
