(function() {
    'use strict';

    angular
        .module('app.peliculas')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['mostrarNavegacion'];
    
    function MenuController(mostrarNavegacion) {
        var vm = this;
        vm.mostrarNavegacion = mostrarNavegacion;
    }
})();