import './style/style.css';
import { createHeader } from './components/header.js';
import { fetchImages } from './utils/fetchImages.js';
import { renderImages } from './utils/renderImages.js';
import { 
  saveFirstSearch, 
  getFirstSearch, 
  saveRecentSearch, 
  getRecentSearches,
  saveFavorite,
  removeFavorite,
  isFavorite
} from './utils/storage.js';

// Inicializar elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchForm = document.getElementById('searchForm');
const recentSearchesContainer = document.getElementById('recentSearches');

// Verificar que los elementos existan
if (!searchInput || !searchBtn || !searchForm) {
  console.error('No se encontraron elementos necesarios en el DOM');
}

// Función para mostrar búsquedas recientes
function showRecentSearches() {
  if (!recentSearchesContainer) return;
  
  const recentSearches = getRecentSearches();
  if (recentSearches.length === 0) {
    recentSearchesContainer.innerHTML = '<p>No hay búsquedas recientes</p>';
    return;
  }

  const searchesHTML = recentSearches
    .map(search => `
      <button class="recent-search-btn" data-search="${search}">
        ${search}
      </button>
    `)
    .join('');

  recentSearchesContainer.innerHTML = `
    <h3>Búsquedas recientes</h3>
    <div class="recent-searches-list">
      ${searchesHTML}
    </div>
  `;

  // Agregar event listeners a los botones de búsqueda reciente
  recentSearchesContainer.querySelectorAll('.recent-search-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const search = btn.dataset.search;
      searchInput.value = search;
      handleSearch(search);
    });
  });
}

createHeader(() => {
  const firstSearch = getFirstSearch();
  if (firstSearch) {
    searchInput.value = firstSearch;
    handleSearch(firstSearch);
  } else {
    showModal("No hay búsqueda guardada.");
  }
  showRecentSearches();
});

function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');
  const closeModal = document.getElementById('closeModal');

  if (!modal || !modalMessage || !closeModal) {
    console.error('No se encontraron elementos del modal');
    return;
  }

  modalMessage.textContent = message;
  modal.classList.remove('hidden');

  // Cerrar modal al hacer clic en el botón
  closeModal.onclick = () => {
    modal.classList.add('hidden');
  };

  // Cerrar modal al hacer clic fuera
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  };

  // Cerrar modal con la tecla Escape
  document.addEventListener('keydown', function closeOnEscape(e) {
    if (e.key === 'Escape') {
      modal.classList.add('hidden');
      document.removeEventListener('keydown', closeOnEscape);
    }
  });
}

function handleSearch(query) {
  if (!query) {
    showModal("Por favor, escribe una palabra para buscar.");
    return;
  }

  fetchImages(query)
    .then(images => {
      if (images.length === 0) {
        showModal("No se encontraron resultados para esa búsqueda.");
        return;
      }

      renderImages(images, {
        onFavorite: (image) => {
          if (isFavorite(image.id)) {
            removeFavorite(image.id);
          } else {
            saveFavorite(image);
          }
        }
      });

      saveFirstSearch(query);
      saveRecentSearch(query);
      showRecentSearches();
    })
    .catch(error => {
      console.error("Error al buscar imágenes:", error);
      showModal(error.message || "Ocurrió un error al buscar imágenes.");
    });
}

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  handleSearch(query);
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  handleSearch(query);
});
