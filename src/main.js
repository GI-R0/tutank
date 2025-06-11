import './style/style.css';
import { createHeader } from './components/header.js';
import { fetchImages } from './utils/fetchImages.js';
import { renderImages } from './utils/renderImages.js';



createHeader();

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const logo = document.getElementById('logo');

function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');
  const closeModal = document.getElementById('closeModal');

  modalMessage.textContent = message;
  modal.classList.remove('hidden');

  closeModal.onclick = () => {
    modal.classList.add('hidden');
  };
}

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();

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
      showModal("Ocurrió un error al buscar imágenes.");
    });
});

logo.addEventListener('click', () => {
  const firstSearch = localStorage.getItem("firstSearch");
  if (firstSearch) {
    searchInput.value = firstSearch;
    fetchImages(firstSearch).then(images => renderImages(images));
  } else {
    showModal("No hay búsqueda guardada.");
  }
});
