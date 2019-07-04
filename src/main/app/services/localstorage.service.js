(function() {
    'use strict';

    angular
        .module('app.peliculas')
        .factory('localStorageService', LocalStorageService);

    LocalStorageService.$inject = ['$localStorage'];

    function LocalStorageService($localStorage) {
        return {
            getPeliculasFavoritas: getPeliculasFavoritas,
            setPeliculaFavorita: setPeliculaFavorita,
            esPeliculaFavorita: esPeliculaFavorita,
            borrarFavorita: borrarFavorita
        };

        function getPeliculasFavoritas() {
            return $localStorage.favoritos;
        }

        function setPeliculaFavorita(pelicula) {
            if ($localStorage.favoritos) {
                $localStorage.favoritos.push(pelicula);
            } else {
                $localStorage.favoritos = [pelicula];
            }
        }

        function esPeliculaFavorita(id) {
            let favoritas = getPeliculasFavoritas();

            if (favoritas) {
                for (var i = 0; i < favoritas.length; i++) {
                    if (favoritas[i].imdbID === id) {
                        return true;
                    }
                }
            }

            return false;
        }

        function borrarFavorita(id) {
            let favoritas = getPeliculasFavoritas();

            if (favoritas) {
                for (var i = 0; i < favoritas.length; i++) {
                    if (favoritas[i].imdbID === id) {
                        $localStorage.favoritos.splice(i, 1);

                        if ($localStorage.favoritos.length == 0) {
                            $localStorage.$reset();
                        }

                        break;
                    }
                }
            }
        }
    }
})();
