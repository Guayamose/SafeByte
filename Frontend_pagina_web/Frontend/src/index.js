import { rutas } from './rutas.js';

document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.barra-navegacion button');
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const ruta = boton.dataset.ruta;
            cargarVista(ruta);
        });
    });

    // Carga inicial de la vista "home"
    cargarVista('home');
});

function cargarVista(ruta) {
    const vista = rutas[ruta];

    if (!vista) {
        console.error(`No se encontró la vista para la ruta: ${ruta}`);
        return;
    }

    document.getElementById('main-content').innerHTML = '';

    import(vista)
        .then(modulo => {
            modulo.default(); // Ejecuta el módulo exportado
        })
        .catch(error => {
            console.error(`Error al cargar la vista ${ruta}:`, error);
        });
}
