(function() {
    'use strict';

    angular
        .module('app.peliculas')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['loginService', 'sessionStorageService', '$state'];
    
    function LoginController(loginService, sessionStorageService, $state) {
        var vm = this;
        vm.login = login;
        vm.loginIncorrecto = false;

        comprobarSesion();

        function comprobarSesion() {
            let credenciales = sessionStorageService.obtenerCredenciales();

            if (credenciales && credenciales.usuario && credenciales.password) {
                if (comprobarCredenciales(credenciales.usuario, credenciales.password)) {
                    $state.go('buscar');
                }
            }

            vm.loginIncorrecto = true;
        }

        function comprobarCredenciales(usuario, password) {
            return loginService.comprobarCredenciales(usuario, password);
        }

        function login(usuario, password) {
            if (usuario && password) {
                if (comprobarCredenciales(usuario, password)) {
                    sessionStorageService.guardarCredenciales(usuario, password);
                    $state.go('buscar');
                }
            }

            vm.loginIncorrecto = true;
        }
    }
})();