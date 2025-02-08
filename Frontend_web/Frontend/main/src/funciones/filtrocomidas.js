document.addEventListener("DOMContentLoaded", () => {
  mostrarComidas();
});

function mostrarComidas() {
  const listaComidas = document.getElementById("comidas-lista");
  listaComidas.innerHTML = "";

  const alergenosUsuario = JSON.parse(localStorage.getItem("alergenosSeleccionados")) || [];

  comidas.forEach((comida) => {
    const tieneAlergeno = comida.alergenos.some((alergeno) => alergenosUsuario.includes(alergeno));

    if (!tieneAlergeno) {
      const comidaDiv = document.createElement("div");
      comidaDiv.classList.add("comida-item");
      comidaDiv.innerHTML = `
          <div class="comida-content">
            <img src="${comida.imagen}" alt="${comida.nombre}" />
            <div class="comida-info">
              <h2>${comida.nombre}</h2>
              <p><strong>Ingredientes:</strong> ${comida.ingredientes}</p>
              <p><strong>Receta:</strong> ${comida.receta}</p>
              <p><strong>Alergenos:</strong> ${comida.alergenos.length > 0 ? comida.alergenos.join(", ") : "Ninguno"}</p>
            </div>
          </div>
        `;
      listaComidas.appendChild(comidaDiv);
    }
  });
}
function mostrarComidas(comidas) {
  const listaComidas = document.getElementById('comidas-lista');
  listaComidas.innerHTML = ''; // Limpiar la lista

  comidas.forEach((comida) => {
    const comidaDiv = document.createElement('div');
    comidaDiv.classList.add('comida-item');
    comidaDiv.innerHTML = `
        <img src="${comida.imagen}" alt="${comida.nombre}" />
        <h3>${comida.nombre}</h3>
      `;

    // Evento para abrir el modal
    comidaDiv.addEventListener('click', () => abrirModal(comida));
    listaComidas.appendChild(comidaDiv);
  });
}

// Barra de búsqueda dinámica
// Ocultar el modal al cargar la página
document.getElementById('modal-comida').classList.add('hidden');

// Evento para abrir el modal al hacer clic en una comida
document.querySelectorAll('.comida-card').forEach((card) => {
  card.addEventListener('click', () => {
    const comida = comidas.find(
      (item) => item.nombre === card.querySelector('h3').innerText
    );

    if (comida) {
      abrirModal(comida);
    }
  });
});

// Función para abrir el modal
function abrirModal(comida) {
  document.getElementById('modal-image').src = comida.imagen;
  document.getElementById('modal-title').innerText = comida.nombre;
  document.getElementById('modal-ingredientes').innerText = comida.ingredientes;
  document.getElementById('modal-receta').innerText = comida.receta;

  document.getElementById('modal-comida').classList.remove('hidden');
}

// Cerrar el modal al hacer clic en el botón de cierre
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('modal-comida').classList.add('hidden');
});

// Cerrar el modal al hacer clic fuera del contenido
document.getElementById('modal-comida').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-comida')) {
    document.getElementById('modal-comida').classList.add('hidden');
  }
});


// Botón de volver al menú principal
document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = './index.html';
});

// Mostrar las comidas al cargar la página
window.onload = () => mostrarComidas(comidas);
