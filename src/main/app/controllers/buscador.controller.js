(function() {
    'use strict';

    angular
        .module('app.peliculas')
        .controller('BuscadorController', BuscadorController);

    BuscadorController.$inject = ['peliculasService'];
    
    function BuscadorController(peliculasService) {
        var vm = this;
        vm.peliculas;
        vm.buscar = buscar;

        function buscar(nombrePelicula) {
            peliculasService.getPeliculas(nombrePelicula)
                .then(function(data) {
                    vm.peliculas = data.data.Search;
                })
                .catch(function(err) {
                    console.error(err);
                });
        }
    }
})();