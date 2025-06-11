export function createCard(img) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const image = document.createElement('img');
    image.src = img.urls.small;
    image.alt = img.alt_description || 'Imagen de Pinterest Clon';
    image.loading = 'lazy';
  
    image.onerror = () => {
      image.src = 'https://via.placeholder.com/250x150?text=Imagen+no+disponible';
    };
  
    card.appendChild(image);
  
    if (img.alt_description) {
      const cardContent = document.createElement('div');
      cardContent.classList.add('card-content');
      const title = document.createElement('h3');
      title.textContent = img.alt_description;
      cardContent.appendChild(title);
      card.appendChild(cardContent);
    }
  
    return card;
  }
  