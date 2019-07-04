(function() {
    'use strict';

    angular
        .module('app.peliculas')
        .factory('sessionStorageService', SessionStorageService);

    SessionStorageService.$inject = ['$sessionStorage'];

    function SessionStorageService($sessionStorage) {
        return {
            obtenerCredenciales: obtenerCredenciales,
            guardarCredenciales: guardarCredenciales
        };

        function obtenerCredenciales() {
            return $sessionStorage.credenciales;
        }

        function guardarCredenciales(usuario, password) {
            $sessionStorage.credenciales = {
                usuario: usuario,
                password: password
            };
        }
    }
})();
