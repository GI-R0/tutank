export async function fetchImages(query, page = 1) {
  try {
    const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    
    if (!apiKey) {
      throw new Error('No se encontró la clave API de Unsplash. Por favor, configura la variable de entorno VITE_UNSPLASH_ACCESS_KEY.');
    }

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&page=${page}&client_id=${apiKey}`;
    
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Error de la API: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (!data.results || data.results.length === 0) {
      return [];
    }

    return data.results.map(image => ({
      id: image.id,
      url: image.urls.regular,
      thumb: image.urls.thumb,
      alt: image.alt_description || 'Imagen sin descripción',
      author: image.user.name,
      authorUrl: image.user.links.html,
      likes: image.likes
    }));
  } catch (error) {
    console.error('Error al buscar imágenes:', error);
    throw new Error('No se pudieron cargar las imágenes. Por favor, intenta de nuevo.');
  }
}
