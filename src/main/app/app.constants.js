(function() {
	'use strict';

	var constants = {
        mock: {
            login: {
                usuario: 'admin',
                password: 'admin'
            }
        },
		api: {
            url: 'http://www.omdbapi.com/',
            key: 'f12ba140'
        }
	}

	angular
		.module('app')
		.constant('constants', constants);
})();
