const guardarReclamo = async (nuevoReclamo) => {
    try {
      const response = await fetch('http://localhost:8080/api/reclamo/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoReclamo),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('reclamo guardado:', data);
        return data; // Opcional: Puedes devolver los datos de la reclamo guardada si lo necesitas en el componente
      } else {
        throw new Error('Error al guardar el reclamo');
      }
    } catch (error) {
      console.error('Error al intentar guardar el reclamo:', error);
      throw error;
    }
  };
  
  export default guardarReclamo;
  