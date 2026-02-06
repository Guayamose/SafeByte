document.addEventListener("DOMContentLoaded", () => {
    mostrarComidas();
    agregarEventosBusqueda();
    document.getElementById("modal-comida").classList.add("hidden"); // Asegúrate de ocultarlo al cargar
});

function mostrarComidas() {
    const listaComidas = document.getElementById("comidas-lista");
    listaComidas.innerHTML = "";

    const alergenosUsuario = JSON.parse(localStorage.getItem("alergenosSeleccionados")) || [];

    const comidasFiltradas = comidas.filter((comida) => {
        return !comida.alergenos.some((alergeno) => alergenosUsuario.includes(alergeno));
    });

    comidasFiltradas.forEach((comida) => {
        const comidaDiv = document.createElement("div");
        comidaDiv.classList.add("comida-item");
        comidaDiv.innerHTML = `
        <img src="${comida.imagen}" alt="${comida.nombre}" class="comida-img" />
        <h3>${comida.nombre}</h3>
      `;

        comidaDiv.addEventListener("click", () => abrirModal(comida));
        listaComidas.appendChild(comidaDiv);
    });
}

function abrirModal(comida) {
    document.getElementById("modal-img").src = comida.imagen;
    document.getElementById("modal-title").innerText = comida.nombre;
    document.getElementById("modal-ingredientes").innerText = `Ingredientes: ${comida.ingredientes}`;
    document.getElementById("modal-receta").innerText = `Receta: ${comida.receta}`;
    document.getElementById("modal-alergenos").innerText = `Alérgenos: ${comida.alergenos.length > 0 ? comida.alergenos.join(", ") : "Ninguno"}`;

    document.getElementById("modal-comida").classList.remove("hidden");
}

document.getElementById('modal-comida').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-comida')) {
        document.getElementById('modal-comida').classList.add('hidden');
    }
});

function agregarEventosBusqueda() {
    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const alergenosUsuario = JSON.parse(localStorage.getItem("alergenosSeleccionados")) || [];

        const comidasFiltradas = comidas.filter((comida) => {
            return (
                !comida.alergenos.some((alergeno) => alergenosUsuario.includes(alergeno)) &&
                comida.nombre.toLowerCase().includes(searchTerm)
            );
        });

        mostrarComidasFiltradas(comidasFiltradas);
    });
}

function mostrarComidasFiltradas(comidasFiltradas) {
    const listaComidas = document.getElementById("comidas-lista");
    listaComidas.innerHTML = "";

    comidasFiltradas.forEach((comida) => {
        const comidaDiv = document.createElement("div");
        comidaDiv.classList.add("comida-item");
        comidaDiv.innerHTML = `
        <img src="${comida.imagen}" alt="${comida.nombre}" class="comida-img" />
        <h3>${comida.nombre}</h3>
      `;

        comidaDiv.addEventListener("click", () => abrirModal(comida));
        listaComidas.appendChild(comidaDiv);
    });
}

