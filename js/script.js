(function () {
    'use strict';

    function leer(storage, clave){
        try {
            return storage.getItem(clave);
        } catch (e) {
            return null;
        }
    }

    function guardar(storage, clave, valor) {
        try {
            storage.setItem(clave, valor);
        } catch(e) {

        }
    }

    function iniciarDesplegables() {
        const botonMenu = document.querySelector('.hamburger');
        const links = document.querySelector('.nav-links');
        const registro = document.querySelector ('.registro');
        if (!botonMenu || !links || !registro) return;

        const botonRegistro = registro.querySelector('button');
        const formRegistro = document.getElementById('registro-pop-up');
        function abrirMenu(open) {
            links.classList.toggle('is-open', open);
            botonMenu.setAttribute('aria-expanded', String(open));
        }
        function abrirRegistro(open){
            registro.classList.toggle('is-open', open);
            botonRegistro.setAttribute('aria-expanded', String(open));
        }
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.setAttribute('aria-controls', 'menu');
        botonRegistro.setAttribute('aria-expanded', 'false');
        botonRegistro.setAttribute('aria-controls', 'registro-pop-up');
        
        botonMenu.addEventListener('click', function () {
            const estaAbierto = links.classList.contains('is-open');
            abrirRegistro(false);
            abrirMenu(!estaAbierto);
        });

        botonRegistro.addEventListener('click', function () {
            const estaAbierto = registro.classList.contains('is-open');
            abrirMenu(false);
            abrirRegistro(!estaAbierto);
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.hamburger, .nav-links')) {
                abrirMenu(false);
            }
            if(!event.target.closest('.registro')) {
                abrirRegistro(false);
            }
        });

        document.addEventListener('keydown', function(event) {
            if(event.key !== 'Escape') return;

            if(links.classList.contains('is-open')) {
                abrirMenu(false);
                botonMenu.focus();
            }
            if(registro.classList.contains('is-open')) {
                abrirRegistro(false);
                botonRegistro.focus()
            }
        });

        if(formRegistro) {
            formRegistro.addEventListener('submit', function(event) {
                event.preventDefault();
                formRegistro.reset();
                abrirRegistro(false);
            });
        }
    }

    function iniciarNovedades() {
        const novedades = document.querySelector('.novedades');
        if (!novedades) return;

        const CLAVE = 'inforock-novedades';

        if (leer(sessionStorage, CLAVE) === 'cerrada') {
            novedades.remove();
            return;
        }

        const botonCerrar = novedades.querySelector('button');
        if (!botonCerrar) return;

        botonCerrar.addEventListener('click', function () {
            guardar(sessionStorage, CLAVE, 'cerrada');
            novedades.remove();     
        });
    }
     
    iniciarDesplegables();
    iniciarNovedades();
})();
