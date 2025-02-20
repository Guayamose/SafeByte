const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Manejador de login
document.querySelector("#login-form").addEventListener("submit", function(event) {
  event.preventDefault();  // Evita recargar la página
  const username = document.querySelector("#login-username").value;
  const password = document.querySelector("#login-password").value;

  fetch('/api/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert(`Welcome back, ${username}!`);
      window.location.href = "/comidas.html";  // Cambia según tu proyecto
    } else {
      alert('Invalid username or password.');
    }
  })
  .catch(error => console.error('Login error:', error));
});

// Manejador de registro
document.querySelector("#register-form").addEventListener("submit", function(event) {
  event.preventDefault();  // Evita recargar la página
  const username = document.querySelector("#register-username").value;
  const email = document.querySelector("#register-email").value;
  const password = document.querySelector("#register-password").value;

  fetch('/api/registro/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Registration successful. Please log in.');
      container.classList.remove("sign-up-mode");  // Cambia a la vista de login
    } else {
      alert('Registration failed. Please try again.');
    }
  })
  .catch(error => console.error('Registration error:', error));
});
