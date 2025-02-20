// Selección de elementos para el cambio de modo
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const skip_login_btn = document.querySelector("#skip-login");

// Eventos para cambiar entre Login y Sign Up
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Función para redirigir al "Home"
function redirectToHome() {
  window.location.href = "./home.html"; // Asegúrate de que este archivo exista en wwwroot
}

// Función para registrar un usuario usando el endpoint /api/Auth/Register
function registerUser(username, email, password) {
  fetch('/api/Auth/Register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
    .then(res => res.text())
    .then(data => {
      console.log('Registro:', data);
      // Si el registro es exitoso, redirige al Home
      redirectToHome();
    })
    .catch(err => console.error('Error en registro:', err));
}

// Función para hacer login usando el endpoint /api/Auth/Login
function loginUser(email, password) {
  fetch('/api/Auth/Login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.text().then(text => { throw new Error(text) });
      }
    })
    .then(data => {
      console.log('Login exitoso:', data);
      // Si el login es correcto, redirige al Home
      redirectToHome();
    })
    .catch(err => console.error('Error en login:', err));
}

// Manejadores de envío de formularios

// Para el formulario de Login
document.querySelector(".sign-in-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Evita el comportamiento por defecto
  // Nota: si tu input de login para email tiene placeholder "Username", asegúrate de que ese sea el dato correcto
  const email = e.target.querySelector('input[placeholder="Username"]').value;
  const password = e.target.querySelector('input[placeholder="Password"]').value;
  loginUser(email, password);
});

// Para el formulario de Sign Up
document.querySelector(".sign-up-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Evita el comportamiento por defecto
  const username = e.target.querySelector('input[placeholder="Username"]').value;
  const email = e.target.querySelector('input[placeholder="Email"]').value;
  const password = e.target.querySelector('input[placeholder="Password"]').value;
  registerUser(username, email, password);
});

// Botón para saltar el login y redirigir directamente al Home
skip_login_btn.addEventListener("click", () => {
  redirectToHome();
});
