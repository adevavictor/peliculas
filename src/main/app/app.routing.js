(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        var routes = [
            {
                name: 'login',
                url: '/',
                views: {
                    '': {
                        controller: 'LoginController',
                        controllerAs: 'vm',
                        templateUrl: '../views/login.html'
                    },
                    'menu@login': {
                        controller: 'MenuController',
                        controllerAs: 'vm', 
                        templateUrl: '../views/partials/menu.html'
                    }
                },
                resolve: {
                    mostrarNavegacion: function() {
                        return false;
                    }
                }
            },
            {
                name: 'buscar',
                url: '/buscar',
                views: {
                    '': {
                        controller: 'BuscadorController',
                        controllerAs: 'vm',
                        templateUrl: '../views/buscador.html'
                    },
                    'menu@buscar': { 
                        controller: 'MenuController',
                        controllerAs: 'vm',
                        templateUrl: '../views/partials/menu.html'
                    }
                },
                resolve: {
                    mostrarNavegacion: function() {
                        return true;
                    }
                }
            },
            {
                name: 'detalle',
                url: '/detalle/{id}',
                views: {
                    '': {
                        controller: 'DetalleController',
                        controllerAs: 'vm',
                        templateUrl: '../views/detalle.html'
                    },
                    'menu@detalle': { 
                        controller: 'MenuController',
                        controllerAs: 'vm',
                        templateUrl: '../views/partials/menu.html'
                    }
                },
                resolve: {
                    mostrarNavegacion: function() {
                        return true;
                    }
                }
            },
            {
                name: 'favoritos',
                url: '/favoritos',
                views: {
                    '': {
                        controller: 'FavoritosController',
                        controllerAs: 'vm',
                        templateUrl: '../views/favoritos.html'
                    },
                    'menu@favoritos': { 
                        controller: 'MenuController',
                        controllerAs: 'vm',
                        templateUrl: '../views/partials/menu.html'
                    }
                },
                resolve: {
                    mostrarNavegacion: function() {
                        return true;
                    }
                }
            }];

        routes.forEach(function(item) { $stateProvider.state(item); }) ;
        $urlRouterProvider.otherwise('/');
    }
})();