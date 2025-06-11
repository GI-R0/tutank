export function createCard(image) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <img src="${image.url}" alt="${image.alt || 'Imagen'}" loading="lazy" />
    <div class="card-content">
      <h3>${image.description || 'Sin descripción'}</h3>
      <p>📷 Autor: ${image.author}</p>
      <p>❤️ Likes: ${image.likes}</p>
      <a href="${image.authorUrl}" target="_blank" class="author-link">Ver perfil del autor</a>
    </div>
  `;

  return card;
}
