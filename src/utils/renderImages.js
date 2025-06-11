export function createCard(img) {
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.src = img.url;
  image.alt = img.alt;
  image.loading = 'lazy';
  
  image.onerror = () => {
    image.src = 'https://via.placeholder.com/250x150?text=Imagen+no+disponible';
  };

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  const authorLink = document.createElement('a');
  authorLink.href = img.authorUrl;
  authorLink.target = '_blank';
  authorLink.textContent = `📸 ${img.author}`;
  authorLink.classList.add('author-link');

  const likes = document.createElement('span');
  likes.textContent = `❤️ ${img.likes}`;
  likes.classList.add('likes');

  cardContent.appendChild(authorLink);
  cardContent.appendChild(likes);
  
  card.appendChild(image);
  card.appendChild(cardContent);

  return card;
}

export function renderImages(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  if (images.length === 0) {
    const noResults = document.createElement('p');
    noResults.textContent = 'No se encontraron imágenes. Intenta con otra búsqueda.';
    noResults.classList.add('no-results');
    gallery.appendChild(noResults);
    return;
  }

  images.forEach(img => {
    const card = createCard(img);
    gallery.appendChild(card);
  });
}
