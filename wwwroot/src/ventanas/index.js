console.log('✅ index.js cargado');

window.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM listo');
  const sign_in_btn    = document.querySelector("#sign-in-btn");
  const sign_up_btn    = document.querySelector("#sign-up-btn");
  const container      = document.querySelector(".container");
  const skip_login_btn = document.querySelector("#skip-login");

  // Cambiar entre Login y Sign Up
  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });
  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });

  // Redirigir al Home
  function redirectToHome() {
    window.location.href = "/Home/Home";
  }

  // Registro
  function registerUser(username, email, password) {
    fetch('/api/Auth/Register', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    .then(res => res.text())
    .then(msg => {
      console.log('Registro:', msg);
      redirectToHome();
    })
    .catch(err => console.error('Error en registro:', err));
  }

  // Login (incluimos username para satisfacer la validación del modelo)
  function loginUser(email, password) {
    console.log('Intentando login con', { email, password });
    fetch('/api/Auth/Login', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      // Enviamos también "username" igual al email
      body: JSON.stringify({ username: email, email, password })
    })
    .then(res => {
      console.log('Fetch respondido status:', res.status);
      if (!res.ok) {
        return res.text().then(t => { throw new Error(t); });
      }
      return res.json();
    })
    .then(data => {
      console.log('Login exitoso:', data);
      redirectToHome();
    })
    .catch(err => {
      console.error('Error en login:', err);
      document.getElementById('login-error').textContent = err.message;
    });
  }

  // Form Login
  document.querySelector(".sign-in-form").addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById('login-error').textContent = '';
    const email    = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    loginUser(email, password);
  });

  // Form Signup
  document.querySelector(".sign-up-form").addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById('signup-error').textContent = '';
    const username = document.getElementById('signup-username').value;
    const email    = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    registerUser(username, email, password);
  });

  skip_login_btn.addEventListener("click", redirectToHome);
});
