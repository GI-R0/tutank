# Pinterest Clone

Un clon de Pinterest construido con JavaScript vanilla y la API de Unsplash.

## Características

- 🔍 Búsqueda de imágenes
- 🖼️ Galería de imágenes estilo Pinterest
- 📱 Diseño responsive
- ♿ Accesibilidad mejorada
- 💾 Guardado de búsquedas recientes

## Tecnologías utilizadas

- JavaScript Vanilla
- CSS3
- HTML5
- API de Unsplash
- Vite como bundler

## 🔍 Funcionalidades

- Buscar imágenes usando palabras clave.
- Visualización en estilo tipo Pinterest (masonry).
- Evita duplicados al guardar.
- Modal de confirmación al guardar.
- Responsive design completo.
- Modo oscuro adaptativo (`prefers-color-scheme`).
- Navegación con menú hamburguesa.

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/pinterest-clone.git
cd pinterest-clone
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y agrega tu API key de Unsplash:
```
VITE_UNSPLASH_ACCESS_KEY=tu_api_key_aqui
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Uso

1. Abre tu navegador y ve a `http://localhost:3000`
2. Escribe una palabra en la barra de búsqueda
3. Presiona Enter o haz clic en el botón "Buscar"
4. Explora las imágenes en la galería

