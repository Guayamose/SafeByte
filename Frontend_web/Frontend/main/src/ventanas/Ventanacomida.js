export default function mostrarVentanaComida() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Lista de comidas seguras</h2>
        <ul>
            <li>Comida 1 (sin alérgenos)</li>
            <li>Comida 2 (sin alérgenos)</li>
            <li>Comida 3 (sin alérgenos)</li>
        </ul>
        <button id="btn-regresar-home">Volver al Home</button>
    `;

    document.getElementById('btn-regresar-home').addEventListener('click', () => {
        import('./Home.js').then(modulo => modulo.default());
    });
}
