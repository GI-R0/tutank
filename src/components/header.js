export function createHeader(onLogoClick) {
  const header = document.getElementById('header');
  
  if (!header) {
    console.error('No se encontró el elemento header');
    return;
  }

  header.innerHTML = `<nav class="navbar">
  <div class="logo" id="logo" tabindex="0" role="button" aria-label="Inicio Pinterest Clon">
    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Pinterest Logo" class="logo-img" />
  </div>
  <ul class="nav-links" id="navLinks">
    <li><a href="#" tabindex="0">Inicio</a></li>
    <li><a href="#" tabindex="0">Perfil</a></li>
    <li><a href="#" tabindex="0">Favoritos</a></li>
  </ul>
  <div class="hamburger" id="hamburger" role="button" tabindex="0" aria-label="Mostrar menú">
    <span></span>
    <span></span>
    <span></span>
  </div>
</nav>`;

  const logo = document.getElementById('logo');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!logo || !hamburger || !navLinks) {
    console.error('No se encontraron elementos necesarios en el header');
    return;
  }

  // evento del logo
  logo.addEventListener('click', onLogoClick);
  logo.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onLogoClick();
    }
  });

  // eventos del menú hamburguesa
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('show'));
  });

  hamburger.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hamburger.click();
    }
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}
