# Pinterest Clone

Un clon de Pinterest construido con JavaScript vanilla y la API de Unsplash.

## Características

- 🔍 Búsqueda de imágenes en tiempo real
- 🖼️ Visualización de imágenes en formato grid
- 👤 Información del fotógrafo
- ❤️ Contador de likes
- 📱 Diseño responsive
- 💾 Persistencia de la primera búsqueda

## Tecnologías Utilizadas

- JavaScript Vanilla
- Vite
- API de Unsplash
- CSS Grid y Flexbox

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/pinterest-clon.git
```

2. Instala las dependencias:
```bash
cd pinterest-clon
npm install
```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega tu API key de Unsplash:
   ```
   VITE_UNSPLASH_ACCESS_KEY=tu_api_key_aqui
   ```
   - Puedes obtener una API key en [Unsplash Developers](https://unsplash.com/developers)

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre http://localhost:3000 en tu navegador

## Uso

1. Escribe un término de búsqueda en el campo de búsqueda
2. Haz clic en el botón "Buscar"
3. Explora las imágenes y haz clic en el nombre del fotógrafo para ver su perfil
4. Haz clic en el logo para volver a tu primera búsqueda

