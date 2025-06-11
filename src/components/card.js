export function createCard(image) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <img src="${image.urls.small}" alt="${image.alt_description || 'Imagen'}" />
    <div class="card-content">
      <h3>${image.alt_description || 'Sin descripción'}</h3>
      <p>📷 Autor: ${image.user.name}</p>
      <p>❤️ Likes: ${image.likes}</p>
      <a href="${image.links.download}" target="_blank">Descargar</a>
    </div>
  `;

  return card;
}
