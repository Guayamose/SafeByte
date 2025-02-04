export default function mostrarHome() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Bienvenido a Food DNA</h2>
        <p>Selecciona una opción en el menú para comenzar.</p>
    `;
}
