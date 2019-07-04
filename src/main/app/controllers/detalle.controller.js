(function() {
    'use strict';

    angular
        .module('app.peliculas')
        .controller('DetalleController', DetalleController);

    DetalleController.$inject = ['peliculasService', 'localStorageService', '$stateParams', '$window'];
    
    function DetalleController(peliculasService, localStorageService, $stateParams, $window) {
        var vm = this;
        vm.pelicula;
        vm.favorita;
        vm.volver = volver;
        vm.aniadirFavorito = aniadirFavorito;
        vm.eliminarFavorita = eliminarFavorita;

        buscar();

        function buscar() {
            peliculasService.getPelicula($stateParams.id)
                .then(function(data) {
                    vm.pelicula = data.data;
                    vm.favorita = localStorageService.esPeliculaFavorita(vm.pelicula.imdbID);
                })
                .catch(function(err) {
                    console.error(err);
                });
        }

        function volver() {
            $window.history.back();
        }

        function aniadirFavorito() {
            localStorageService.setPeliculaFavorita(vm.pelicula);
            vm.favorita = true;
        }

        function eliminarFavorita() {
            localStorageService.borrarFavorita(vm.pelicula.imdbID);
            vm.favorita = false;
        }
    }
})();