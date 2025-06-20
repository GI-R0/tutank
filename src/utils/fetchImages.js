export async function fetchImages(query, page = 1) {
  if (!query || typeof query !== 'string') {
    throw new Error('La consulta de búsqueda es requerida y debe ser una cadena de texto.');
  }

  if (page < 1) {
    page = 1;
  }

  try {
    const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    
    if (!apiKey) {
      throw new Error('No se encontró la clave API de Unsplash. Por favor, configura la variable de entorno VITE_UNSPLASH_ACCESS_KEY.');
    }

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&page=${page}&client_id=${apiKey}`;
    
    const res = await fetch(url);
    
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Error de autenticación. Verifica tu API key de Unsplash.');
      } else if (res.status === 403) {
        throw new Error('Límite de solicitudes excedido. Intenta más tarde.');
      } else {
        throw new Error(`Error de la API: ${res.status}`);
      }
    }
    
    const data = await res.json();
    
    if (!data.results || data.results.length === 0) {
      return [];
    }

    // Devolver los datos exactamente como vienen de la API
    return data.results;
  } catch (error) {
    console.error('Error al buscar imágenes:', error);
    throw new Error(error.message || 'No se pudieron cargar las imágenes. Por favor, intenta de nuevo.');
  }
}
