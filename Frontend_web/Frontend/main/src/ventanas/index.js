import { rutas } from './rutas.js';

document.addEventListener('DOMContentLoaded', () => {
    cargarVista('auth');  // Carga inicial del formulario de Sign In / Sign Up
});

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Botón de cambiar a Sign Up
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

// Botón de cambiar a Sign In
sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Botón de omitir el inicio de sesión (modo desarrollo)
document.getElementById('skip-login').addEventListener('click', () => {
    alert('Omitiendo el inicio de sesión (modo desarrollo).');
    cargarVista('home');  // Cargar la vista de Home directamente
});

function cargarVista(vista) {
    const contenedor = document.getElementById('main-content');
    const rutaVista = rutas[vista];

    if (!rutaVista) {
        console.error(`No se encontró la vista: ${vista}`);
        return;
    }

    contenedor.innerHTML = '';  // Limpia el contenido actual

    import(rutaVista)
        .then(modulo => {
            modulo.default();  // Llama a la función de la vista correspondiente
        })
        .catch(error => {
            console.error(`Error al cargar la vista ${vista}:`, error);
        });
}

// Event listener para manejar el login
document.querySelector("#login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.querySelector("#login-username").value;
    const password = document.querySelector("#login-password").value;

    // Simulación de autenticación
    if (username === "test" && password === "1234") {
        alert(`Bienvenido, ${username}`);
        cargarVista('home');  // Cargar la vista de Home tras iniciar sesión
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});
