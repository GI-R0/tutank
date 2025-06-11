import { isFavorite } from './storage.js';

export function renderImages(images, options = {}) {
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
      if (!img.urls || !img.urls.regular) {
        console.error(`Imagen ${index} no tiene URL válida:`, img);
        errorCount++;
        return;
      }

      // Verificar los datos del usuario
      console.log('Datos del usuario:', img.user);

      const isFav = isFavorite(img.id);
      const imageHTML = `
        <div class="gallery-item" data-id="${img.id}">
          <img 
            src="${img.urls.regular}" 
            alt="${img.alt_description || 'Imagen de Unsplash'}" 
            loading="lazy"
            onerror="this.onerror=null; this.src='https://via.placeholder.com/300x400?text=Error+loading+image';"
          >
          <div class="image-overlay">
            <button class="favorite-btn ${isFav ? 'active' : ''}" aria-label="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            <div class="image-info">
              <div class="author-info">
                <img 
                  src="${img.user.profile_image.small}" 
                  alt="${img.user.name}" 
                  class="author-avatar"
                  loading="lazy"
                  width="8"
                  height="8"
                  onerror="this.onerror=null; this.src='https://via.placeholder.com/8x8?text=U';"
                >
                <a href="${img.user.links.html}" target="_blank" rel="noopener noreferrer" class="author-name">
                  ${img.user.name}
                </a>
              </div>
              <div class="image-stats">
                <span>❤️ ${img.likes}</span>
                <span>👁️ ${img.views || 0}</span>
              </div>
            </div>
            <a href="${img.links.html}" target="_blank" rel="noopener noreferrer" class="view-btn">
              Ver en Unsplash
            </a>
          </div>
        </div>
      `;
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = imageHTML;
      fragment.appendChild(tempDiv.firstElementChild);
    } catch (error) {
      console.error(`Error al crear la tarjeta ${index}:`, error);
      errorCount++;
    }
  });

  if (errorCount > 0) {
    console.warn(`${errorCount} imágenes no pudieron ser mostradas`);
  }

  gallery.appendChild(fragment);

  // Agregar event listeners para los botones de favoritos
  gallery.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const imageId = btn.closest('.gallery-item').dataset.id;
      const image = images.find(img => img.id === imageId);
      
      if (image && options.onFavorite) {
        options.onFavorite(image);
        btn.classList.toggle('active');
        btn.setAttribute('aria-label', 
          btn.classList.contains('active') ? 'Quitar de favoritos' : 'Agregar a favoritos'
        );
      }
    });
  });
}
