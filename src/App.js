import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListaPersonas from './ListaPersonas'; // Asegúrate de que la ruta sea correcta
import BuscarPersona from './BuscarPersona';


function App() {
  return (
    <div className="App">
        <BuscarPersona/>
        <ListaPersonas /> {/* Utiliza el componente ListaPersonas aquí */}
        

    </div>
  );
}

export default App;
