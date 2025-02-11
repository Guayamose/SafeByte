const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
// Manejadores para cambiar entre Login y Sign Up
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Función para redirigir al "Home"
function redirectToHome() {
  window.location.href = "./home.html";// Asegúrate de que este archivo exista en la ruta correcta
}

// Eventos de redirección
document.querySelector(".sign-in-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Evita el comportamiento por defecto
  redirectToHome(); // Simula el inicio de sesión exitoso
});

document.querySelector(".sign-up-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Evita el comportamiento por defecto
  redirectToHome(); // Simula el registro exitoso
});

skip_login_btn.addEventListener("click", () => {
  redirectToHome(); // Salta directamente al home
});
//ESTO ES TEMPORAL SE NECESITA USAR EL FORMULARIOLOGIN.JS PARA QUE FUNCIONE BIEN ESTO ES PARA PRUEBAS