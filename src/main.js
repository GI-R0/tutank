import './style/style.css';
import { createHeader } from './components/header.js';
import { fetchImages } from './utils/fetchImages.js';
import { renderImages } from './utils/renderImages.js';

// Inicializar elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchForm = document.getElementById('searchForm');

// Verificar que los elementos existan
if (!searchInput || !searchBtn || !searchForm) {
  console.error('No se encontraron elementos necesarios en el DOM');
}

createHeader(() => {
  const firstSearch = localStorage.getItem("firstSearch");
  if (firstSearch) {
    searchInput.value = firstSearch;
    handleSearch(firstSearch);
  } else {
    showModal("No hay búsqueda guardada.");
  }
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

  closeModal.onclick = () => {
    modal.classList.add('hidden');
  };
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

      renderImages(images);

      if (!localStorage.getItem("firstSearch")) {
        localStorage.setItem("firstSearch", query);
      }
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
