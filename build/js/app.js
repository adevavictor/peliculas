(function(){'use strict';function a(a,b){a.onStart({},function(a){let c=b.obtenerCredenciales();c&&c.usuario&&c.password||a.router.stateService.transitionTo("login")})}a.$inject=["$transitions","sessionStorageService"],angular.module("app",["ui.router","ngStorage","app.peliculas"]).run(a)})(),function(){'use strict';function a(a,b){[{name:"login",url:"/",views:{"":{controller:"LoginController",controllerAs:"vm",templateUrl:"../views/login.html"},"menu@login":{controller:"MenuController",controllerAs:"vm",templateUrl:"../views/partials/menu.html"}},resolve:{mostrarNavegacion:function(){return!1}}},{name:"buscar",url:"/buscar",views:{"":{controller:"BuscadorController",controllerAs:"vm",templateUrl:"../views/buscador.html"},"menu@buscar":{controller:"MenuController",controllerAs:"vm",templateUrl:"../views/partials/menu.html"}},resolve:{mostrarNavegacion:function(){return!0}}},{name:"detalle",url:"/detalle/{id}",views:{"":{controller:"DetalleController",controllerAs:"vm",templateUrl:"../views/detalle.html"},"menu@detalle":{controller:"MenuController",controllerAs:"vm",templateUrl:"../views/partials/menu.html"}},resolve:{mostrarNavegacion:function(){return!0}}},{name:"favoritos",url:"/favoritos",views:{"":{controller:"FavoritosController",controllerAs:"vm",templateUrl:"../views/favoritos.html"},"menu@favoritos":{controller:"MenuController",controllerAs:"vm",templateUrl:"../views/partials/menu.html"}},resolve:{mostrarNavegacion:function(){return!0}}}].forEach(function(b){a.state(b)}),b.otherwise("/")}a.$inject=["$stateProvider","$urlRouterProvider"],angular.module("app").config(a)}(),function(){'use strict';angular.module("app").constant("constants",{mock:{login:{usuario:"admin",password:"admin"}},api:{url:"http://www.omdbapi.com/",key:"f12ba140"}})}(),function(){'use strict';angular.module("app.peliculas",[])}(),function(){'use strict';function a(a){var b=this;b.peliculas,b.buscar=function(c){a.getPeliculas(c).then(function(a){b.peliculas=a.data.Search}).catch(function(a){console.error(a)})}}angular.module("app.peliculas").controller("BuscadorController",a),a.$inject=["peliculasService"]}(),function(){'use strict';function a(a,b,c,d){var e=this;e.pelicula,e.favorita,e.volver=function(){d.history.back()},e.aniadirFavorito=function(){b.setPeliculaFavorita(e.pelicula),e.favorita=!0},e.eliminarFavorita=function(){b.borrarFavorita(e.pelicula.imdbID),e.favorita=!1},function(){a.getPelicula(c.id).then(function(a){e.pelicula=a.data,e.favorita=b.esPeliculaFavorita(e.pelicula.imdbID)}).catch(function(a){console.error(a)})}()}angular.module("app.peliculas").controller("DetalleController",a),a.$inject=["peliculasService","localStorageService","$stateParams","$window"]}(),function(){'use strict';function a(a){var b=this;b.peliculas,function(){b.peliculas=a.getPeliculasFavoritas()}()}angular.module("app.peliculas").controller("FavoritosController",a),a.$inject=["localStorageService"]}(),function(){'use strict';function a(a,b,c){function d(b,c){return a.comprobarCredenciales(b,c)}var e=this;e.login=function(a,f){a&&f&&d(a,f)&&(b.guardarCredenciales(a,f),c.go("buscar")),e.loginIncorrecto=!0},e.loginIncorrecto=!1,function(){let a=b.obtenerCredenciales();a&&a.usuario&&a.password&&d(a.usuario,a.password)&&c.go("buscar"),e.loginIncorrecto=!0}()}angular.module("app.peliculas").controller("LoginController",a),a.$inject=["loginService","sessionStorageService","$state"]}(),function(){'use strict';function a(a){var b=this;b.mostrarNavegacion=a}angular.module("app.peliculas").controller("MenuController",a),a.$inject=["mostrarNavegacion"]}(),function(){'use strict';function a(a){function b(){return a.favoritos}return{getPeliculasFavoritas:b,setPeliculaFavorita:function(b){a.favoritos?a.favoritos.push(b):a.favoritos=[b]},esPeliculaFavorita:function(a){let c=b();if(c)for(var d=0;d<c.length;d++)if(c[d].imdbID===a)return!0;return!1},borrarFavorita:function(c){let d=b();if(d)for(var e=0;e<d.length;e++)if(d[e].imdbID===c){a.favoritos.splice(e,1),0==a.favoritos.length&&a.$reset();break}}}}angular.module("app.peliculas").factory("localStorageService",a),a.$inject=["$localStorage"]}(),function(){'use strict';function a(a,b){return{comprobarCredenciales:function(a,c){return b.mock.login.usuario===a&&b.mock.login.password===c}}}angular.module("app.peliculas").factory("loginService",a),a.$inject=["$sessionStorage","constants"]}(),function(){'use strict';function a(a,b,c){return{getPeliculas:function(d){var e=b.defer(),f=e.promise;return a.get(c.api.url,{params:{apiKey:c.api.key,s:d}}).then(function(a){e.resolve(a)}),function(a){e.reject(a)},f},getPelicula:function(d){var e=b.defer(),f=e.promise;return a.get(c.api.url,{params:{apiKey:c.api.key,i:d}}).then(function(a){e.resolve(a)}),function(a){e.reject(a)},f}}}angular.module("app.peliculas").factory("peliculasService",a),a.$inject=["$http","$q","constants"]}(),function(){'use strict';function a(a){return{obtenerCredenciales:function(){return a.credenciales},guardarCredenciales:function(b,c){a.credenciales={usuario:b,password:c}}}}angular.module("app.peliculas").factory("sessionStorageService",a),a.$inject=["$sessionStorage"]}();