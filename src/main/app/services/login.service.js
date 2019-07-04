(function() {
    'use strict';

    angular
        .module('app.peliculas')
        .factory('loginService', LoginService);

        LoginService.$inject = ['$sessionStorage', 'constants'];

    function LoginService($sessionStorage, constants) {
        return {
            comprobarCredenciales: comprobarCredenciales
        };

        function comprobarCredenciales(usuario, password) {
            return constants.mock.login.usuario ===  usuario &&
            constants.mock.login.password ===  password;
        }
    }
})();
