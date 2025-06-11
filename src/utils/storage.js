// Claves para el localStorage
const STORAGE_KEYS = {
  FIRST_SEARCH: 'firstSearch',
  RECENT_SEARCHES: 'recentSearches',
  FAVORITES: 'favorites'
};

// Función para guardar la primera búsqueda
export function saveFirstSearch(query) {
  if (!localStorage.getItem(STORAGE_KEYS.FIRST_SEARCH)) {
    localStorage.setItem(STORAGE_KEYS.FIRST_SEARCH, query);
  }
}

// Función para obtener la primera búsqueda
export function getFirstSearch() {
  return localStorage.getItem(STORAGE_KEYS.FIRST_SEARCH);
}

// Función para guardar búsquedas recientes
export function saveRecentSearch(query) {
  const recentSearches = getRecentSearches();
  // Evitar duplicados y mantener solo las últimas 5 búsquedas
  const newSearches = [query, ...recentSearches.filter(search => search !== query)].slice(0, 5);
  localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(newSearches));
}

// Función para obtener búsquedas recientes
export function getRecentSearches() {
  const searches = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
  return searches ? JSON.parse(searches) : [];
}

// Función para guardar favoritos
export function saveFavorite(image) {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.id === image.id)) {
    favorites.push(image);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }
}

// Función para obtener favoritos
export function getFavorites() {
  const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  return favorites ? JSON.parse(favorites) : [];
}

// Función para eliminar un favorito
export function removeFavorite(imageId) {
  const favorites = getFavorites();
  const newFavorites = favorites.filter(fav => fav.id !== imageId);
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
}

// Función para verificar si una imagen es favorita
export function isFavorite(imageId) {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === imageId);
} 