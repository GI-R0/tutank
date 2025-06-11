import { createCard } from '../components/card.js';

export function renderImages(images) {
  const gallery = document.getElementById('gallery');
  if (!gallery) {
    console.error('No se encontró el elemento gallery');
    return;
  }
  
  gallery.innerHTML = '';

  if (!images || images.length === 0) {
    const noResults = document.createElement('p');
    noResults.textContent = 'No se encontraron imágenes. Intenta con otra búsqueda.';
    noResults.classList.add('no-results');
    gallery.appendChild(noResults);
    return;
  }

  const fragment = document.createDocumentFragment();
  let errorCount = 0;

  images.forEach((img, index) => {
    try {
      if (!img.url) {
        console.error(`Imagen ${index} no tiene URL válida:`, img);
        errorCount++;
        return;
      }

      const card = createCard(img);
      fragment.appendChild(card);
    } catch (error) {
      console.error(`Error al crear la tarjeta ${index}:`, error);
      errorCount++;
    }
  });

  if (errorCount > 0) {
    console.warn(`${errorCount} imágenes no pudieron ser mostradas`);
  }

  gallery.appendChild(fragment);
}
