(function() {
    'use strict';

    angular.module('app', ['ui.router', 'ngStorage', 'app.peliculas'])
           .run(comprobarSesion);

    function comprobarSesion($transitions, sessionStorageService) {
        $transitions.onStart({}, function(transition) {
            let credenciales = sessionStorageService.obtenerCredenciales();

            if (!credenciales || !credenciales.usuario || !credenciales.password) {
                transition.router.stateService.transitionTo('login');
            }
        });
    }
})();

