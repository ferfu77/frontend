

export const getUserByEmail = async (mail) => {
    try {
      const response = await fetch(`http://localhost:8080/api/persona/buscar-por-email?mail=${mail}`);
      if (response.ok) {
        const userData = await response.json();
        return userData; // Devuelve los datos del usuario
      } else {
        throw new Error('Error al obtener datos del usuario');
      }
    } catch (error) {
      throw new Error('Error de red al obtener datos del usuario');
    }
  };