export function createHeader() {
  const header = document.getElementById('header');

  header.innerHTML = `
    <div class="logo" id="logo" role="button" tabindex="0" aria-label="Inicio Pinterest Clon">Pinterest Clon</div>
    <nav class="nav" aria-label="Menú de navegación principal">
      <ul class="nav-links" id="navLinks">
        <li><a href="#" tabindex="0">Inicio</a></li>
        <li><a href="#" tabindex="0">Perfil</a></li>
        <li><a href="#" tabindex="0">Favoritos</a></li>
      </ul>
      <div class="hamburger" id="hamburger" role="button" tabindex="0" aria-label="Mostrar menú">
        <span></span><span></span><span></span>
      </div>
      <div class="user-avatar" aria-label="Avatar del usuario">
        <img src="https://i.pravatar.cc/40?u=gerardo" alt="Avatar del usuario Gerardo Giménez" />
      </div>
    </nav>
  `;

  const logo = document.getElementById('logo');
  logo.addEventListener('click', () => {
    const first = localStorage.getItem("firstSearch");
    if (first) {
      import('../main.js').then(module => module.fetchImages(first));
    }
  });
  logo.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
      logo.click();
    }
  });

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  hamburger.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
      hamburger.click();
    }
  });
}
