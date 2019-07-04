(function() {
    'use strict';

    angular
        .module('app.peliculas')
        .factory('peliculasService', PeliculasService);

    PeliculasService.$inject = ['$http', '$q', 'constants'];

    function PeliculasService($http, $q, constants) {
        return {
            getPeliculas: getPeliculas,
            getPelicula: getPelicula
        };

        function getPeliculas(nombre) {
            var defered = $q.defer();
            var promise = defered.promise;
            
            $http.get(constants.api.url, { params: { apiKey: constants.api.key, s: nombre }})
                .then(function(data) {
                    defered.resolve(data);
                }),
                function(err) {
                    defered.reject(err)
                };
            
                return promise;
        }

        function getPelicula(id) {
            var defered = $q.defer();
            var promise = defered.promise;
            
            $http.get(constants.api.url, { params: { apiKey: constants.api.key, i: id }})
                .then(function(data) {
                    defered.resolve(data);
                }),
                function(err) {
                    defered.reject(err)
                };
            
                return promise;
        }
    }
})();
