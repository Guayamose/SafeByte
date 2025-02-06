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
  