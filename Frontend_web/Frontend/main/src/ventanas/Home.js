// Seleccionar enlaces y secciones
const homeLink = document.querySelector("#home-link");
const comidasLink = document.querySelector("#comidas-link");
const contactLink = document.querySelector("#contact-link");
const configLink = document.querySelector("#config-link");

const homeSection = document.querySelector("#main-content");
const comidasSection = document.querySelector("#comidas-section");
const contactSection = document.querySelector("#contact-section");
const configSection = document.querySelector("#config-section");

// Función para mostrar solo la sección seleccionada
function showSection(section) {
  // Ocultar todas las secciones
  homeSection.classList.add("hidden");
  comidasSection.classList.add("hidden");
  contactSection.classList.add("hidden");
  configSection.classList.add("hidden");

  // Mostrar la sección seleccionada
  section.classList.remove("hidden");
}

// Agregar eventos de clic
homeLink.addEventListener("click", () => showSection(homeSection));
comidasLink.addEventListener("click", () => showSection(comidasSection));
contactLink.addEventListener("click", () => showSection(contactSection));
configLink.addEventListener("click", () => showSection(configSection));
