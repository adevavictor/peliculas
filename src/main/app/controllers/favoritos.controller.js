(function() {
    'use strict';

    angular
        .module('app.peliculas')
        .controller('FavoritosController', FavoritosController);

        FavoritosController.$inject = ['localStorageService'];
    
    function FavoritosController(localStorageService) {
        var vm = this;
        vm.peliculas;

        buscarFavoritas();

        function buscarFavoritas() {
            vm.peliculas = localStorageService.getPeliculasFavoritas();
        }
    }
})();