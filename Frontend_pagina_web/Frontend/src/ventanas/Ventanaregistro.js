export default function mostrarRegistro() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Registro de Usuario</h2>
        <form id="form-registro">
            <label for="username">Usuario:</label>
            <input type="text" id="username" name="username" required><br>

            <label for="email">Correo electrónico:</label>
            <input type="email" id="email" name="email" required><br>

            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required><br>

            <button type="submit">Registrarse</button>
        </form>
    `;

    document.getElementById('form-registro').addEventListener('submit', manejarRegistro);
}

function manejarRegistro(event) {
    event.preventDefault();

    const datos = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    fetch('/api/registro/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al registrar el usuario');
        }
        return response.json();
    })
    .then(data => {
        alert('Registro exitoso');
        cargarVista('login'); // Redirige al login
    })
    .catch(error => console.error('Error:', error));
}
