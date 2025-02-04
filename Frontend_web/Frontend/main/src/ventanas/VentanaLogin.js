export default function mostrarLogin() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <form id="form-login">
            <label for="username">Usuario:</label>
            <input type="text" id="username" name="username" required><br>

            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" required><br>

            <button type="submit">Iniciar sesión</button>
        </form>

        <p>¿No tienes cuenta? <button id="btn-registro">Regístrate aquí</button></p>
    `;

    document.getElementById('form-login').addEventListener('submit', manejarLogin);
    document.getElementById('btn-registro').addEventListener('click', () => {
        // Cambia a la vista de registro
        import('./VentanaRegistro.js').then(modulo => modulo.default());
    });
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
            throw new Error('Usuario o contraseña incorrectos');
        }
        return response.json();
    })
    .then(data => {
        alert(`Bienvenido, ${data.username}`);
        // Redirige a la vista de comidas seguras
        import('./VentanaComida.js').then(modulo => modulo.default());
    })
    .catch(error => {
        console.error('Error en el inicio de sesión:', error);
        alert('Inicio de sesión fallido. Verifica tus credenciales.');
    });
}
