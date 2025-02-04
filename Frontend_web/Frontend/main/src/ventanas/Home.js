export default function mostrarHome() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <h2>Bienvenido a la aplicación de comidas seguras</h2>
        <p>Elige las comidas que son adecuadas para ti según tus alergias.</p>
        <button id="btn-comida">Ver comidas seguras</button>
    `;

    document.getElementById('btn-comida').addEventListener('click', () => {
        import('./VentanaComida.js').then(modulo => modulo.default());
    });
}
