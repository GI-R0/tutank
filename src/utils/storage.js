// Claves para el localStorage
const STORAGE_KEYS = {
  FIRST_SEARCH: 'firstSearch',
  RECENT_SEARCHES: 'recentSearches',
  FAVORITES: 'favorites'
};

// Funciones básicas de almacenamiento
export function saveFirstSearch(query) {
  if (!localStorage.getItem(STORAGE_KEYS.FIRST_SEARCH)) {
    localStorage.setItem(STORAGE_KEYS.FIRST_SEARCH, query);
  }
}

export function getFirstSearch() {
  return localStorage.getItem(STORAGE_KEYS.FIRST_SEARCH);
}

export function saveRecentSearch(query) {
  const searches = getRecentSearches();
  const newSearches = [query, ...searches.filter(s => s !== query)].slice(0, 5);
  localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(newSearches));
}

export function getRecentSearches() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES) || '[]');
}

export function saveFavorite(image) {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.id === image.id)) {
    favorites.push(image);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
}

export function removeFavorite(imageId) {
  const favorites = getFavorites().filter(fav => fav.id !== imageId);
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
}

export function isFavorite(imageId) {
  return getFavorites().some(fav => fav.id === imageId);
} 