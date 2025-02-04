export default function mostrarLogin() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <form id="form-login">
            <label for="username">Usuario:</label>
            <input type="text" id="username" name="username" required><br>

            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required><br>

            <button type="submit">Iniciar Sesión</button>
        </form>
    `;

    // Agrega el manejador de eventos
    document.getElementById('form-login').addEventListener('submit', manejarLogin);
}

function manejarLogin(event) {
    event.preventDefault();

    const datos = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en el inicio de sesión');
        }
        return response.json();
    })
    .then(data => {
        alert('Inicio de sesión exitoso');
        cargarVista('comidas'); // Redirige a la vista de comidas seguras
    })
    .catch(error => console.error('Error:', error));
}
