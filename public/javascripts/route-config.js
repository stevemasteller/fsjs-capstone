(function() {
  'use strict';

	/** The Angular $routeProvider is used to configure routes for the application. */

	angular
		.module('app')
		.config(config);

	function config($routeProvider) {
		$routeProvider
		.when('/', {
			controller: 'mainCtrl',
			controllerAs: '',
			templateUrl: 'views/main.html'
		})
	}
})();
