import { obtenerReclamosPorPersona } from './ReclamoPorPersona';

// Dentro de tu componente donde necesites obtener los reclamos por persona

// Supongamos que tienes acceso a userEmail desde el estado o como una variable disponible
const userEmail = 'dani'; // userEmail es el correo electrónico persistente del login

const obtenerReclamos = async () => {
  try {
    const reclamos = await obtenerReclamosPorPersona(userEmail);
    console.log('Reclamos por persona:', reclamos);
    // Haz algo con los reclamos obtenidos
  } catch (error) {
    console.error(error.message);
    // Manejo de errores
  }
};

// Llamas a esta función cuando sea necesario obtener los reclamos
obtenerReclamos();
