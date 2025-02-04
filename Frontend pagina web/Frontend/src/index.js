import { rutas } from './rutas.js';

document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.barra-navegacion button');
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            cargarVista(boton.dataset.ruta);
        });
    });

    // Carga inicial de la vista "home"
    cargarVista('home');
});

function cargarVista(ruta) {
    // Obtiene la ruta del módulo dinámico
    const vista = rutas[ruta];

    // Limpia el contenido actual
    document.getElementById('main-content').innerHTML = '';

    // Importa el archivo correspondiente
    import(`./${vista}`).then(modulo => {
        modulo.default(); // Ejecuta el módulo exportado
    }).catch(error => {
        console.error('Error al cargar la vista:', error);
    });
}
