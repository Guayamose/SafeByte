
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('section');

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const sectionId = button.getAttribute('data-section');

    // Oculta todas las secciones
    sections.forEach((section) => section.classList.add('hidden'));

    // Muestra la sección seleccionada
    document.getElementById(sectionId).classList.remove('hidden');
  });
});