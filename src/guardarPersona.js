

const guardarPersona = async (nuevaPersona) => {
    try {
      const response = await fetch('http://localhost:8080/api/persona/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaPersona),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Persona guardada:', data);
        return data; // Opcional: Puedes devolver los datos de la persona guardada si lo necesitas en el componente
      } else {
        throw new Error('Error al guardar la persona');
      }
    } catch (error) {
      console.error('Error al intentar guardar la persona:', error);
      throw error;
    }
  };
  
  export default guardarPersona;
  