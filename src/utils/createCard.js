export function createCard(img) {
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.src = img.url;
  image.alt = img.alt || 'Imagen de Unsplash';
  image.loading = 'lazy';
  image.onerror = () => {
    image.src = 'https://via.placeholder.com/250x150?text=Imagen+no+disponible';
  };

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  // Autor con ícono
  const authorLink = document.createElement('a');
  authorLink.href = img.authorUrl;
  authorLink.target = '_blank';
  authorLink.textContent = `📸 ${img.author}`;
  authorLink.classList.add('author-link');

  // Descripción si existe
  const description = document.createElement('p');
  description.textContent = img.description || img.alt || 'Sin descripción';
  description.classList.add('description');

  // Likes con ícono
  const likes = document.createElement('span');
  likes.textContent = `❤️ ${img.likes}`;
  likes.classList.add('likes');

  
  const tags = document.createElement('div');
  tags.classList.add('tags');
  const fakeTags = ['Naturaleza', 'Colorido', 'Alta Resolución'];
  fakeTags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.textContent = `#${tag}`;
    tags.appendChild(tagEl);
  });

  // Botón de guardar
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Guardar ❤️';
  saveBtn.classList.add('save-btn');
  saveBtn.onclick = () => {
    alert('Guardado en favoritos (simulado)');
  };

  // Montamos todo aqui
  cardContent.appendChild(authorLink);
  cardContent.appendChild(description);
  cardContent.appendChild(tags);
  cardContent.appendChild(likes);
  cardContent.appendChild(saveBtn);

  card.appendChild(image);
  card.appendChild(cardContent);

  return card;
}
